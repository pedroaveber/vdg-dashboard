'use client'

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react'

import { Link } from '@tiptap/extension-link'

import HeadingImage from '@/assets/img/editor/heading.png'
import Headin2Image from '@/assets/img/editor/heading2.png'
import ListMarkerImage from '@/assets/img/editor/list-marker.png'

import StarterKit from '@tiptap/starter-kit'

import {
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  Link as LinkIcon,
} from 'lucide-react'

import { Button } from '../Button'
import { FloatingMenuItem } from './FloatingMenuItem'
import { Menubar } from './Menubar'
import { EditorSkeleton } from './EditorSkeleton'
import { LinkDialog } from './LinkDialog'

interface EditorProps {
  label: string
  link?: boolean
  bold?: boolean
  italic?: boolean
  heading?: boolean
  subHeading?: boolean
  heading3?: boolean
  unorderedList?: boolean
  content?: string | null | undefined
  setContent: (content: string) => void
  errorMessage?: string | null
}

export function Editor({
  label,
  setContent,
  link = true,
  bold = true,
  italic = true,
  content = null,
  heading = true,
  heading3 = true,
  subHeading = true,
  errorMessage = null,
  unorderedList = true,
}: EditorProps) {
  const defaultContent = ''

  const LinkConfig = Link.configure({
    openOnClick: true,
  })

  const editor = useEditor({
    extensions: [StarterKit, LinkConfig],
    content: content || defaultContent,
    onBlur: ({ editor }) => {
      if (editor.getText() === '') {
        return setContent('')
      }

      setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'outline-none max-w-full',
      },
    },
  })

  function toggleBold() {
    editor?.chain().toggleBold().run()
  }

  function toggleItalic() {
    editor?.chain().toggleItalic().run()
  }

  function toggleHeading() {
    editor?.chain().toggleHeading({ level: 1 }).run()
  }

  function toggleSubHeading() {
    editor?.chain().toggleHeading({ level: 2 }).run()
  }

  function toggleHeading3() {
    editor?.chain().toggleHeading({ level: 3 }).run()
  }

  function toggleBullterList() {
    editor?.chain().toggleBulletList().run()
  }

  return (
    <>
      {!editor ? (
        <EditorSkeleton />
      ) : (
        <div className="w-full space-y-2">
          <span className="block font-medium">{label}</span>

          <div className="w-full rounded-lg border border-zinc-300 shadow-sm dark:border-zinc-500">
            <Menubar
              link={link}
              bold={bold}
              italic={italic}
              heading={heading}
              subHeading={subHeading}
              editor={editor}
            />

            <EditorContent
              className="prose prose-sm h-[250px] w-full max-w-none overflow-y-auto rounded-lg bg-white p-4 dark:prose-invert first:prose-headings:mt-0 first:prose-p:mt-0 dark:bg-zinc-900"
              editor={editor}
            />

            <FloatingMenu
              editor={editor}
              shouldShow={({ state }) => {
                const { $from } = state.selection
                const currentLineText = $from.nodeBefore?.textContent

                return currentLineText === '/'
              }}
              className="flex h-auto max-h-[200px] w-[400px] flex-col items-start overflow-y-auto rounded-lg border border-zinc-300 bg-white shadow-xl dark:border-zinc-500 dark:bg-zinc-900 dark:hover:bg-zinc-950"
            >
              {heading && (
                <FloatingMenuItem
                  type="button"
                  itemTitle="Título"
                  description="Adicionar um título"
                  onClick={toggleHeading}
                  data-ttactive={editor.isActive('heading', { level: 1 })}
                  src={HeadingImage}
                />
              )}

              {subHeading && (
                <FloatingMenuItem
                  type="button"
                  itemTitle="Sub-Título"
                  description="Adicionar um sub-título"
                  src={Headin2Image}
                  onClick={toggleSubHeading}
                  data-ttactive={editor.isActive('heading', { level: 2 })}
                />
              )}

              {unorderedList && (
                <FloatingMenuItem
                  type="button"
                  itemTitle="Lista de Marcadores"
                  description="Adicionar uma lista com marcadores"
                  src={ListMarkerImage}
                  onClick={toggleBullterList}
                  data-ttactive={editor.isActive('bulletList')}
                />
              )}
            </FloatingMenu>

            {/* <BubbleMenu
              editor={editor}
              tippyOptions={{
                duration: 100,
                hideOnClick: true,
                zIndex: 20,
              }}
              className="flex items-center divide-x divide-zinc-300 rounded-lg border border-zinc-300 bg-white shadow-xl dark:border-zinc-500 dark:bg-zinc-900"
            >
              {bold && (
                <Button
                  type="button"
                  variant="ghost"
                  widthType="regular"
                  onClick={toggleBold}
                  data-ttactive={editor.isActive('bold')}
                >
                  <BoldIcon size={14} strokeWidth={3} />
                </Button>
              )}

              {italic && (
                <Button
                  type="button"
                  variant="ghost"
                  widthType="regular"
                  onClick={toggleItalic}
                  data-ttactive={editor.isActive('italic')}
                >
                  <ItalicIcon size={14} strokeWidth={3} />
                </Button>
              )}

              {heading && (
                <Button
                  type="button"
                  variant="ghost"
                  widthType="regular"
                  onClick={toggleHeading}
                  data-ttactive={editor.isActive('heading', { level: 1 })}
                >
                  <Heading1 size={14} strokeWidth={3} />
                </Button>
              )}

              {subHeading && (
                <Button
                  type="button"
                  variant="ghost"
                  widthType="regular"
                  onClick={toggleSubHeading}
                  data-ttactive={editor.isActive('heading', { level: 2 })}
                >
                  <Heading2 size={14} strokeWidth={3} />
                </Button>
              )}

              {heading3 && (
                <Button
                  type="button"
                  variant="ghost"
                  widthType="regular"
                  onClick={toggleHeading3}
                  data-ttactive={editor.isActive('heading', { level: 3 })}
                >
                  <Heading3 size={14} strokeWidth={3} />
                </Button>
              )}

              {link && (
                <LinkDialog editor={editor}>
                  <Button
                    type="button"
                    variant="ghost"
                    widthType="regular"
                    data-ttactive={editor.isActive('link')}
                  >
                    <LinkIcon size={14} strokeWidth={3} />
                  </Button>
                </LinkDialog>
              )}
            </BubbleMenu> */}
          </div>

          {errorMessage && (
            <p className="text-xs font-medium text-red-400">{errorMessage}</p>
          )}
        </div>
      )}
    </>
  )
}
