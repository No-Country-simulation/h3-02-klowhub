'use client';

import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import ListKeymap from '@tiptap/extension-list-keymap';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import EmojiPicker from 'emoji-picker-react';
import Image from 'next/image';
import { useEmojis } from '@core/hooks/useEmojis';
import { cn } from '@core/lib/utils';
import EditorToolBar from './EditorToolBar';
import css from './tiptapeditor.module.css';
import Button from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

interface TiptapEditorProps {
  className?: string;
  classNameEditor?: string;
  name: string;
}

const TiptapEditor = ({ className = '', classNameEditor = '', name }: TiptapEditorProps) => {
  const editor = useEditor(
    {
      editable: true,
      extensions: [
        Document,
        Paragraph,
        Text,
        Underline,
        Bold,
        Italic,
        BulletList,
        ListItem,
        ListKeymap,
        History.configure({
          depth: 15,
        }),
        Placeholder.configure({
          placeholder: 'Escribe una descripcion basica del proyecto',
        }),
        /*Link.configure({
          HTMLAttributes: {
            rel: 'noopener noreferrer',
          },
          openOnClick: false,
          linkOnPaste: true,
          defaultProtocol: 'https',
          protocols: allowedProtocolsTiptap,
          isAllowedUri: validateUrl,
          shouldAutoLink: shouldNotDisallowDomains,
        }),*/
      ],
      content: '',
      editorProps: {
        attributes: {
          class: `${css.tiptapEditor} ${classNameEditor}`,
          name: name,
        },
      },
    },
    [name, classNameEditor]
  );
  const [showEmoji, toggle, addEmoji] = useEmojis(data => {
    if (!editor) return;
    editor.commands.insertContent(data);
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={cn('rounded-lg border bg-white shadow', className)}>
      {editor && <EditorToolBar editor={editor} />}
      <EditorContent editor={editor} />
      <div className="flex items-center justify-between px-4">
        <div className="flex gap-1">
          <Popover open={showEmoji} onOpenChange={toggle}>
            <PopoverTrigger asChild>
              <Button variant="ghost" type="button" size="fit" className="py-3 opacity-70">
                <Image src="/svg/emoji-smiles.svg" width={24} height={24} alt="Smile icon" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <EmojiPicker onEmojiClick={addEmoji} />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="fit"
            type="button"
            className="ml-4 py-3 opacity-70 active:opacity-100"
            onClick={() => editor.commands.clearContent()}>
            <Image src="/svg/trash.svg" width={24} height={24} alt="Trash icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;
