import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import ListKeymap from '@tiptap/extension-list-keymap';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import css from '@styles/tiptapeditor.module.css';

export const useEditorConfig = (
  classNameEditor: string,
  defaultValue: string,
  placeholderText: string,
  onChange?: (html: string) => void
) => {
  const editor = useEditor(
    {
      editable: true,
      immediatelyRender: false,
      extensions: [
        Document,
        Paragraph,
        Text,
        Underline,
        Bold,
        Italic,
        Strike,
        BulletList,
        ListItem,
        ListKeymap,
        History.configure({
          depth: 15,
        }),
        Placeholder.configure({
          placeholder: placeholderText,
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
      content: defaultValue,
      editorProps: {
        attributes: {
          class: `${css.tiptapEditor} ${classNameEditor}`,
        },
      },
      onUpdate: ({ editor }) => {
        if (!onChange) return;
        onChange(editor.getHTML());
      },
    },
    [classNameEditor, placeholderText]
  );

  return editor;
};
