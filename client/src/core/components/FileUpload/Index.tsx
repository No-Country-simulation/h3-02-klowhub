'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useImageUpload } from '@core/hooks/useImageUpload';
import { cn } from '../../lib/utils';
import Loader from '../Loader';

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  onPreviewSelect?: (file: string) => void;
  accept?: string;
  maxSize?: number;
  firstText?: string;
  secondText?: string;
  name: string;
  defaultValue?: string;
}

export default function FileUpload({
  onFileSelect,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  firstText = '',
  secondText = '',
  name,
  defaultValue = '',
  onPreviewSelect,
}: FileUploadProps) {
  const {
    handleFileSelect,
    handleDrag,
    handleDragIn,
    handleDragOut,
    handleDrop,
    isDragging,
    preview,
    isLoading,
  } = useImageUpload(defaultValue, maxSize, onFileSelect, onPreviewSelect);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label
      className={cn(
        'relative flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-B-300 bg-white/10 transition-colors duration-200 hover:bg-white/15',
        isDragging
          ? 'border-primary-B-400 bg-primary-B-300/20'
          : preview
            ? 'border-success-200 bg-success-200/10'
            : 'hover:border-primary-B-400',
        'overflow-hidden'
      )}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}>
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileSelect}
        name={name}
        ref={inputRef}
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <Loader />
          <p className="mt-2 text-sm text-purple-400">Cargando imagen...</p>
        </div>
      ) : preview ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
            Imagen cargada
          </div>
        </div>
      ) : (
        <>
          <Image
            src="/images/CloudArrowUp.png"
            alt="CloudArrowUp"
            className="mb-2 size-10 text-primary-B-300"
            width={40}
            height={40}
          />
          <p className="mb-1 text-sm text-purple-400">{firstText}</p>
          <p className="text-sm text-gray-300">{secondText}</p>
        </>
      )}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-B-300/20">
          <p className="font-semibold text-purple-200">Suelta el archivo aquí</p>
        </div>
      )}
    </label>
  );
}
