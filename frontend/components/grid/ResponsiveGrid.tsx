import React, { JSX } from 'react'
import { Platform, useWindowDimensions, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'

type WithId = { id: string }

export type ResponsiveGridProps<T extends WithId> = {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  gap?: number
  contentPadding?: number
  tabletBreakpoint?: number
  phoneColumns?: number
  tabletColumns?: number
  keyExtractor?: (item: T, index: number) => string
}

function ResponsiveGridInner<T extends WithId>({
  data,
  renderItem,
  gap = 12,
  contentPadding = 16,
  tabletBreakpoint = 768,
  phoneColumns = 3,
  tabletColumns = 4,
  keyExtractor,
}: ResponsiveGridProps<T>) {
  if (Platform.OS === 'web') {
    // Web: keep CSS Grid (no math here either)
    return (
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          paddingLeft: contentPadding,
          paddingRight: contentPadding,
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(104px, 1fr))`,
          columnGap: gap,
          rowGap: gap,
        }}
      >
        {data.map((item, i) => (
          <div key={keyExtractor ? keyExtractor(item, i) : item.id}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    )
  }

  // Native (iOS)
  const { width } = useWindowDimensions()
  const columns = width >= tabletBreakpoint ? tabletColumns : phoneColumns

  // We use margins for gaps, so add negative margin to keep outer padding even
  const halfGap = gap / 2

  return (
    <View style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>
      <FlashList
        style={{ flex: 1 }}
        data={data}
        numColumns={columns}
        key={`cols-${columns}`} // reflow on column change
        keyExtractor={keyExtractor ?? ((item) => item.id)}
        contentContainerStyle={{
          paddingHorizontal: contentPadding,
          paddingVertical: halfGap,
        }}
        // No ItemSeparator; vertical spacing comes from per-item margins
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,            // fill 1/columns of the row
              aspectRatio: 1,     // square tiles without computing width
              marginHorizontal: halfGap,
              marginVertical: halfGap,
            }}
          >
            {renderItem(item, index)}
          </View>
        )}
      />
    </View>
  )
}

export const ResponsiveGrid = React.memo(ResponsiveGridInner) as <T extends WithId>(
  props: ResponsiveGridProps<T>
) => JSX.Element
