// src/App.jsx
import { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import OfflineIndicator from './components/OfflineIndicator';
import HomePage from './pages/HomePage';
import PartsPage from './pages/PartsPage';
import BestCPUPage from './pages/BestCPUPage';
import BestGPUPage from './pages/BestGPUPage';
import BestRAMPage from './pages/BestRAMPage';
import BestHDDPage from './pages/BestHDDPage';
import BestSSDPage from './pages/BestSSDPage';
import BestUSBPage from './pages/BestUSBPage';
import ProfilePage from './pages/ProfilePage';
import SplashScreen from './pages/SplashScreen';
import TipsPage from './pages/TipsPage';
import AboutPage from './pages/AboutPage';
import { dbManager } from './utils/indexedDB';

const DetailCPUPage = lazy(() => import('./pages/DetailCPUPage'));
const DetailGPUPage = lazy(() => import('./pages/DetailGPUPage'));
const DetailRAMPage = lazy(() => import('./pages/DetailRAMPage'));
const DetailHDDPage = lazy(() => import('./pages/DetailHDDPage'));
const DetailSSDPage = lazy(() => import('./pages/DetailSSDPage'));
const DetailUSBPage = lazy(() => import('./pages/DetailUSBPage'));

const LoadingScreen = () => (
  <div style={{
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "1.5rem",
    gap: "1rem"
  }}>
    <div style={{
      width: "60px",
      height: "60px",
      border: "4px solid rgba(124, 58, 237, 0.3)",
      borderTop: "4px solid #7c3aed",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    Loading...
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('splash');
  const [wishlist, setWishlist] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        await dbManager.init();
        setDbInitialized(true);
        console.log('✅ IndexedDB initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize IndexedDB:', error);
        setDbInitialized(true);
      }
    };

    initDB();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse wishlist:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (wishlist.length > 0 || localStorage.getItem('wishlist')) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  useEffect(() => {
    if (currentPage === 'splash') {
      const timer = setTimeout(() => setCurrentPage('home'), 2200);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('✅ Service Worker registered:', registration);
          })
          .catch(error => {
            console.log('❌ Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Back online - Syncing data...');
    };

    const handleOffline = () => {
      console.log('📴 You are offline - Using cached data');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    setSelectedData(data || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'splash') {
    return <SplashScreen />;
  }

  if (!dbInitialized) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        wishlistCount={wishlist.length} 
      />
      
      {/* Offline Indicator */}
      <OfflineIndicator />
      
      <Suspense fallback={<LoadingScreen />}>
        {/* Main Pages */}
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'parts' && <PartsPage onNavigate={handleNavigate} />}
        {currentPage === 'profile' && <ProfilePage onNavigate={handleNavigate} />}
        {currentPage === 'tips' && <TipsPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        
        {/* Best Pages */}
        {currentPage === 'best-cpu' && <BestCPUPage onNavigate={handleNavigate} />}
        {currentPage === 'best-gpu' && <BestGPUPage onNavigate={handleNavigate} />}
        {currentPage === 'best-ram' && <BestRAMPage onNavigate={handleNavigate} />}
        {currentPage === 'best-hdd' && <BestHDDPage onNavigate={handleNavigate} />}
        {currentPage === 'best-ssd' && <BestSSDPage onNavigate={handleNavigate} />}
        {currentPage === 'best-usb' && <BestUSBPage onNavigate={handleNavigate} />}
        
        {/* Detail Pages */}
        {currentPage === 'detail-cpu' && <DetailCPUPage onNavigate={handleNavigate} data={selectedData} />}
        {currentPage === 'detail-gpu' && <DetailGPUPage onNavigate={handleNavigate} data={selectedData} />}
        {currentPage === 'detail-ram' && <DetailRAMPage onNavigate={handleNavigate} data={selectedData} />}
        {currentPage === 'detail-hdd' && <DetailHDDPage onNavigate={handleNavigate} data={selectedData} />}
        {currentPage === 'detail-ssd' && <DetailSSDPage onNavigate={handleNavigate} data={selectedData} />}
        {currentPage === 'detail-usb' && <DetailUSBPage onNavigate={handleNavigate} data={selectedData} />}
      </Suspense>
    </div>
  );
}

export default App;