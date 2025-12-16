import { put, del, list, head } from '@vercel/blob';

/**
 * Upload a file to Vercel Blob storage
 */
export async function uploadFile(file: File, options?: {
  filename?: string;
  access?: 'public';
  addRandomSuffix?: boolean;
}) {
  const {
    filename,
    access = 'public',
    addRandomSuffix = true
  } = options || {};

  // Generate filename if not provided
  const finalFilename = filename || generateFilename(file.name, addRandomSuffix);

  const blob = await put(finalFilename, file, { access });

  return {
    url: blob.url,
    pathname: blob.pathname,
    size: file.size,
    type: file.type
  };
}

/**
 * Delete a file from Vercel Blob storage
 */
export async function deleteFile(url: string) {
  await del(url);
}

/**
 * List all files in the blob store
 */
export async function listFiles(options?: {
  limit?: number;
  prefix?: string;
}) {
  const { blobs } = await list(options);
  return blobs;
}

/**
 * Get file metadata
 */
export async function getFileInfo(url: string) {
  const info = await head(url);
  return info;
}

/**
 * Generate a unique filename
 */
function generateFilename(originalName: string, addRandomSuffix: boolean = true): string {
  const extension = originalName.split('.').pop() || '';
  const baseName = originalName.replace(/\.[^/.]+$/, '');

  if (addRandomSuffix) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${baseName}-${timestamp}-${random}.${extension}`;
  }

  return `${baseName}-${Date.now()}.${extension}`;
}

/**
 * Validate file type and size
 */
export function validateFile(file: File, options?: {
  allowedTypes?: string[];
  maxSize?: number; // in bytes
}) {
  const {
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    maxSize = 5 * 1024 * 1024 // 5MB default
  } = options || {};

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  if (file.size > maxSize) {
    throw new Error(`File too large. Maximum size: ${Math.round(maxSize / 1024 / 1024)}MB`);
  }

  return true;
}