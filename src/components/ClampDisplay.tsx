import { toast, Tooltip } from 'kitzo/react';
import kitzo from 'kitzo';
import { Book, BookMarked, CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import type { GenerateClampSizeProps } from '../App';

export type ClampDisplayProps = {
  content: string;
  name: string;
  unit: string;
  prefix: string;
  suffix: string;
  input_values: GenerateClampSizeProps;
};

export default function ClampDisplay({
  content,
  name,
  unit,
  prefix,
  suffix,
  input_values,
}: ClampDisplayProps) {
  const finalContent = prefix + content + suffix;

  const [copied, setCopied] = useState(false);

  const [saved, setSaved] = useState(() => {
    const savedData: ClampDisplayProps[] =
      JSON.parse(localStorage.getItem('saved-clamps') as string) || [];
    const exists = savedData.find((d) => {
      const added = d.prefix + d.content + d.suffix;
      return added === finalContent;
    });
    return exists ? true : false;
  });

  function saveClampData(data: ClampDisplayProps) {
    const inComingAdded = data.prefix + data.content + data.suffix;

    const savedData: ClampDisplayProps[] =
      JSON.parse(localStorage.getItem('saved-clamps') as string) || [];

    const exists = savedData.find((d) => {
      const added = d.prefix + d.content + d.suffix;
      return added === inComingAdded;
    });

    if (exists) {
      toast.error('Clamp already saved!');
      return;
    }

    savedData.push(data);
    localStorage.setItem('saved-clamps', JSON.stringify(savedData));
    setSaved(true);
    toast.success('Clamp saved');
  }

  return (
    <div className="group relative rounded-lg bg-zinc-100 px-4 py-3">
      <div>
        <div className="mb-2 flex items-center gap-1">
          <span className="font-semibold">{name}</span>
          <span className="code-font rounded-md bg-zinc-200 px-1.5 text-sm tracking-wide">
            {unit}
          </span>
          <span className="font-semibold">:</span>
        </div>
        <p className="code-font break-all">{finalContent}</p>
      </div>

      <div className="absolute top-1.5 right-1.5 flex gap-2">
        <Tooltip content={saved ? 'Saved' : 'Save'}>
          <button
            onClick={() => {
              saveClampData({
                name,
                content,
                prefix,
                suffix,
                unit,
                input_values,
              });
            }}
            className="group-hover: grid size-[30px] transform-gpu place-items-center rounded-md bg-white shadow-sm transition-[opacity,scale] pointer-fine:scale-80 pointer-fine:opacity-0 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"
          >
            {saved ? (
              <span>
                <BookMarked size="18" />
              </span>
            ) : (
              <span>
                <Book size="18" />
              </span>
            )}
          </button>
        </Tooltip>

        <Tooltip content={copied ? 'Copied' : 'Copy'}>
          <button
            onClick={() => {
              kitzo.copy(finalContent);
              if (copied) return;
              setCopied(true);
              toast.success('Clamp copied');
              setTimeout(() => setCopied(false), 2000);
            }}
            className="group-hover: grid size-[30px] transform-gpu place-items-center rounded-md bg-white shadow-sm transition-[opacity,scale] pointer-fine:scale-80 pointer-fine:opacity-0 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"
          >
            {copied ? (
              <span>
                <CopyCheckIcon size="18" />
              </span>
            ) : (
              <span>
                <CopyIcon size="18" />
              </span>
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
