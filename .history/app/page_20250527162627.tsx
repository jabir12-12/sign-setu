'use client';
import React from 'react';
import Image from 'next/image';
import { Plus, Search } from 'lucide-react';

export default function StockDashboard() {
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
          <button className="bg-[#49243E] text-white px-3 py-2 rounded-full md:rounded-md flex items-center justify-center hover:bg-[#704264] transition-colors duration-200 shadow-md hover:shadow-md">
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Add Words</span>
          </button>
        </div>
      </header>

      {/* Centered Search Bar */}
      <div className="text-center mt-6 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#49243E]">
          Visual Sign Language Dictionary
        </h2>
        <p className="text-md md:text-lg text-[#704264] mt-2">
          Discover sign language through visuals and simple definitions.
        </p>
      </div>

      <div className="flex justify-center mt-8 px-4">
        <div className="relative w-full max-w-lg shadow-md">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
            <Search className="w-6 h-6" /> {/* Bigger icon */}
          </span>
          <input
            type="text"
            placeholder="Search words or definitions..."
            className="w-full pl-12 pr-5 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8493] focus:border-[#BB8493] hover:border-gray-400 transition-all duration-200"
          />
        </div>
      </div>

    </div>
  );
}
