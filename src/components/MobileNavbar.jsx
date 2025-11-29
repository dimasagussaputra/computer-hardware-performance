// src/components/MobileNavbar.jsx
import { Home, Cpu, User, Lightbulb, Info } from 'lucide-react';

export default function MobileNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'parts', label: 'Parts', icon: Cpu },
    { id: 'tips', label: 'Tips', icon: Lightbulb },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'about', label: 'About', icon: Info }
  ];

  const gradientActive = 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(236, 72, 153, 0.3))'; 

  return (
    <>
      <style>{`
        /* Pastikan mobile view terlihat di bawah 768px */
        .mobile-top-bar,
        .mobile-bottom-nav {
          display: block;
        }

        /* Sembunyikan di desktop/tablet */
        @media (min-width: 768px) {
          .mobile-top-bar,
          .mobile-bottom-nav {
            display: none;
          }
        }
      `}</style>

      {/* Top Bar Mobile - Logo Only (Diubah sedikit agar konsisten) */}
      <div 
        className="mobile-top-bar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'black',
          color: 'white',
          padding: '1rem 1.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              background: gradientActive,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            🖥️
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            Computer Hardware
          </span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav 
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%', 
          zIndex: 50,
          background: 'rgba(17, 24, 39, 0.95)', 
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.4)',
          
          willChange: 'transform', 
          transform: 'translateZ(0)',
          paddingBottom: 'env(safe-area-inset-bottom)', 
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: '640px',
            margin: '0 auto',
            padding: '0.5rem 0.25rem' 
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexGrow: 1, 
                  padding: '0.5rem 0.25rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  color: isActive ? 'white' : '#9ca3af',
                  position: 'relative',
                  minWidth: '20%', 
                  transform: isActive ? 'scale(1.05)' : 'scale(1)', 
                }}
              >
                {/* Active Indicator (Lebih tebal, di bagian atas tombol) */}
                {isActive && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '0', 
                      left: '10%',
                      right: '10%',
                      height: '4px',
                      background: gradientActive, 
                      borderRadius: '0 0 4px 4px',
                      transition: 'width 0.3s ease, background 0.3s ease',
                      width: '80%', 
                      margin: '0 auto'
                    }}
                  />
                )}
                
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{ 
                    marginBottom: '0.25rem',
                    marginTop: isActive ? '4px' : '0' 
                  }}
                />
                <span 
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: isActive ? '700' : '500',
                    marginTop: '0.1rem'
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}