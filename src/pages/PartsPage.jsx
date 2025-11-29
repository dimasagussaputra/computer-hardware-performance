// src/pages/PartsPage.jsx
import { useState, useEffect } from 'react';
import { Cpu, Gpu, HardDrive, HardDrive as SsdIcon, MemoryStick as RamIcon, Usb } from 'lucide-react';

function CategoryBox({ cat, onClick }) {
    const Icon = cat.icon;

    return (
        <div
            className="card"
            onClick={onClick}
            style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
                cursor: 'pointer',
                background: `linear-gradient(135deg, #ffffffff 100%)`, 
                border: `3px solid #0f172a`,
                borderRadius: '1.8rem',
                transition: 'all 0.4s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px)';
                e.currentTarget.style.boxShadow = `0 25px 55px rgba(255, 255, 255, 1)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(26, 0, 173, 1)';
            }}
        >
            <Icon size={80} strokeWidth={1.5} style={{ color: '#071863ff', marginBottom: '1.4rem' }} />

            <h3 style={{ fontSize: '1.7rem', fontWeight: '900', color: '#071863ff', marginBottom: '0.6rem' }}>
                {cat.name}
            </h3>

            <p style={{ fontSize: '0.9rem', opacity: 0.75, color: '#071863ff', fontWeight: 500 }}>
                {cat.desc}
            </p>
        </div>
    );
}

export default function PartsPage({ onNavigate }) {
    const categories = [
        { name: 'CPU', icon: Cpu, desc: 'Central Processing Unit' },
        { name: 'GPU', icon: Gpu, desc: 'Graphics Processing Unit' },
        { name: 'RAM', icon: RamIcon, desc: 'Random Access Memory' },
        { name: 'SSD', icon: SsdIcon, desc: 'Solid State Drive' },
        { name: 'HDD', icon: HardDrive, desc: 'Hard Disk Drive' },
        { name: 'USB', icon: Usb, desc: 'Universal Serial Bus' },
    ];

    const handleClick = (name) => {
        const routeMap = {
            CPU: 'best-cpu',
            GPU: 'best-gpu',
            RAM: 'best-ram',
            SSD: 'best-ssd',
            HDD: 'best-hdd',
            USB: 'best-usb',
        };
        onNavigate(routeMap[name]);
    };

    const getGridStyle = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 600) {
            return { gridTemplateColumns: 'repeat(1, 1fr)', gap: '1.5rem' };
        } else if (screenWidth < 992) {
            return { gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' };
        } else {
            return { gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' };
        }
    };
    
    const [gridStyle, setGridStyle] = useState(getGridStyle());
    
    useEffect(() => {
        const handleResize = () => setGridStyle(getGridStyle());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div 
            style={{ 
                minHeight: '100vh', 
                background: '#0f172a', 
                position: 'relative', 
                overflow: 'hidden',
                paddingBottom: '80px',
            }}
        >

            {/* Background gradient */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none',
                background: `radial-gradient(circle at 20% 30%, #0f172a 0%),
                            radial-gradient(circle at 80% 70%, #0f172a 0%)`
            }} />

            {/* Title */}
            <div style={{ padding: '3rem 1rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <h1 style={{ 
                    fontSize: '3.2rem', 
                    fontWeight: 900, 
                    color: 'white',
                    lineHeight: 1.2
                }}>
                    Choose PC Components
                </h1>
                <p style={{ 
                    fontSize: '1.2rem', 
                    opacity: 0.85, 
                    color: 'white',
                    marginTop: '0.5rem'
                }}>
                    Start Building Your Dream PC Here
                </p>
            </div>

            {/* Grid Container (Disatukan dan Responsif) */}
            <div style={{ 
                maxWidth: '1400px', 
                margin: '0 auto', 
                padding: '0 1rem 3rem',
                position: 'relative', 
                zIndex: 10 
            }}>
                <div style={{
                    display: 'grid',
                    ...gridStyle,
                }}>
                    {categories.map(cat => (
                        <CategoryBox key={cat.name} cat={cat} onClick={() => handleClick(cat.name)} />
                    ))}
                </div>
            </div>

        </div>
    );
}