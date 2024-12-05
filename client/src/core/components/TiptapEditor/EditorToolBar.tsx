'use client';

import type { Editor } from '@tiptap/react';
import Image from 'next/image';
import { cn } from '@core/lib/utils';
import Button from '../Button';

interface EditorToolBarProps {
  editor: Editor;
}

export default function EditorToolBar({ editor }: EditorToolBarProps) {
  //const setEditorLink = useSetEditorLink(editor);
  return (
    <div className="flex flex-wrap border-b px-3">
      <Button
        variant="ghost"
        size="fit"
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
        className={cn(
          'ease rounded-none px-2 py-3 opacity-70 transition-all duration-300',
          editor.isActive('bold') ? 'bg-black/5 opacity-100' : ''
        )}>
        <Image src="/svg/bold.svg" width={24} height={24} alt="Bold icon" />
      </Button>
      <Button
        variant="ghost"
        size="fit"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          'ease rounded-none px-2 py-3 opacity-70 transition-all duration-300',
          editor.isActive('italic') ? 'bg-black/5 opacity-100' : ''
        )}>
        <Image src="/svg/italic.svg" width={24} height={24} alt="Italic icon" />
      </Button>
      <Button
        variant="ghost"
        size="fit"
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          'ease rounded-none px-2 py-3 opacity-70 transition-all duration-300',
          editor.isActive('underline') ? 'bg-black/5 opacity-100' : ''
        )}>
        <Image src="/svg/underline.svg" width={24} height={24} alt="Underline icon" />
      </Button>
      <Button
        variant="ghost"
        size="fit"
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          'ease rounded-none px-2 py-3 opacity-70 transition-all duration-300',
          editor.isActive('strike') ? 'bg-black/5 opacity-100' : ''
        )}>
        <Image src="/svg/strike.svg" width={24} height={24} alt="Strike icon" />
      </Button>
      <div className="w-px border bg-black/80"></div>
      {/*<Button
        variant="ghost"
        size="fit"
        type="button"
        onClick={setEditorLink}
        className={cn(
          'ease rounded-none px-2 py-3 opacity-70 transition-all duration-300',
          editor.isActive('link') ? 'bg-black/5 opacity-100' : ''
        )}>
        <Image src="/svg/link-dark.svg" width={24} height={24} alt="Link icon" />
      </Button>*/}
      <Button
        variant="ghost"
        size="fit"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          'ease rounded-none px-2 py-3 opacity-70 transition-all duration-300',
          editor.isActive('bulletList') ? 'bg-black/5 opacity-100' : ''
        )}>
        <Image src="/svg/list.svg" width={24} height={24} alt="Lis icon" />
      </Button>
      <div className="mr-5 w-px border bg-black/80"></div>
      <Button
        variant="ghost"
        size="fit"
        type="button"
        disabled={!editor.can().undo()}
        className={cn(
          'ease disable:opacity-60 mr-2 p-3 [&:not(:disabled)]:hover:bg-black/5 [&:not(:disabled)]:active:bg-black/10'
        )}
        onClick={() => editor.chain().focus().undo().run()}>
        <Image src="/svg/undo.svg" width={24} height={24} alt="Undo icon" />
      </Button>
      <Button
        variant="ghost"
        size="fit"
        type="button"
        disabled={!editor.can().redo()}
        className={cn(
          'ease disable:opacity-60 mr-5 p-3 [&:not(:disabled)]:hover:bg-black/5 [&:not(:disabled)]:active:bg-black/10'
        )}
        onClick={() => editor.chain().focus().redo().run()}>
        <Image src="/svg/redo.svg" width={24} height={24} alt="Redo icon" />
      </Button>
      <div className="mr-5 w-px border bg-black/80"></div>
    </div>
  );
}
