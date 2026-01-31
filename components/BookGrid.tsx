import React, { useState } from 'react';
import BookCard from './BookCard';
import { Category } from '../types';
import { Book } from '@/models/Book.type';

interface BookGridProps {
    onBookClick: (book: Book) => void;
    onAddToCart: (book: Book) => void;
    books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ onBookClick, onAddToCart, books }) => {
    if (books.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {books.map(book => (
                <BookCard
                    key={book.id}
                    book={book}
                    onClick={onBookClick}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
};

export default BookGrid;
