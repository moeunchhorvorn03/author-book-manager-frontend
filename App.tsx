import React from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { Route, Routes } from 'react-router-dom';
import { storage } from './services/storageService';
import { WARM_TTL } from './constants';

const App: React.FC = () => {
    const warmedAt = storage.getLocalItem("warmed_at");
    const isStillWarm = !!warmedAt && Date.now() - Number(warmedAt) < WARM_TTL;

    return (
        <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<Layout />} />
        </Routes>
    );
};

export default App;
