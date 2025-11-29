// src/components/Navbar.jsx
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <>
      <DesktopNavbar currentPage={currentPage} onNavigate={onNavigate} />
      <MobileNavbar currentPage={currentPage} onNavigate={onNavigate} />
    </>
  );
}