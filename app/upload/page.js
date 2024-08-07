'use client';

import { useState, useRef } from 'react';

export default function Upload() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault(); // Prevent the default form submission

          const file = inputFileRef.current.files[0]; // Correct the syntax

          try {
            const response = await fetch(`/api/upload-file?filename=${JSON(file.name)}`, {
              method: 'POST',
              body: file,
            });

            if (!response.ok) {
              throw new Error('File upload failed');
            }

            const newBlob = await response.json();
            setBlob(newBlob);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}

