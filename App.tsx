import React from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import BookDetails from './components/BookDetails';
import Login from './components/Login';
import { storage } from './services/storageService';

const App: React.FC = () => {
    const RequireAuth: React.FC = () => {
        const isLoggedIn = !!storage.getLocalItem("token");
        const location = useLocation();
      
        if (!isLoggedIn) {
          return <Navigate to="/login" state={{ from: location }} replace />;
        }
      
        return <Outlet />;
    }

    return (
        <>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="home" element={<Layout />} />
                    <Route path="book/:id" element={<BookDetails />} />
                </Route>
                <Route path="/" element={<SplashScreen />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </>
    );
};

export default App;
