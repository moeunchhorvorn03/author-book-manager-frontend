
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div 
        className="relative aspect-2/3 overflow-hidden cursor-pointer"
        onClick={() => onClick(book)}
      >
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {book.isBestseller && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
            Bestseller
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
           <button 
            onClick={(e) => { e.stopPropagation(); onClick(book); }}
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-amber-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">{book.category}</span>
          <div className="flex items-center text-amber-500">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-xs font-bold">{book.rating}</span>
          </div>
        </div>
        <h3 
          className="text-lg font-serif font-bold text-gray-900 mb-1 line-clamp-1 cursor-pointer hover:text-amber-700 transition-colors"
          onClick={() => onClick(book)}
        >
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{book.author}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${book.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(book)}
            className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-300 transform active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
