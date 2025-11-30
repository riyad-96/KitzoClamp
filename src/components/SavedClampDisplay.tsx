import React from 'react';
import { toast, Tooltip } from 'kitzo/react';
import kitzo from 'kitzo';
import type { ClampDisplayProps } from './ClampDisplay';
import { ClipboardCheck, Clipboard, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type SavedClampDisplayProps = {
  clampData: ClampDisplayProps;
  setDeleting: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function SavedClampDisplay({
  clampData,
  setDeleting,
}: SavedClampDisplayProps) {
  const { content, name, unit, prefix, suffix, input_values } = clampData;
  const finalClamp = prefix + content + suffix;
  const [copied, setCopied] = useState(false);

  return (
    <div className="group relative space-y-1 rounded-lg bg-zinc-100 px-3 py-1">
      <h5>
        <span className="font-medium">{name}:</span>{' '}
        <span className="code-font rounded-md bg-zinc-200 px-1.5 text-sm tracking-wide">
          {unit}
        </span>
      </h5>

      <div className="flex flex-wrap gap-1.5">
        <p className="rounded-md bg-zinc-200 px-1 text-xs">
          Min viewport size: {input_values.min_viewport_width}
        </p>
        <p className="rounded-md bg-zinc-200 px-1 text-xs">
          Max viewport size: {input_values.min_viewport_width}
        </p>
        <p className="rounded-md bg-zinc-200 px-1 text-xs">
          Min size: {input_values.min_size}
        </p>
        <p className="rounded-md bg-zinc-200 px-1 text-xs">
          max size: {input_values.max_size}
        </p>
      </div>

      <p className="code-font break-all">{finalClamp}</p>

      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Tooltip
          content={
            <span className="rounded-md bg-zinc-800 px-1.5 py-1 text-xs text-white">
              Delete
            </span>
          }
          tooltipOptions={{
            position: 'bottom',
          }}
        >
          <button
            onClick={() => setDeleting(finalClamp)}
            className="grid size-[30px] transform-gpu place-items-center rounded-md bg-white shadow-sm transition-[opacity,scale] pointer-fine:scale-80 pointer-fine:opacity-0 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"
          >
            <Trash2Icon size="16" />
          </button>
        </Tooltip>
        <Tooltip
          content={
            <span className="rounded-md bg-zinc-800 px-1.5 py-1 text-xs text-white">
              {copied ? 'Copied' : 'Copy'}
            </span>
          }
          tooltipOptions={{
            position: 'bottom',
          }}
        >
          <button
            onClick={() => {
              if (copied) return;
              kitzo.copy(finalClamp);
              setCopied(true);
              toast.success('Clamp copied');
              setTimeout(() => setCopied(false), 2000);
            }}
            className="grid size-[30px] transform-gpu place-items-center rounded-md bg-white shadow-sm transition-[opacity,scale] pointer-fine:scale-80 pointer-fine:opacity-0 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"
          >
            {copied ? (
              <span>
                <ClipboardCheck size="16" />
              </span>
            ) : (
              <span>
                <Clipboard size="16" />
              </span>
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
