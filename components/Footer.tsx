
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <h2 className="text-2xl font-serif font-bold text-amber-900 mb-6">Power<span className="text-amber-600">Books</span></h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Curating stories that enlighten, entertain, and inspire since 2026. Your premium destination for literature.
                        </p>
                        <div className="flex gap-4">
                            {['facebook', 'twitter', 'instagram'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-colors">
                                    <span className="sr-only">{social}</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.04c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Shop</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-amber-600">All Books</a></li>
                            <li><a href="#" className="hover:text-amber-600">Bestsellers</a></li>
                            <li><a href="#" className="hover:text-amber-600">Gift Cards</a></li>
                            <li><a href="#" className="hover:text-amber-600">New Arrivals</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Support</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-amber-600">Contact Us</a></li>
                            <li><a href="#" className="hover:text-amber-600">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-amber-600">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-amber-600">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Newsletter</h3>
                        <p className="text-xs text-gray-500 mb-4">Join our community and get 10% off your first purchase.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-l-lg py-2 px-4 text-xs focus:outline-none"
                            />
                            <button className="bg-amber-600 text-white px-4 py-2 rounded-r-lg text-xs font-bold">Join</button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">&copy; 2026 Power Books. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-gray-400">
                        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600">Terms of Service</a>
                        <a href="#" className="hover:text-gray-600">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
