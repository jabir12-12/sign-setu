'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, X } from 'lucide-react';

// Types and Interfaces
interface Word {
  _id: string;
  word: string;
  definition: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface FormData {
  word: string;
  definition: string;
  imageUrl: string;
  videoUrl: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Word | Word[];
}

const StockDashboard: React.FC = () => {
  // State with proper TypeScript types
  const [words, setWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    word: '',
    definition: '',
    imageUrl: '',
    videoUrl: ''
  });

  // Fetch words from API
  const fetchWords = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/words');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Word[] = await response.json();
      setWords(data);
      setFilteredWords(data);
    } catch (error) {
      console.error('Error fetching words:', error);
      setError('Failed to fetch words. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add new word
  const addWord = async (): Promise<void> => {
    if (!formData.word.trim() || !formData.definition.trim()) {
      setError('Please fill in both word and definition fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: formData.word.trim(),
          definition: formData.definition.trim(),
          imageUrl: formData.imageUrl.trim() || undefined,
          videoUrl: formData.videoUrl.trim() || undefined,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchWords();
      setIsAddOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding word:', error);
      setError('Failed to add word. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Edit word
  const editWord = async (): Promise<void> => {
    if (!formData.word.trim() || !formData.definition.trim()) {
      setError('Please fill in both word and definition fields.');
      return;
    }

    if (!currentWord) {
      setError('No word selected for editing.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`/api/words/${currentWord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: formData.word.trim(),
          definition: formData.definition.trim(),
          imageUrl: formData.imageUrl.trim() || undefined,
          videoUrl: formData.videoUrl.trim() || undefined,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchWords();
      setIsEditOpen(false);
      resetForm();
      setCurrentWord(null);
    } catch (error) {
      console.error('Error editing word:', error);
      setError('Failed to update word. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete word
  const deleteWord = async (): Promise<void> => {
    if (!currentWord) {
      setError('No word selected for deletion.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`/api/words/${currentWord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchWords();
      setIsDeleteOpen(false);
      setCurrentWord(null);
    } catch (error) {
      console.error('Error deleting word:', error);
      setError('Failed to delete word. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = (): void => {
    setFormData({
      word: '',
      definition: '',
      imageUrl: '',
      videoUrl: ''
    });
    setError('');
  };

  // Handle search
  const handleSearch = (term: string): void => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredWords(words);
    } else {
      const searchLower = term.toLowerCase();
      const filtered = words.filter(word =>
        word.word.toLowerCase().includes(searchLower) ||
        word.definition.toLowerCase().includes(searchLower)
      );
      setFilteredWords(filtered);
    }
  };

  // Handle edit click
  const handleEditClick = (word: Word): void => {
    setCurrentWord(word);
    setFormData({
      word: word.word,
      definition: word.definition,
      imageUrl: word.imageUrl || '',
      videoUrl: word.videoUrl || ''
    });
    setIsEditOpen(true);
    setOpenPopover(null);
    setError('');
  };

  // Handle delete click
  const handleDeleteClick = (word: Word): void => {
    setCurrentWord(word);
    setIsDeleteOpen(true);
    setOpenPopover(null);
    setError('');
  };

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  // Handle modal close
  const handleModalClose = (modalType: 'add' | 'edit' | 'delete'): void => {
    switch (modalType) {
      case 'add':
        setIsAddOpen(false);
        resetForm();
        break;
      case 'edit':
        setIsEditOpen(false);
        resetForm();
        setCurrentWord(null);
        break;
      case 'delete':
        setIsDeleteOpen(false);
        setCurrentWord(null);
        setError('');
        break;
    }
  };

  // Load words on component mount
  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex flex-wrap justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-2 md:mb-0 justify-center">
          <div className="w-8 h-8 bg-[#49243E] rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
          <h1 className="text-[#49243E] font-semibold text-lg md:text-2xl whitespace-nowrap">
            Sign Language Dictionary
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="bg-[#49243E] text-white px-3 py-2 rounded-full md:rounded-md flex items-center justify-center hover:bg-[#704264] transition-colors duration-200 shadow-md hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setIsAddOpen(true)}
            disabled={loading}
            type="button"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Add Words</span>
          </button>
        </div>
      </header>

      {/* Centered Search Bar */}
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
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB8493] focus:border-[#BB8493] hover:border-gray-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-4 mt-4 max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        </div>
      )}

      {/* Display Section */}
      <div className="my-10 px-4 max-w-6xl mx-auto">
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {!loading && filteredWords.length === 0 && (
          <div className="text-center text-gray-500">
            {searchTerm ? 'No words found matching your search.' : 'No words added yet. Click "Add Words" to get started!'}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word: Word) => (
            <div key={word._id} className="relative bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition duration-200">
              {/* 3 Dots Menu */}
              <div className="absolute top-4 right-4">
                <div className="relative">
                  <button
                    className="flex items-center justify-center w-8 h-8 rounded-md bg-white hover:bg-gray-100 focus:outline-none"
                    onClick={() => setOpenPopover(openPopover === word._id ? null : word._id)}
                    type="button"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>

                  {openPopover === word._id && (
                    <div className="absolute right-0 top-8 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[120px] z-10">
                      <button
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full text-left text-sm"
                        onClick={() => handleEditClick(word)}
                        type="button"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 w-full text-left text-sm text-red-600"
                        onClick={() => handleDeleteClick(word)}
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#49243E] mb-2 pr-8">
                Word: {word.word}
              </h3>
              <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                Definition: {word.definition}
              </p>

              {word.imageUrl && (
                <div className="mb-2">
                  <span className="font-medium text-[#704264] text-sm">Image: </span>
                  <a
                    href={word.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm hover:text-blue-800"
                  >
                    Click here to view
                  </a>
                </div>
              )}

              {word.videoUrl && (
                <div>
                  <span className="font-medium text-[#704264] text-sm">Video: </span>
                  <a
                    href={word.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm hover:text-blue-800"
                  >
                    Click here to view
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Click outside to close popover */}
      {openPopover && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setOpenPopover(null)}
        />
      )}

      {/* Add Word Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Add Word</h3>
              <button
                onClick={() => handleModalClose('add')}
                className="text-gray-400 hover:text-gray-600"
                type="button"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Word *
                </label>
                <input
                  type="text"
                  value={formData.word}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('word', e.target.value)}
                  placeholder="Enter word"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49243E] focus:border-[#49243E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Definition *
                </label>
                <textarea
                  value={formData.definition}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('definition', e.target.value)}
                  placeholder="Enter definition"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49243E] focus:border-[#49243E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="Enter image URL (optional)"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49243E] focus:border-[#49243E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="Enter video URL (optional)"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49243E] focus:border-[#49243E]"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => handleModalClose('add')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                disabled={loading}
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={addWord}
                disabled={loading || !formData.word.trim() || !formData.definition.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-[#49243E] rounded-md hover:bg-[#704264] disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                {loading ? 'Adding...' : 'Add Word'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Word Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Edit Word</h3>
              <button
                onClick={() => handleModalClose('edit')}
                className="text-gray-400 hover:text-gray-600"
                type="button"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Word *
                </label>
                <input
                  type="text"
                  value={formData.word}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('word', e.target.value)}
                  placeholder="Enter word"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49243E] focus:border-[#49243E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Definition *
                </label>
                <textarea
                  value={formData.definition}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('definition', e.target.value)}
                  placeholder="Enter definition"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49243E] focus:border-[#49243E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="Enter image URL (optional)"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49243E] focus:border-[#49243E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="Enter video URL (optional)"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#49243E] focus:border-[#49243E]"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => handleModalClose('edit')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                disabled={loading}
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={editWord}
                disabled={loading || !formData.word.trim() || !formData.definition.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-[#49243E] rounded-md hover:bg-[#704264] disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                {loading ? 'Updating...' : 'Update Word'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && currentWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Delete Word</h3>
              <button
                onClick={() => handleModalClose('delete')}
                className="text-gray-400 hover:text-gray-600"
                type="button"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete the word "{currentWord.word}"?
                This action cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => handleModalClose('delete')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                disabled={loading}
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={deleteWord}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockDashboard;