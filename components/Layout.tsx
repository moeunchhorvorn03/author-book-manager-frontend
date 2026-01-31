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
                >
                    <div
                        className={`bg-white rounded-sm shadow-2xl flex items-center justify-center max-w-xl h-80 w-full overflow-hidden relative transition-all duration-600 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                            }`}
                    >
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="gray" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8 text-center">
                            <h2 className="text-3xl font-bold text-amber-600 mb-3">
                                Join Our Community
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                <span className="font-bold text-amber-600">Get 10% off your first purchase!</span>
                            </p>

                            <button
                                onClick={handleJoinCommunity}
                                className="flex-1 px-10 py-3 bg-amber-600 text-white font-semibold animate-bounce rounded-sm hover:bg-amber-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Layout;
