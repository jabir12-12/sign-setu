'use client';
import React from 'react';
import Image from 'next/image';

export default function StockDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex flex-wrap justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm">
        {/* Left: Logo & Title */}
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <Image
            src="/images/i-love-you.png"
            alt="Dropdown icon"
            width={24}
            height={24}
          />
          <h1 className="text-gray-900 font-semibold text-lg md:text-2xl whitespace-nowrap">
            Sign Language Dictionary
          </h1>
        </div>

        {/* Right: Add Button */}
        <div className="flex items-center gap-2">
          <button className="bg-[#49243E] text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2">
            <Image
              src="/images/plus.png"
              alt="Add icon"
              width={20}
              height={20}
            />
            <span>Add Words</span>
          </button>
        </div>
      </header>
    </div>
  );
}
