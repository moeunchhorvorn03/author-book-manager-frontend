
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookGrid from './components/BookGrid';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import GeminiGuru from './components/GeminiGuru';
import Footer from './components/Footer';
import { Book, View, Category, CartItem } from './types';
import { BOOKS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    return BOOKS.filter(book => {
      const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        return prev.map(item => 
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.book.id === bookId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero onExplore={() => setCurrentView('shop')} />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Featured Collection</h2>
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
                  {['All', ...Object.values(Category)].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as Category | 'All')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        activeCategory === cat 
                        ? 'bg-amber-600 text-white shadow-md' 
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <BookGrid 
                books={filteredBooks} 
                onBookClick={handleBookClick} 
                onAddToCart={addToCart} 
              />
            </section>
            <GeminiGuru />
          </>
        );
      case 'shop':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <div className="mb-12 text-center">
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">The Catalog</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">Browse our carefully curated selection of timeless classics and modern masterpieces.</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {['All', ...Object.values(Category)].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as Category | 'All')}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === cat ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
              <div className="flex-1">
                <BookGrid 
                  books={filteredBooks} 
                  onBookClick={handleBookClick} 
                  onAddToCart={addToCart} 
                />
              </div>
            </div>
          </div>
        );
      case 'details':
        return selectedBook ? (
          <BookDetails 
            book={selectedBook} 
            onBack={() => setCurrentView('home')} 
            onAddToCart={addToCart}
          />
        ) : null;
      case 'cart':
        return (
          <Cart 
            items={cart} 
            onUpdateQuantity={updateQuantity} 
            onRemove={removeFromCart} 
            onContinueShopping={() => setCurrentView('shop')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onSearch={setSearchQuery}
      />
      <main className="flex-grow pt-16">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
