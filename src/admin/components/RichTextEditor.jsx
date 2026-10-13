import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import {
  Bold,
  Code2,
  Eye,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Table as TableIcon,
} from "lucide-react";
import { contentToHtml, sanitizeBlogHtml } from "../../utils/blogHtml.js";

const RichTextEditor = ({
  id = "blog-content",
  value,
  onChange,
  disabled = false,
  invalid = false,
}) => {
  const [mode, setMode] = useState("write");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: "noopener noreferrer" },
        },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: contentToHtml(value),
    editable: !disabled,
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  useEffect(() => {
    if (!editor || mode === "html") return;
    const next = contentToHtml(value);
    if (!editor.isFocused && editor.getHTML() !== next) {
      editor.commands.setContent(next || "<p></p>", { emitUpdate: false });
    }
  }, [editor, mode, value]);

  const run = (command) => {
    if (!editor || disabled) return;
    command();
  };

  const applyLink = () => {
    if (!editor) return;
    const href = linkUrl.trim();
    if (!href) {
      editor.chain().focus().unsetLink().run();
    } else if (/^https?:\/\//i.test(href) || href.startsWith("/") || href.startsWith("mailto:")) {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setShowLink(false);
    setLinkUrl("");
  };

  const applyImage = () => {
    if (!editor) return;
    const src = imageUrl.trim();
    if (/^https?:\/\//i.test(src) || src.startsWith("/")) {
      editor.chain().focus().setImage({ src, alt: "" }).run();
    }
    setShowImage(false);
    setImageUrl("");
  };

  const switchMode = (nextMode) => {
    if (nextMode === "write" && editor && mode === "html") {
      editor.commands.setContent(contentToHtml(value) || "<p></p>", {
        emitUpdate: false,
      });
    }
    setMode(nextMode);
    setShowLink(false);
    setShowImage(false);
  };

  return (
    <div className={`rich-text${invalid ? " has-error" : ""}`}>
      <div className="rich-text-modes" role="tablist" aria-label="Content editor">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "write"}
          className={mode === "write" ? "is-active" : ""}
          onClick={() => switchMode("write")}
          disabled={disabled}
        >
          Write
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "html"}
          className={mode === "html" ? "is-active" : ""}
          onClick={() => switchMode("html")}
          disabled={disabled}
        >
          <Code2 size={14} aria-hidden="true" />
          HTML
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "preview"}
          className={mode === "preview" ? "is-active" : ""}
          onClick={() => switchMode("preview")}
        >
          <Eye size={14} aria-hidden="true" />
          Preview
        </button>
      </div>

      {mode === "write" ? (
        <>
          <div className="rich-text-toolbar" role="toolbar" aria-label="Formatting">
            <button type="button" aria-label="Paragraph" disabled={disabled} onClick={() => run(() => editor.chain().focus().setParagraph().run())}>
              <Pilcrow size={16} />
            </button>
            <button type="button" aria-label="Heading 2" disabled={disabled} onClick={() => run(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}>
              <Heading2 size={16} />
            </button>
            <button type="button" aria-label="Heading 3" disabled={disabled} onClick={() => run(() => editor.chain().focus().toggleHeading({ level: 3 }).run())}>
              <Heading3 size={16} />
            </button>
            <button type="button" aria-label="Bold" disabled={disabled} onClick={() => run(() => editor.chain().focus().toggleBold().run())}>
              <Bold size={16} />
            </button>
            <button type="button" aria-label="Italic" disabled={disabled} onClick={() => run(() => editor.chain().focus().toggleItalic().run())}>
              <Italic size={16} />
            </button>
            <button type="button" aria-label="Bulleted list" disabled={disabled} onClick={() => run(() => editor.chain().focus().toggleBulletList().run())}>
              <List size={16} />
            </button>
            <button type="button" aria-label="Numbered list" disabled={disabled} onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())}>
              <ListOrdered size={16} />
            </button>
            <button
              type="button"
              aria-label="Insert link"
              disabled={disabled}
              onClick={() => {
                setShowImage(false);
                setShowLink((open) => !open);
                setLinkUrl(editor?.getAttributes("link")?.href || "");
              }}
            >
              <Link2 size={16} />
            </button>
            <button
              type="button"
              aria-label="Insert image"
              disabled={disabled}
              onClick={() => {
                setShowLink(false);
                setShowImage((open) => !open);
              }}
            >
              <ImageIcon size={16} />
            </button>
            <button
              type="button"
              aria-label="Insert table"
              disabled={disabled}
              onClick={() =>
                run(() =>
                  editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                )
              }
            >
              <TableIcon size={16} />
            </button>
          </div>

          {showLink ? (
            <div className="rich-text-insert">
              <label htmlFor={`${id}-link`}>Link URL</label>
              <input
                id={`${id}-link`}
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
                placeholder="https://"
                disabled={disabled}
              />
              <button type="button" className="admin-btn admin-btn-secondary" onClick={applyLink} disabled={disabled}>
                Apply link
              </button>
            </div>
          ) : null}

          {showImage ? (
            <div className="rich-text-insert">
              <label htmlFor={`${id}-image`}>Image URL</label>
              <input
                id={`${id}-image`}
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://"
                disabled={disabled}
              />
              <button type="button" className="admin-btn admin-btn-secondary" onClick={applyImage} disabled={disabled}>
                Insert image
              </button>
            </div>
          ) : null}

          <EditorContent id={id} editor={editor} className="rich-text-surface" />
        </>
      ) : null}

      {mode === "html" ? (
        <textarea
          id={id}
          className="rich-text-source"
          rows={14}
          value={value}
          disabled={disabled}
          spellCheck={false}
          aria-label="HTML source"
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}

      {mode === "preview" ? (
        <div
          className="rich-text-preview blog-article-body"
          aria-live="polite"
          dangerouslySetInnerHTML={{
            __html: sanitizeBlogHtml(value) || "<p>Nothing to preview yet.</p>",
          }}
        />
      ) : null}
    </div>
  );
};

export default RichTextEditor;
