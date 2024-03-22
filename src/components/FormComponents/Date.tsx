import DatePicker from '@/components/UI/DatePicker'

interface FileInputProps {
  id: string
  label: string
  errorMessage?: string | null
  value: Date | null
  onValueChange: (data: Date) => void
}

export function Date({
  id,
  label,
  errorMessage = null,
  value,
  onValueChange,
}: FileInputProps) {
  return (
    <>
      <div className="w-full space-y-2  ">
        <label htmlFor={id} className="block font-medium">
          {label}
        </label>

        <DatePicker onValueChange={onValueChange} value={value} />

        {errorMessage && (
          <p className="text-xs font-medium text-red-500">{errorMessage}</p>
        )}
      </div>
    </>
  )
}
