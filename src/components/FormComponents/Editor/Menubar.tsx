'use client'

import { Editor } from '@tiptap/react'
import { Button } from '../Button'
import {
  BoldIcon,
  ItalicIcon,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
} from 'lucide-react'

import { LinkDialog } from './LinkDialog'

interface MenubarProps {
  link?: boolean
  bold?: boolean
  italic?: boolean
  heading?: boolean
  heading3?: boolean
  subHeading?: boolean
  editor: Editor | null
}

export function Menubar({
  editor,
  link = true,
  bold = true,
  italic = true,
  heading = true,
  heading3 = true,
  subHeading = true,
}: MenubarProps) {
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

  if (!editor) return null

  return (
    <div className="flex w-full rounded-t-lg border-b border-zinc-300 bg-white dark:border-zinc-500 dark:bg-zinc-900">
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

      {/* {link && (
        <LinkDialog editor={editor}>
          <Button
            type="button"
            variant="ghost"
            widthType="regular"
            data-ttactive={editor.isActive('link')}
          >
            <LinkIcon size={12} strokeWidth={3} />
          </Button>
        </LinkDialog>
      )} */}
    </div>
  )
}
