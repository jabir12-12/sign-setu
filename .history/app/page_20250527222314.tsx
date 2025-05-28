'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import axios from 'axios';

export default function StockDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [dictionary, setDictionary] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchWords = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/words');
      setDictionary(res.data);
    } catch (err) {
      console.error('Error fetching words:', err);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 flex flex-wrap justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-2 md:mb-0 justify-center">
          <Image src="/images/ok.png" alt="Logo icon" width={30} height={30} />
          <h1 className="text-[#49243E] font-semibold text-lg md:text-2xl whitespace-nowrap">
            Sign Language Dictionary
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-[#49243E] text-white px-3 py-2 rounded-full md:rounded-md flex items-center justify-center hover:bg-[#704264] transition-colors duration-200 shadow-md hover:shadow-md"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Add Words</span>
          </button>
        </div>
      </header>

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search words or definitions..."
            className="w-full pl-12 pr-5 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8493] focus:border-[#BB8493] hover:border-gray-400 transition-all duration-200"
          />
        </div>
      </div>

      <div className="my-10 px-4 max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
        {dictionary
          .filter((entry) =>
            entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((entry) => (
            <div key={entry._id} className="relative bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition duration-200">
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
              <h3 className="text-xl font-semibold text-[#49243E] mb-2">Word: {entry.word}</h3>
              <p className="text-gray-700 mb-2">Definition: {entry.definition}</p>
              <div className="mb-2">
                <span className="font-medium text-[#704264]">Image: </span>
                <a href={entry.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Click here to view
                </a>
              </div>
              <div>
                <span className="font-medium text-[#704264]">Video: </span>
                <a href={entry.video} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Click here to view
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
