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
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

export default function StockDashboard() {
  const [isopen, setIsOpen] = useState(false);
  const [isdeleteOpen, setDeleteOpen] = useState(false);
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
          <div className="relative bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition duration-200">
            {/* 3 Dots Menu */}
            <div className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-md bg-white hover:bg-[#F2F4F7] shadow-none focus:outline-none"
                    aria-label="More options"
                  >
                    <Image src="/images/three-dots.svg" width={18} height={18} alt="three-dots" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="flex flex-col px-0 py-2 text-sm font-normal bg-white rounded-md w-[167px] shadow-md">
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F2F4F7] w-full text-left"
                    onClick={() => setIsOpen(true)}>
                    <Image src="/images/edit-icon.svg" width={18} height={18} alt="Edit" />
                    <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#FEE4E2] w-full text-left"
                    onClick={() => setDeleteOpen(true)}>
                    <Image src="/images/delete.svg" width={18} height={18} alt="Delete" />
                    <span className="text-sm text-[#DE3024] font-normal">Delete</span>
                  </button>
                </PopoverContent>
              </Popover>
            </div>
            <h3 className="text-xl font-semibold text-[#49243E] mb-2">Word: Hello</h3>
            <p className="text-gray-700 mb-2">Definition: A greeting or expression of goodwill.
              A greeting or expression of goodwill.
              A greeting or expression of goodwill.
            </p>

            <div className="mb-2">
              <span className="font-medium text-[#704264]">Image: </span>
              <a
                href="data:image/jpeg;base64,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"
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
                href="https://www.youtube.com/watch?v=S1l487Ev9g4"
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
      {/* modal for the delete */}
      <Dialog open={isdeleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="xs" fullWidth>
        {/* Header */}
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
          <span>Delete Word?</span>
          <IconButton
            onClick={() => setIsOpen(false)}
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
