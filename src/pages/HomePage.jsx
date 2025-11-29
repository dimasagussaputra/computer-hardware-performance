// src/pages/HomePage.jsx
import { useState } from 'react';
import { Cpu, Gpu, HardDrive, HardDrive as SsdIcon, MemoryStick as RamIcon, Usb } from 'lucide-react';

function CategoryBox({ icon: Icon, name, color }) {
    return (
        <div
            className="card"
            style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                cursor: 'default',
                background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
                border: `3px solid ${color}40`,
                borderRadius: '1.8rem',
                transition: 'all 0.4s ease',
                minHeight: '200px',
                color: 'white'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${color}50`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(26, 0, 173, 1)'; 
            }}
        >
            <Icon size={70} style={{ color, marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color }}>
                {name}
            </h3>
        </div>
    );
}

function HomePage({ onNavigate }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const categories = [
        { icon: Cpu,       name: 'CPU',   color: '#ffffff' }, 
        { icon: Gpu,       name: 'GPU',   color: '#ffffff' }, 
        { icon: RamIcon,   name: 'RAM',   color: '#ffffff' }, 
        { icon: SsdIcon,   name: 'SSD',   color: '#ffffff' }, 
        { icon: HardDrive, name: 'HDD',   color: '#ffffff' }, 
        { icon: Usb,       name: 'USB',   color: '#ffffff' }, 
    ];

    return (
        <div 
            style={{ 
                background: '#0f172a', 
                minHeight: '100vh', 
                paddingBottom: '80px' 
            }}
        >
            {/* HERO SECTION */}
            <div style={{
                background: 'linear-gradient(135deg, #534e4eff 0%, #312e2eff 100%)',
                color: 'white',
                padding: '10rem 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ 
                    position: 'relative', 
                    zIndex: 2, 
                    maxWidth: '1200px', 
                    margin: '0 auto' 
                }}>
                    <h1 style={{
                        fontSize: '4.5rem',
                        fontWeight: '900',
                        marginBottom: '1.5rem',
                        lineHeight: '1'
                    }}>
                        TOP Computer Parts
                    </h1>
                    <p style={{ fontSize: '1.8rem', marginBottom: '3rem', opacity: 0.95 }}>
                        The Best PC Parts Components
                    </p>
                    <button
                        onClick={() => onNavigate('parts')}
                        className="btn btn-primary"
                        style={{
                            background: 'white',
                            color: '#050505ff',
                            fontSize: '1.4rem',
                            padding: '1.3rem 3.5rem',
                            fontWeight: '700',
                            borderRadius: '0.75rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                        See All Parts →
                    </button>
                </div>
            </div>
            <div className="container" style={{ padding: '4rem 1rem 8rem 1rem' }}>
                <h2 style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '4rem'
                }}>
                    Select Component Category
                </h2>
                
                <div 
                    className="category-grid" 
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '2rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}
                >
                    {categories.map((cat) => (
                        <CategoryBox 
                            key={cat.name} 
                            icon={cat.icon} 
                            name={cat.name} 
                            color={cat.color} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;