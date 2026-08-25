import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, deleteFile, listFiles, validateFile } from '@/lib/blob';
import { isRequestAuthorized } from '@/lib/auth';
import { unauthorizedAdminResponse } from '@/lib/admin-response';

export async function POST(request: NextRequest) {
  if (!isRequestAuthorized(request.headers.get('authorization'))) {
    return unauthorizedAdminResponse();
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    validateFile(file);

    // Upload to Vercel Blob
    const result = await uploadFile(file, {
      access: 'public' // Makes the file publicly accessible
    });

    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Blob upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!isRequestAuthorized(request.headers.get('authorization'))) {
    return unauthorizedAdminResponse();
  }

  try {
    // List all files in the blob store
    const blobs = await listFiles();

    return NextResponse.json({
      files: blobs.map(blob => ({
        url: blob.url,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        filename: blob.pathname
      }))
    });
  } catch (error) {
    console.error('Blob list error:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isRequestAuthorized(request.headers.get('authorization'))) {
    return unauthorizedAdminResponse();
  }

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'No URL provided' },
        { status: 400 }
      );
    }

    // Delete the file
    await deleteFile(url);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Blob delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}
