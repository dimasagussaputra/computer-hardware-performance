// src/components/DesktopNavbar.jsx
import { Home, Cpu, User, Lightbulb, Info } from 'lucide-react';

export default function DesktopNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'parts', label: 'Parts', icon: Cpu },
    { id: 'tips', label: 'Tips & Tricks', icon: Lightbulb },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <>
      <style>{`
        .desktop-navbar {
          display: none;
        }

        @media (min-width: 768px) {
          .desktop-navbar {
            display: block;
          }
        }

        .nav-button {
          white-space: nowrap;
          min-width: fit-content;
        }
      `}</style>

      <nav
        className="desktop-navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'black',
          color: 'white',
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div
          style={{
            maxWidth: '1700px',
            margin: '0 auto',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '72px'
          }}
        >
          {/* LEFT SIDE — LOGO */}
          <div 
            onClick={() => onNavigate('home')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              userSelect: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(236, 72, 153, 0.3))',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                flexShrink: 0
              }}
            >
              🖥️
            </div>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}>
              Computer Hardware Performance
            </span>
          </div>

          {/* RIGHT SIDE — NAV MENU */}
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            alignItems: 'center',
            flexShrink: 0
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="nav-button"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(236, 72, 153, 0.3))'
                      : 'transparent',
                    color: 'white',
                    border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: isActive ? '700' : '600',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    boxShadow: isActive ? '0 4px 12px rgba(124, 58, 237, 0.3)' : 'none',
                    userSelect: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}