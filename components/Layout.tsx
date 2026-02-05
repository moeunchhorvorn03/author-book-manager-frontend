import { Category, CartItem } from '@/types';
import React, { useState, useEffect } from 'react';
import BookGrid from './BookGrid';
import Cart from './Cart';
import Footer from './Footer';
import GeminiAI from './GeminiAI';
import Hero from './Hero';
import Navbar from './Navbar';
import { request } from '@/services/requestService';
import { storage } from '@/services/storageService';
import { Book, BookRequestBody } from '@/models/Book.type';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { setCurrentView } from '@/store/slices/viewSlice';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { searchValue: searchValueFromLocation } = location.state || {};
    const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
    const [searchValue, setSearchValue] = useState<string>("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [showPopup, setShowPopup] = useState(true);
    const [isOpen, setOpen] = useState(false);
    const isPromotion = storage.getLocalItem("isPromotion") === "Y";
    const currentView = useAppSelector(state => state.view.currentView)
    const dispatch = useAppDispatch()

    useEffect(() => {
        handleOpen();
        if (searchValueFromLocation) {
            setSearchValue(searchValueFromLocation);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);

    useEffect(() => {
        getBooks(activeCategory, searchValue);
    }, [activeCategory, searchValue]);

    const getBooks = (category: Category | "All", searchValue) => {
        const body: BookRequestBody = {
            category: category,
            searchValue: searchValue
        };

        request
            .get('books/filter', body)
            .then((data: Book[]) => {
                setBooks(data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    const handleBookClick = (book: Book) => {
        navigate(`/book/${book.id}`);
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

    const handleJoinCommunity = () => {
        handleClosePopup();
    };

    const handleClosePopup = () => {
        setOpen(false);
        storage.setLocalItem("isPromotion", "N");
        setTimeout(() => {
            setShowPopup(false);
        }, 600);
    };

    const handleOpen = () => {
        if (!isPromotion) {
            setShowPopup(false);
            return;
        };

        setTimeout(() => {
            setOpen(true);
        }, 600);
    }

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return (
                    <>
                        <Hero onExplore={() => dispatch(setCurrentView('shop'))} />
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <h2 className="text-3xl font-serif font-bold text-gray-900">Featured Collection</h2>
                                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
                                    {['All', ...Object.values(Category)].map((category: Category) => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveCategory(category)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === category
                                                ? 'bg-amber-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <BookGrid
                                books={books}
                                onBookClick={handleBookClick}
                                onAddToCart={addToCart}
                            />
                        </section>
                        <GeminiAI />
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
                            <aside className="w-full md:w-64 shrink-0 space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                                    <div className="space-y-2">
                                        {['All', ...Object.values(Category)].map((category: Category) => (
                                            <button
                                                key={category}
                                                onClick={
                                                    () => {
                                                        setActiveCategory(category);

                                                    }
                                                }
                                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeCategory === category ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                            <div className="flex-1">
                                <BookGrid
                                    onBookClick={handleBookClick}
                                    onAddToCart={addToCart}
                                    books={books}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'cart':
                return (
                    <Cart
                        items={cart}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                        onContinueShopping={() => dispatch(setCurrentView('shop'))}
                    />
                );
            default:
                return null;
        }
    };

    const onSearch = (searchValue: string) => {
        setSearchValue(searchValue);
        getBooks(activeCategory, searchValue);
    };

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar
                    cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                    onSearch={onSearch}
                    searchValue={searchValue}
                />
                <main className="grow pt-16">
                    {renderView()}
                </main>
                <Footer />
            </div>

            {/* Discount Popup Modal */}
            {
                showPopup && <div
                    className={`fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm transition-opacity duration-600 ${isOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={handleClosePopup}
                >
                    <div
                        className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden relative transition-all duration-600 ${isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-white"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Header Section */}
                        <div className="relative h-56 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Beautiful bookshelf"
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                            
                            {/* Discount Badge */}
                            <div className="absolute top-6 left-6 bg-red-500 text-white px-5 py-2.5 rounded-full font-bold text-xl shadow-xl animate-pulse flex items-center gap-2">
                                <span className="text-2xl">🎉</span>
                                <span>10% OFF</span>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 text-center bg-gradient-to-b from-white to-amber-50/30">
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                                Join Our Community
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Get <span className="font-bold text-amber-600 text-xl">10% off</span> your first purchase!
                            </p>

                            {/* Decorative Book Icons */}
                            <div className="flex justify-center items-center gap-3 mb-6">
                                <div className="relative group">
                                    <img
                                        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                        alt="Book"
                                        className="w-14 h-14 rounded-md object-cover shadow-lg transform group-hover:scale-110 transition-transform"
                                    />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="relative group">
                                    <img
                                        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                        alt="Book"
                                        className="w-14 h-14 rounded-md object-cover shadow-lg transform group-hover:scale-110 transition-transform"
                                    />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="relative group">
                                    <img
                                        src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                        alt="Book"
                                        className="w-14 h-14 rounded-md object-cover shadow-lg transform group-hover:scale-110 transition-transform"
                                    />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 rounded-full border-2 border-white"></div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleJoinCommunity}
                                    className="flex-1 px-8 py-3.5 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <span>Join Now</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleClosePopup}
                                    className="flex-1 px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                                >
                                    Maybe Later
                                </button>
                            </div>

                            {/* Trust Badge */}
                            <p className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>No credit card required</span>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Layout;
