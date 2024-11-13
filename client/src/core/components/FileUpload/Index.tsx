'use client';

import Image from 'next/image';
import { type ChangeEvent, type DragEvent, useCallback, useState } from 'react';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  maxSize?: number;
  firstText?: string;
  secondText?: string;
}

export default function FileUpload({
  onFileSelect,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  firstText = '',
  secondText = '',
}: FileUploadProps = {}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const transfer = e.dataTransfer;
      const files = transfer?.files ? Array.from(transfer.files) : [];
      if (files && files.length > 0) {
        const file = files[0];
        if (file && file.size <= maxSize) {
          onFileSelect?.(file);
        }
      }
    },
    [maxSize, onFileSelect]
  );

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file && file.size <= maxSize) {
          onFileSelect?.(file);
        }
      }
    },
    [maxSize, onFileSelect]
  );

  return (
    <label
      className={cn(
        'relative flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-B-300 bg-white/10 transition-colors duration-200',
        isDragging ? 'border-opacity-100' : 'border-opacity-70 hover:border-opacity-100'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileSelect}
        aria-label="Subir archivo"
      />
      <Image
        src="/images/CloudArrowUp.png"
        alt="CloudArrowUp"
        className="mb-2 size-10 text-primary-B-300"
      />
      <p className="mb-1 text-sm text-primary-B-300">{firstText}</p>
      <p className="text-sm text-white/90">{secondText}</p>
    </label>
  );
}
