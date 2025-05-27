'use client';
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { IconButton, Typography } from '@mui/material';

export default function StockDashboard() {
  const [isopen, setIsOpen] = useState(false);
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
        <div className="mt-10 px-4 max-w-3xl mx-auto space-y-6">
          {/* Example card */}
          <div className="relative bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition duration-200">
            {/* 3 Dots Menu */}
            <div className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700">
              <span className="text-2xl font-bold">⋮</span>
            </div>

            <h3 className="text-xl font-semibold text-[#49243E] mb-2">Word: Hello</h3>
            <p className="text-gray-700 mb-2">Definition: A greeting or expression of goodwill.</p>

            <div className="mb-2">
              <span className="font-medium text-[#704264]">Image: </span>
              <a
                href="https://example.com/image.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Click here to view
              </a>
            </div>

            <div>
              <span className="font-medium text-[#704264]">Video: </span>
              <a
                href="https://example.com/video.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Click here to view
              </a>
            </div>
          </div>

          {/* You can map this design with dynamic data */}
        </div>
      </>
      {/* Add Words */}
      <Dialog open={isopen} onClose={() => setIsOpen(false)} maxWidth="xs" fullWidth>
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
                placeholder="Enter word"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-[#49243E] focus:border-[#49243E] hover:border-[#49243E] transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Definition</label>
              <textarea
                placeholder="Enter definition"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-[#49243E] focus:border-[#49243E] hover:border-[#49243E] transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                placeholder="Enter external link (optional)"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-[#49243E] focus:border-[#49243E] hover:border-[#49243E] transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Video URL</label>
              <input
                type="url"
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
              () => setIsOpen(false)
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

    </div>
  );
}
