import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import MasonryGallery from './components/Gallery/MasonryGallery'
import About from './components/About/About'
import Blog from './components/Blog/Blog'
import Contact from './components/Contact/Contact'
import Projects from './components/Projects/Projects'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/Navigation/ScrollToTop'

function App() {
  const location = useLocation();
  const currentPage = location.pathname.substring(1) || 'home'; // Extract 'about' from '/about', default to 'home'

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Asegura que al cambiar de página en el Router, la vista empiece desde arriba (scroll to top)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lógica del "Smart Nav" (Ocultar al bajar, mostrar al subir)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si scrolleamos hacia abajo y pasamos los 50px, oculta la navbar. De lo contrario, la muestra.
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="app-container">
      {/* Site Architecture / Top Nav */}
      <nav className={`nav-header ${currentPage === 'about' ? 'nav-dark' : ''} ${!isNavVisible ? 'nav-hidden' : ''}`}>
        <Link
          to="/"
          className="nav-logo"
          style={{ fontWeight: 800, cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
          onClick={closeMobileMenu}
        >
          M.C.
        </Link>

        {/* Hamburger Menu Button (sólo visible en mobile vía CSS) */}
        <button
          className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''} ${currentPage === 'about' ? 'dark-mode' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <Link to="/" className={currentPage === 'home' ? "text-accent" : ""} onClick={closeMobileMenu}>Home</Link>
          <Link to="/projects" className={currentPage === 'projects' ? "text-accent" : ""} onClick={closeMobileMenu}>Projects</Link>
          <Link to="/blog" className={currentPage === 'blog' ? "text-accent" : ""} onClick={closeMobileMenu}>Blog</Link>
          <Link to="/about" className={currentPage === 'about' ? "text-accent" : ""} onClick={closeMobileMenu}>About</Link>
          <Link to="/contact" className={currentPage === 'contact' ? "text-accent" : ""} onClick={closeMobileMenu}>Contact</Link>
        </div>
      </nav>

      {/* Hero Tipográfico solo visible en Home (Efecto Sticky Parallax) */}
      {currentPage === 'home' && (
        <div className="hero-scroll-container">
          <div className="hero-wrapper">
            <h1 className="hero-title">
              <span className="hero-first-name">MARCEL<span className="letter-window"></span></span>
              <span className="hero-last-name">CAMPBELL</span>
            </h1>
          </div>
        </div>
      )}

      {/* Navegador Interno - Renderización vía Rutas Reales */}
      <main className={currentPage === 'home' ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<MasonryGallery />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback route */}
          <Route path="*" element={<MasonryGallery />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
