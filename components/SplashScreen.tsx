import { request } from '@/services/requestService';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SplashScreenProps {
    onExplore: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onExplore }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = () => {
        const body = {
            category: "All",
            id: "",
            title: "",
            authorId: 0,
            publishedYear: "",
            author: "",
            price: 0,
            rating: 0,
            coverImage: "",
            description: "",
            is_best_seller: true
        };
        request.get('books', body)
            .then(() => {
                setShowPopup(true);
            }).catch((error) => {
                console.error('Error fetching health:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleJoinCommunity = () => {
        setShowPopup(false);
        navigate('/home', { replace: true });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/home', { replace: true });
    };

    return (
        <>
            {/* Loading Screen */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 via-amber-100 to-orange-50 z-50">
                    <div className="text-center">
                        {/* Animated Book Stack */}
                        <div className="relative mb-8">
                            <div className="flex justify-center items-end space-x-2">
                                {/* Book 1 */}
                                <div className="w-12 h-16 bg-amber-600 rounded-sm shadow-lg animate-bounce" style={{ animationDelay: '0s', animationDuration: '1s' }}>
                                    <div className="h-full w-full bg-gradient-to-br from-amber-700 to-amber-500 rounded-sm"></div>
                                </div>
                                {/* Book 2 */}
                                <div className="w-12 h-20 bg-orange-500 rounded-sm shadow-lg animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1s' }}>
                                    <div className="h-full w-full bg-gradient-to-br from-orange-600 to-orange-400 rounded-sm"></div>
                                </div>
                                {/* Book 3 */}
                                <div className="w-12 h-18 bg-amber-500 rounded-sm shadow-lg animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1s' }}>
                                    <div className="h-full w-full bg-gradient-to-br from-amber-600 to-amber-400 rounded-sm"></div>
                                </div>
                            </div>
                        </div>

                        {/* Logo/Title */}
                        <h1 className="text-5xl font-serif font-bold text-amber-700 mb-4 animate-pulse">
                            PowerBooks
                        </h1>

                        {/* Loading Spinner */}
                        <div className="flex justify-center mt-6">
                            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>

                        {/* Background Decorative Image */}
                        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                            <img
                                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                                alt="Books background"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Discount Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp relative">
                        {/* Close Button */}
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Section */}
                        <div className="relative h-48 bg-gradient-to-br from-amber-400 to-orange-500 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Community celebration"
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            {/* Discount Badge */}
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-pulse">
                                10% OFF
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 text-center">
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
                                Join Our Community
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Get <span className="font-bold text-amber-600">10% off</span> your first purchase!
                            </p>

                            {/* Decorative Book Icons */}
                            <div className="flex justify-center space-x-2 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                    alt="Book"
                                    className="w-12 h-12 rounded object-cover shadow-md"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                    alt="Book"
                                    className="w-12 h-12 rounded object-cover shadow-md"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                    alt="Book"
                                    className="w-12 h-12 rounded object-cover shadow-md"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleJoinCommunity}
                                    className="flex-1 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Join Now
                                </button>
                                <button
                                    onClick={handleClosePopup}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
        </>
    );
};

export default SplashScreen;
