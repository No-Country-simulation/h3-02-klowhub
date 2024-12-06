'use client';

import { EditorContent } from '@tiptap/react';
import EmojiPicker from 'emoji-picker-react';
import Image from 'next/image';
import { useEditorConfig } from '@core/hooks/useEditorConfig';
import { useEmojis } from '@core/hooks/useEmojis';
import { cn } from '@core/lib/utils';
import EditorToolBar from './EditorToolBar';
import Button from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

interface TiptapEditorProps {
  className?: string;
  classNameEditor?: string;
  onChange?: (html: string) => void;
  defaultValue?: string;
}

const TiptapEditor = ({
  className = '',
  classNameEditor = '',
  onChange,
  defaultValue = '',
}: TiptapEditorProps) => {
  const editor = useEditorConfig(classNameEditor, defaultValue, onChange);
  const [showEmoji, toggle, addEmoji] = useEmojis(data => {
    if (!editor) return;
    editor.commands.insertContent(data);
  });

  if (!editor) {
    return (
      <div className="max-w-3xl rounded-lg border border-dashed border-black/50 bg-white opacity-80 shadow-app-1">
        <div className="h-11 w-full border-b border-dashed"></div>
        <p className="h-[100px] w-full select-none pt-6 text-center text-lg text-gray-900">
          Opps...
        </p>
        <div className="h-11 w-full border-t border-dashed"></div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border bg-white shadow-app-1', className)}>
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
