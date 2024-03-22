import { Button, Input } from '@/components/FormComponents'

export function ConfigForm() {
  return (
    <form className="mt-4 grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2">
      <Input label="Public" type="text" />
      <Input label="Access" type="text" />

      <div className="col-span-2 flex justify-end">
        <Button>Salvar</Button>
      </div>
    </form>
  )
}
