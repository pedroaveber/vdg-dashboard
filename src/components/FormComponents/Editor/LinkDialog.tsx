'use client'

import * as Dialog from '@radix-ui/react-alert-dialog'
import * as FormCompontes from '@/components/FormComponents'
import { Editor } from '@tiptap/react'
import { useState } from 'react'

interface DeleteDialogProps {
  children: React.ReactNode
  editor: Editor | null
}

export function LinkDialog({ children, editor }: DeleteDialogProps) {
  const [url, setUrl] = useState('')

  function handleSetLink() {
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 text-zinc-700 backdrop-blur-sm data-[state=open]:animate-overlayShow dark:text-zinc-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          <Dialog.Title className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
            Digite a URL para esta âncora
          </Dialog.Title>

          <Dialog.Description className="my-4">
            A URL é o caminho para qual você deseja redirecionar o usuário ao
            clicar no texto selecionado
          </Dialog.Description>

          <FormCompontes.Input
            label="URL"
            name="url"
            type="text"
            placeholder="https://exemplo.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <Dialog.Cancel>
              <FormCompontes.Button
                type="button"
                variant="ghost"
                className="font-bold"
              >
                Cancelar
              </FormCompontes.Button>
            </Dialog.Cancel>

            <Dialog.Action asChild>
              <FormCompontes.Button variant="primary" className="font-bold">
                Salvar
              </FormCompontes.Button>
            </Dialog.Action>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
