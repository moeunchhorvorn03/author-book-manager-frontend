
import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative bg-amber-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-amber-800 uppercase bg-amber-200 rounded-full">
                New Arrivals Available Now
              </span>
              <h1 className="text-4xl tracking-tight font-serif font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Escape into a world of</span>{' '}
                <span className="block text-amber-600 xl:inline">endless stories.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover your next favorite book from our collection of hand-picked masterpieces. From timeless classics to the latest bestsellers, Power brings stories to your doorstep.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <button
                  onClick={onExplore}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-amber-200 transition-all transform hover:-translate-y-1"
                >
                  Explore Collection
                </button>
                <button
                  className="mt-3 sm:mt-0 w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-amber-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all"
                >
                  View Bestsellers
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Bookshelf library"
        />
        <div className="absolute inset-0 bg-linear-to-r from-amber-50 via-transparent to-transparent lg:block hidden"></div>
      </div>
    </div>
  );
};

export default Hero;
