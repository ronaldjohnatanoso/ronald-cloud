'use client';
// Notion block renderer — converts Notion blocks to React JSX

import React from 'react';
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionBlock } from './notion';

// ─── Rich Text Renderer ───────────────────────────────────────────────────────

function RichText({ text }: { text: RichTextItemResponse[] }) {
  return (
    <>
      {text.map((item, i) => {
        const { bold, italic, strikethrough, underline, code, color } = item.annotations;
        let node: React.ReactNode = item.plain_text;

        if (code) node = <code key={i} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{node}</code>;
        if (bold) node = <strong key={i}>{node}</strong>;
        if (italic) node = <em key={i}>{node}</em>;
        if (strikethrough) node = <s key={i}>{node}</s>;
        if (underline) node = <u key={i}>{node}</u>;

        if (item.href) node = <a key={i} href={item.href} className="text-blue-600 underline">{node}</a>;

        if (color && color !== 'default') {
          const bgClass = color.endsWith('_background') ? `bg-${color.replace('_background', '')}` : `text-${color}`;
          node = <span key={i} className={bgClass}>{node}</span>;
        }

        return <React.Fragment key={i}>{node}</React.Fragment>;
      })}
    </>
  );
}

// ─── Block Components ───────────────────────────────────────────────────────

function Block({ block }: { block: NotionBlock }) {
  const { type, content } = block;

  switch (type) {
    case 'paragraph': {
      const rt = (content as { rich_text: RichTextItemResponse[] }).rich_text;
      if (!rt.length) return <div className="h-4" />;
      return (
        <p className="mb-4 leading-relaxed">
          <RichText text={rt} />
        </p>
      );
    }

    case 'heading_1': {
      const rt = (content as { rich_text: RichTextItemResponse[] }).rich_text;
      return <h1 className="text-3xl font-bold mt-8 mb-4"><RichText text={rt} /></h1>;
    }

    case 'heading_2': {
      const rt = (content as { rich_text: RichTextItemResponse[] }).rich_text;
      return <h2 className="text-2xl font-semibold mt-8 mb-3"><RichText text={rt} /></h2>;
    }

    case 'heading_3': {
      const rt = (content as { rich_text: RichTextItemResponse[] }).rich_text;
      return <h3 className="text-xl font-semibold mt-6 mb-2"><RichText text={rt} /></h3>;
    }

    case 'bulleted_list_item': {
      const rt = (content as { rich_text: RichTextItemResponse[] }).rich_text;
      return (
        <li className="ml-6 mb-1">
          <RichText text={rt} />
        </li>
      );
    }

    case 'numbered_list_item': {
      const rt = (content as { rich_text: RichTextItemResponse[] }).rich_text;
      return (
        <li className="ml-6 mb-1 list-decimal">
          <RichText text={rt} />
        </li>
      );
    }

    case 'to_do': {
      const rt = (content as { rich_text: RichTextItemResponse[]; checked: boolean }).rich_text;
      return (
        <div className="flex items-start gap-2 mb-1">
          <input type="checkbox" checked={(content as { checked: boolean }).checked} readOnly className="mt-1" />
          <span className={(content as { checked: boolean }).checked ? 'line-through text-muted-foreground' : ''}>
            <RichText text={rt} />
          </span>
        </div>
      );
    }

    case 'code': {
      const rt = (content as { rich_text: RichTextItemResponse[]; language: string }).rich_text;
      return (
        <pre className="bg-muted rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono">
          <code><RichText text={rt} /></code>
        </pre>
      );
    }

    case 'quote': {
      const rt = (content as { rich_text: RichTextItemResponse[] }).rich_text;
      return (
        <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-4 text-muted-foreground">
          <RichText text={rt} />
        </blockquote>
      );
    }

    case 'callout': {
      const rt = (content as { rich_text: RichTextItemResponse[]; icon?: { type: string; emoji?: string } }).rich_text;
      const emoji = content.icon?.emoji ?? '💡';
      return (
        <div className="flex gap-3 bg-muted rounded-lg p-4 my-4">
          <span className="text-xl">{emoji}</span>
          <div className="flex-1"><RichText text={rt} /></div>
        </div>
      );
    }

    case 'divider':
      return <hr className="my-8 border-border" />;

    case 'image': {
      const img = content as { type: string; file?: { url: string }; external?: { url: string }; caption: RichTextItemResponse[] };
      const url = img.type === 'external' ? img.external?.url : img.file?.url;
      if (!url) return null;
      const caption = img.caption?.map((t: RichTextItemResponse) => t.plain_text).join('') ?? '';
      return (
        <figure className="my-6">
          <img src={url} alt={caption} className="rounded-lg max-w-full" />
          {caption && <figcaption className="text-sm text-muted-foreground mt-2 text-center">{caption}</figcaption>}
        </figure>
      );
    }

    case 'toggle': {
      const rt = (content as { rich_text: RichTextItemResponse[] }).rich_text;
      return (
        <details className="my-2 border rounded-lg p-3">
          <summary className="cursor-pointer font-medium"><RichText text={rt} /></summary>
          <div className="mt-2 pl-4 text-muted-foreground">Toggle content</div>
        </details>
      );
    }

    default:
      return null;
  }
}

// ─── Main Renderer ────────────────────────────────────────────────────────────

interface NotionRendererProps {
  blocks: NotionBlock[];
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  // Group consecutive list items
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === 'bulleted_list_item') {
      const items = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        const rt = (blocks[i].content as { rich_text: RichTextItemResponse[] }).rich_text;
        items.push(<li key={blocks[i].id}><RichText text={rt} /></li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="list-disc mb-4 space-y-1">{items}</ul>);
    } else if (block.type === 'numbered_list_item') {
      const items = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        const rt = (blocks[i].content as { rich_text: RichTextItemResponse[] }).rich_text;
        items.push(<li key={blocks[i].id}><RichText text={rt} /></li>);
        i++;
      }
      elements.push(<ol key={`ol-${i}`} className="list-decimal mb-4 space-y-1 ml-6">{items}</ol>);
    } else {
      elements.push(<Block key={block.id} block={block} />);
      i++;
    }
  }

  return <div className="prose prose-neutral max-w-none">{elements}</div>;
}
