import { useState, useEffect, useMemo } from "react"
import { Platform, Keyboard, Dimensions } from "react-native"
import { Popover, Input, YStack, XStack, Text, ScrollView } from "tamagui"
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown"
import dt from "../theme/design_tokens.json"
import { FoodItem } from "types"

type AutocompleteProps = {
  value: string
  onChange: (v: string) => void
  options: FoodItem[]
  placeholder?: string
  maxResults?: number
  minChars?: number
}

const IngredientAutocomplete = ({
  value,
  onChange,
  options,
  placeholder = "Ingredient",
  maxResults = 20,
  minChars = 2,
}: AutocompleteProps) => {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (value !== query) setQuery(value)
  }, [value])

  const baseData = useMemo(
    () => options.map((i) => ({ id: i.id, title: i.name })),
    [options]
  )

  if (Platform.OS !== "web") {
    const dataSet = query.trim().length < minChars ? [] : baseData
    return (
      <AutocompleteDropdown
        dataSet={dataSet}
        useFilter
        direction="down"
        suggestionsListMaxHeight={Math.min(280, Math.floor(Dimensions.get("window").height * 0.4))}
        closeOnBlur
        clearOnFocus={false}
        onChangeText={(t?: string) => {
          const txt = t ?? ""
          setQuery(txt)
          onChange(txt)
        }}
        onSelectItem={(item) => {
          if (item?.title) {
            setQuery(item.title)
            onChange(item.title)
            Keyboard.dismiss()
          }
        }}
        textInputProps={{
          placeholder,
          autoCapitalize: "none",
          autoCorrect: false,
        }}
  containerStyle={{ zIndex: 10000 }}
  inputContainerStyle={{ borderRadius: dt.radii.md }}
  suggestionsListContainerStyle={{ borderRadius: dt.radii.md, zIndex: 10001, elevation: 12 }}
        EmptyResultComponent={
          query.trim().length < minChars ? (
            <YStack padding-horizontal="$3" padding-vertical="$2">
              <Text opacity={0.6}>{`Type at least ${minChars} characters`}</Text>
            </YStack>
          ) : (
            <YStack padding-horizontal="$3" padding-vertical="$2">
              <Text opacity={0.6}>No matches</Text>
            </YStack>
          )
        }
      />
    )
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < minChars) return []
    return options.filter((o) => o.name.toLowerCase().includes(q)).slice(0, maxResults)
  }, [options, query, maxResults, minChars])

  const List = (
    <ScrollView style={{ maxHeight: 280, minWidth: 260 }} keyboardShouldPersistTaps="handled">
      {filtered.length === 0 ? (
        <YStack padding-horizontal={12} padding-vertical={8}>
          <Text opacity={0.6}>
            {query.trim().length < minChars ? `Type at least ${minChars} characters` : "No matches"}
          </Text>
        </YStack>
      ) : (
        filtered.map((item) => (
          <YStack
            key={item.id}
            padding-horizontal={12}
            padding-vertical={8}
            style={{ cursor: 'pointer' }}
            onPress={() => {
              setQuery(item.name)
              onChange(item.name)
              setOpen(false)
            }}
          >
            <XStack align-items="center" justify-content="space-between">
              <Text>{item.name}</Text>
            </XStack>
          </YStack>
        ))
      )}
    </ScrollView>
  )

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-start" stayInFrame>
      <Popover.Trigger asChild>
        <Input
          value={query}
          onChangeText={(t) => {
            setQuery(t)
            onChange(t)
            setOpen(t.trim().length >= minChars)
          }}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Popover.Trigger>

      <Popover.Content
        elevate
        borderWidth={1}
        borderColor="$borderColor"
        background="$background"
        zIndex={1000}
        animation="quick"
      >
        {List}
      </Popover.Content>
    </Popover>
  )
}

export default IngredientAutocomplete
