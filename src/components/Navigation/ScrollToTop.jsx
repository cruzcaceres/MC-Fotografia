import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Muestra u oculta el botón dependiendo de cuánto scrollea el usuario
    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // La magia de subir suavemente hasta el pixel {top: 0}
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            className={`scroll-top-btn ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Volver arriba"
        >
            ↑
        </button>
    );
};

export default ScrollToTop;
