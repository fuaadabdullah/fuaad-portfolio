'use client';

import { useState } from 'react';
import Button from '@/components/Button';

interface FileUploadProps {
  onUpload?: (result: { url: string; filename: string; size: number }) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function FileUpload({
  onUpload,
  accept = "image/*,.pdf",
  maxSize = 5,
  className = ""
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    filename: string;
    size: number;
  } | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File too large. Maximum size: ${maxSize}MB`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploadedFile(result);
      onUpload?.(result);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={uploading}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent)]/90 disabled:opacity-50"
        />
        {uploading && (
          <div className="text-sm text-gray-600">Uploading...</div>
        )}
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      {uploadedFile && (
        <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
          ✅ File uploaded successfully!
          <br />
          <a
            href={uploadedFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            {uploadedFile.filename}
          </a>
          <span className="text-gray-500 ml-2">
            ({Math.round(uploadedFile.size / 1024)} KB)
          </span>
        </div>
      )}

      <div className="text-xs text-gray-500">
        Supported formats: Images, PDFs. Max size: {maxSize}MB
      </div>
    </div>
  );
}