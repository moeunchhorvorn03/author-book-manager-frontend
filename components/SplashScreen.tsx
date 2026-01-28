import { WARM_TTL } from '@/constants';
import { BookRequestBody } from '@/models/Book.type';
import { request } from '@/services/requestService';
import { storage } from '@/services/storageService';
import { Category } from '@/types';
import React, { useState, useEffect } from 'react';
import { replace, useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const warmedAt = storage.getLocalItem("warmed_at");
    const isStillWarm = !!warmedAt && Date.now() - Number(warmedAt) < WARM_TTL;

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = () => {
        const body: BookRequestBody = {
            category: "All",
            searchValue: ""
        };

        if (isStillWarm) {
            navigate("/home", { replace: true });
            storage.setLocalItem("isPromotion", "N");
            return;
        }

        request.get('books/filter', body)
            .then(() => {
                navigate("/home", { replace: true });
                storage.setLocalItem("isPromotion", "Y");
            }).catch((error) => {
                console.error('Error fetching health:', error);
            })
            .finally(() => {
                setIsLoading(false);
                storage.setLocalItem("warmed_at", Date.now().toString());
            });
    };

    return (
        <>
            {/* Loading Screen */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 z-50">
                    <div className="text-center">
                        {/* Animated Book Stack */}
                        <div className="relative mb-8">
                            <div className="flex justify-center items-end space-x-2">
                                {/* Book 1 */}
                                <div className="w-12 h-16 bg-amber-600 rounded-sm shadow-lg animate-bounce" style={{ animationDelay: '0s', animationDuration: '1s' }}>
                                    <div className="h-full w-full bg-linear-to-br from-amber-700 to-amber-500 rounded-sm"></div>
                                </div>
                                {/* Book 2 */}
                                <div className="w-12 h-20 bg-orange-500 rounded-sm shadow-lg animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1s' }}>
                                    <div className="h-full w-full bg-linear-to-br from-orange-600 to-orange-400 rounded-sm"></div>
                                </div>
                                {/* Book 3 */}
                                <div className="w-12 h-18 bg-amber-500 rounded-sm shadow-lg animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1s' }}>
                                    <div className="h-full w-full bg-linear-to-br from-amber-600 to-amber-400 rounded-sm"></div>
                                </div>
                            </div>
                        </div>

                        {/* Logo/Title */}
                        <h1 className="text-5xl font-serif font-bold text-amber-700 mb-4 animate-pulse">
                            PowerBooks
                        </h1>

                        {/* Loading Spinner */}
                        {/* <div className="flex justify-center mt-6">
                            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                        </div> */}

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
        </>
    );
};

export default SplashScreen;
