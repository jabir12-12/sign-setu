'use client';

export default function UploadTest() {
  const handleUpload = async () => {
    try {
      const res = await fetch('/api/words', {
        method: 'POST',
      });

      const data = await res.json();
      console.log('✅ Upload success:', data);
    } catch (err) {
      console.error('❌ Upload failed:', err);
    }
  };

  return (
    <div>
      <h1>Test MongoDB Upload</h1>
      <button onClick={handleUpload}>Upload Static Word</button>
    </div>
  );
}
