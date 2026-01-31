import React from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { Route, Routes } from 'react-router-dom';
import BookDetails from './components/BookDetails';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="home" element={<Layout />} />
            <Route path="book/:id" element={<BookDetails />} />
        </Routes>
    );
};

export default App;
