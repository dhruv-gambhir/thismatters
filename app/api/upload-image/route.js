import { put } from '@vercel/blob';
 
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Parse the incoming request
  const formData = await request.formData();
  const file = formData.get('file'); // Retrieve the file from form data
  const filename = formData.get('filename'); // Retrieve the filename from form data

  if (!file || !filename) {
    return NextResponse.json({ error: 'File and filename are required' }, { status: 400 });
  }

  // Upload the file to Vercel Blob
  try {
    const blob = await put(filename, file, {
      access: 'public',
    });
        console.log("url", blob.url);
    return NextResponse.json(blob);
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

