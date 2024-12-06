import { type ChangeEvent, type DragEvent, useCallback, useEffect, useRef, useState } from 'react';

export const useImageUpload = (
  defaultValue: string,
  maxSize: number,
  onFileSelect?: (file: File) => void,
  onPreviewSelect?: (file: string) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const dragCounter = useRef(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
      const dummyFile = new File([''], 'default-image', { type: 'image/png' });
      onFileSelect?.(dummyFile);
    }
  }, [defaultValue, onFileSelect]);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;
      const transfer = e.dataTransfer;
      const files = transfer?.files ? Array.from(transfer.files) : [];
      if (files && files.length > 0 && files[0]) {
        handleFile(files[0]);
      }
    },
    [maxSize, onFileSelect]
  );

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0 && files[0]) {
        handleFile(files[0]);
      }
    },
    [maxSize, onFileSelect]
  );

  const handleFile = (file: File) => {
    setIsLoading(true);
    if (file && file.size <= maxSize) {
      onFileSelect?.(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setIsLoading(false);
        onPreviewSelect?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    handleFileSelect,
    handleDrop,
    handleDragOut,
    handleDragIn,
    handleDrag,
    isDragging,
    preview,
    isLoading,
  };
};
