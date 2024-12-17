'use client';

import Image from 'next/image';
import { type KeyboardEvent, useCallback, useRef, useState } from 'react';
import { cn } from '@core/lib/utils';
import Button from '../Button';
import FormField from '../FormField';

const MAX_OUTCOMES = 5;

interface FormOutComesProps {
  className?: string;
  defaultValue?: string[];
  name: string;
  emptyMessage?: string;
}

export default function FormOutComes({
  defaultValue = [],
  className = '',
  emptyMessage = '',
  name,
}: FormOutComesProps) {
  const [outcomes, setOutcomes] = useState<string[]>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const addOutcome = useCallback(() => {
    const newOutcome = inputRef.current?.value.trim() || '';
    if (!newOutcome || outcomes.length >= MAX_OUTCOMES) return;

    setOutcomes(prev => [...prev, newOutcome]);
    if (inputRef.current) inputRef.current.value = '';
  }, [outcomes.length]);

  const removeOutcome = useCallback(
    (index: number) => {
      setOutcomes(prev => prev.filter((_, i) => i !== index));
    },
    [outcomes]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addOutcome();
      }
    },
    [addOutcome]
  );

  const isMaxOutcomesReached = outcomes.length >= MAX_OUTCOMES;

  return (
    <>
      <div className={cn('flex gap-2', className)}>
        <input name={name} className="sr-only" type="hidden" value={outcomes.join(',') || ''} />
        <FormField
          id="outcomes"
          type="text"
          placeholder="Escribe una opción"
          onKeyDown={handleKeyPress}
          classNameContainer="max-w-2xl"
          className="w-full max-w-none"
          ref={inputRef}
        />
        <Button
          variant="default"
          disabled={isMaxOutcomesReached}
          size="fit"
          type="button"
          onClick={addOutcome}
          className="h-auto w-10 font-bold text-white">
          +
        </Button>
      </div>
      <div className="space-y-2 rounded-lg border border-white text-white">
        {outcomes.map((outcome, index) => (
          <div
            key={index}
            className="group flex items-start justify-between gap-2 border-t p-3 first:border-t-0">
            <p
              style={{ wordWrap: 'break-word' }}
              className="line-clamp-3 max-h-16 w-full text-ellipsis hyphens-auto break-words text-sm text-white">
              {outcome}
            </p>
            <Button
              variant="ghost"
              size="fit"
              type="button"
              onClick={() => removeOutcome(index)}
              className="select-none self-center opacity-0 invert transition-opacity group-hover:opacity-95">
              <Image src="/svg/trash.svg" alt="Trash icon" width={24} height={24} />
            </Button>
          </div>
        ))}
        {outcomes.length === 0 && (
          <div className="text-muted-foreground px-4 py-12 text-center">{emptyMessage}</div>
        )}
        <div className="!mt-0 w-full border-t px-6 py-2 text-right text-sm text-white">
          {outcomes.length}/{MAX_OUTCOMES}
        </div>
      </div>
    </>
  );
}
