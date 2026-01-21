import React from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<Layout />} />
        </Routes>
    );
};

export default App;
