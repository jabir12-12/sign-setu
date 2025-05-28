'use client';
import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

interface Word {
  _id: string;
  word: string;
  definition: string;
  imageUrl: string;
  videoUrl: string;
}

export default function StockDashboard() {
  const [isopen, setIsOpen] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [isdeleteOpen, setDeleteOpen] = useState(false);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');


  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch('/api/words');
        const data = await res.json();
        setWords(data.result);
      } catch (err) {
        console.error('Error fetching words:', err);
      }
    };

    fetchWords();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, definition, imageUrl, videoUrl }),
      });

      const data = await res.json();
      console.log('✅ Upload success:', data);
      setIsOpen(false); // close modal
    } catch (err) {
      console.error('❌ Upload failed:', err);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex flex-wrap justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm">
        {/* Left: Logo & Title */}
        <div className="flex items-center space-x-2 mb-2 md:mb-0 justify-center">
          <Image
            src="/images/ok.png"
            alt="Logo icon"
            width={30}
            height={30}
          />
          <h1 className="text-[#49243E] font-semibold text-lg md:text-2xl whitespace-nowrap">
            Sign Language Dictionary
          </h1>
        </div>

        {/* Right: Add Button */}
        <div className="flex items-center gap-2">
          <button className="bg-[#49243E] text-white px-3 py-2 rounded-full md:rounded-md flex items-center justify-center hover:bg-[#704264] transition-colors duration-200 shadow-md hover:shadow-md"
            onClick={() => setIsOpen(true)}>
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Add Words</span>
          </button>
        </div>
      </header>

      {/* Centered Search Bar */}
      <>
        <div className="text-center mt-8 px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#49243E]">
            Visual Sign Language Dictionary
          </h2>
          <p className="text-md md:text-lg text-[#704264] mt-2">
            Discover sign language through visuals and simple definitions.
          </p>
        </div>

        <div className="flex justify-center mt-8 px-4">
          <div className="relative w-full max-w-lg shadow-md rounded-lg bg-white">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <Search className="w-6 h-6" />
            </span>
            <input
              type="text"
              placeholder="Search words or definitions..."
              className="w-full pl-12 pr-5 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8493] focus:border-[#BB8493] hover:border-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Display Section */}
        <div className="my-10 px-4 max-w-3xl mx-auto space-y-6 flex flex-wrap justify-center gap-6">
          {/* Example card */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {words.map((wordObj) => (
              <div key={wordObj._id} className="relative bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition duration-200">
                {/* 3 Dots Menu */}
                <div className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                  <Popover>
                    <PopoverTrigger>
                      <button className="flex items-center justify-center w-10 h-10 rounded-md bg-white hover:bg-[#F2F4F7] shadow-none focus:outline-none">
                        <Image src="/images/three-dots.svg" width={18} height={18} alt="three-dots" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="flex flex-col px-0 py-2 text-sm font-normal bg-white rounded-md w-[167px] shadow-md">
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F2F4F7] w-full text-left" onClick={() => setIsOpen(true)}>
                        <Image src="/images/edit-icon.svg" width={18} height={18} alt="Edit" />
                        <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#FEE4E2] w-full text-left" onClick={() => setDeleteOpen(true)}>
                        <Image src="/images/delete.svg" width={18} height={18} alt="Delete" />
                        <span className="text-sm text-[#DE3024] font-normal">Delete</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>

                <h3 className="text-xl font-semibold text-[#49243E] mb-2">Word: {wordObj.word}</h3>
                <p className="text-gray-700 mb-2">Definition: {wordObj.definition}</p>

                <div className="mb-2">
                  <span className="font-medium text-[#704264]">Image: </span>
                  <a href={wordObj.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Click here to view
                  </a>
                </div>

                <div>
                  <span className="font-medium text-[#704264]">Video: </span>
                  <a href={wordObj.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Click here to view
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
      {/* Add Words */}
      <Dialog open={isopen} onClose={() => { setIsOpen(false) }} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            color: '#1D2939',
            fontWeight: 'bold',
            fontSize: '1.125rem'
          }}
        >
          <span className="text-black text-md">Add Word</span>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{ width: 32, height: 32 }}
          >
            <Image src="/images/cancel-01.svg" alt="Cancel" width={20} height={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: '0 1.5rem 1.5rem' }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Word</label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter word"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-[#49243E] focus:border-[#49243E] hover:border-[#49243E] transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Definition</label>
              <textarea
                placeholder="Enter definition"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-[#49243E] focus:border-[#49243E] hover:border-[#49243E] transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter external link (optional)"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-[#49243E] focus:border-[#49243E] hover:border-[#49243E] transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Video URL</label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter image URL"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-[#49243E] focus:border-[#49243E] hover:border-[#49243E] transition duration-200"
              />
            </div>
          </div>
        </DialogContent>


        <DialogActions
          sx={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #D0D5DD',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1.5
          }}
        >
          <Button
            onClick={() => setIsOpen(false)}
            variant="outlined"
            sx={{
              padding: '0.625rem 1.5rem',
              fontWeight: 600,
              borderRadius: '8px',
              fontSize: '0.875rem',
              borderColor: '#D0D5DD',
              color: '#344054',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#F2F4F7',
                borderColor: '#D0D5DD'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
              handleSubmit()
            }}
            variant="contained"
            sx={{
              padding: '0.625rem 1.5rem',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: '8px',
              backgroundColor: '#49243E',
              textTransform: 'none',
              boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05)',
              '&:hover': {
                backgroundColor: '#704264'
              }
            }}
          >
            Add Words
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isdeleteOpen} onClose={() => { setDeleteOpen(false) }} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            color: '#1D2939',
            fontWeight: 'bold',
            fontSize: '1.125rem'
          }}
        >
          <span className="text-black text-md">Delete Word</span>
          <IconButton
            onClick={() => setDeleteOpen(false)}
            sx={{ width: 32, height: 32 }}
          >
            <Image src="/images/cancel-01.svg" alt="Cancel" width={20} height={20} />
          </IconButton>
        </DialogTitle>

        {/* Body */}
        <DialogContent sx={{ padding: '0 1.5rem 1.5rem' }}>
          <span className="text-sm font-normal text-[#667085]">
            Once the Word is deleted you cannot restore it again.
          </span>
        </DialogContent>

        {/* Footer */}
        <DialogActions
          sx={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #EAECF0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1.5
          }}
        >
          <Button
            onClick={() => setDeleteOpen(false)}
            variant="outlined"
            sx={{
              padding: '0.625rem 1.5rem',
              fontWeight: 600,
              borderRadius: '8px',
              fontSize: '0.875rem',
              borderColor: '#EAECF0',
              color: '#1D2939',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#F2F4F7',
                borderColor: '#EAECF0'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setDeleteOpen(false)}
            variant="contained"
            sx={{
              padding: '0.625rem 1.5rem',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: '8px',
              backgroundColor: '#BB241A',
              color: 'white',
              border: '1px solid #DE3024',
              textTransform: 'none',
              boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05)',
              '&:hover': {
                backgroundColor: '#B0201A'
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}