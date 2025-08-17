import { useState } from "react"
import { Platform } from "react-native"
import { Input, YStack } from "tamagui"
import DateTimePickerModal from 'react-native-modal-datetime-picker'

type DateFieldProps = {
  value: string | undefined
  onChange: (v: string) => void
  placeholder?: string
}

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`)
const toYYYYMMDD = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

const DateField = ({ value, onChange, placeholder = 'YYYY-MM-DD' }: DateFieldProps) => {
  const [open, setOpen] = useState(false)
  const dateObj = value ? new Date(value) : new Date()

  if (Platform.OS === 'web') {
    return (
      <YStack>
        <input
          value={value}
          placeholder={placeholder}
          type="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value ?? '')
          }}
          style={{
            width: '100%',
            height: 36,
            padding: '8px 12px',
            borderRadius: 'var(--radius-md,8px)',
            border: '1px solid var(--borderColor)',
            background: 'var(--background)',
            color: 'var(--color)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </YStack>
    )
  }

  return (
    <>
      <Input value={value} placeholder={placeholder} editable={false} onPressIn={() => setOpen(true)} />
      <DateTimePickerModal
        isVisible={open}
        mode="date"
        display="spinner"
        date={dateObj}
        onConfirm={(d: Date) => {
          onChange(toYYYYMMDD(d))
          setOpen(false)
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}
export default DateField