
import { Book, BookDetailRequestBody, BookRequestBody } from '@/models/Book.type';
import { request } from '@/services/requestService';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { setCurrentView } from '@/store/slices/viewSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

const BookDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const previousView = useAppSelector(state => state.view.previousView);
    const [book, setBook] = useState<Book>({
        id: "",
        title: "",
        author: "",
        price: 0,
        rating: 0,
        description: "",
        category: "",
        coverImage: "",
        isBestseller: false,
        review: 0,
    });
    
    useEffect(() => {
        getBookDetail(id);
    }, [id]);
    
    useEffect(() => {
        dispatch(setCurrentView(null));
    }, []);

    const getBookDetail = (id: string | number) => {
        request
            .get('books/'+id, {}, { method: 'GET' })
            .then((data: Book) => {
                setBook(data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    const onSearch = (searchValue: string) => {
        dispatch(setCurrentView('home'));
        navigate("/home", { state: { searchValue } });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleBack = () => {
        dispatch(setCurrentView(previousView));
        navigate(-1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <main className="grow pt-16">
                    <Navbar
                        cartCount={0}
                        onSearch={onSearch}
                    />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <button
                            onClick={handleBack}
                            className="flex items-center text-sm font-medium text-gray-500 hover:text-amber-600 mb-8 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Gallery
                        </button>

                        <div className="flex flex-col lg:flex-row gap-12">
                            <div className="lg:w-1/3">
                                <div className="sticky top-24">
                                    <div className="relative aspect-2/3 rounded-2xl overflow-hidden shadow-2xl">
                                        { book.coverImage && <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" /> }
                                        { book.isBestseller && (
                                            <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                #1 BESTSELLER
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-2/3">
                                <div className="mb-8">
                                    <span className="text-amber-600 font-bold tracking-widest text-sm uppercase">{book.category}</span>
                                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mt-2 mb-4">{book.title}</h1>
                                    <p className="text-xl text-gray-600 italic">by {book.author}</p>
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex items-center text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="ml-2 text-gray-900 font-bold">{book.rating}</span>
                                    </div>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-500 text-sm">{book.review.toLocaleString()} Review{book.review > 0 && "s"}</span>
                                </div>

                                <div className="prose prose-amber max-w-none mb-10">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">About this book</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {book.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                    <div className="text-center sm:text-left">
                                        <p className="text-gray-500 text-sm mb-1">Price</p>
                                        <p className="text-3xl font-bold text-gray-900">${book.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex-1 w-full flex gap-4">
                                        <button
                                            onClick={() => {}}
                                            className="flex-1 bg-amber-600 text-white py-4 px-8 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200 transform active:scale-95"
                                        >
                                            Add to Cart
                                        </button>
                                        <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default BookDetails;
