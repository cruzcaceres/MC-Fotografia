import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">

                {/* Lado Izquierdo: Descripción Corta */}
                <div className="footer-section brand-section">
                    <h3 className="footer-title">MARCELO CAMPBELL</h3>
                    <p className="footer-text">
                        Capturando la quietud entre momentos. Fotografía mínima y silenciosa enfocada en el diálogo crudo entre la forma y la luz.
                    </p>
                    <div className="footer-brand-links">
                        <Link to="/projects" className="text-accent">Ver Portafolios</Link>
                        <span className="separator">/</span>
                        <Link to="/blog">Leer el Diario</Link>
                    </div>
                </div>

                {/* Medio: Navegación Rápida */}
                <div className="footer-section nav-section">
                    <h4 className="footer-heading">Navegación</h4>
                    <ul className="footer-list">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/projects">Colecciones</Link></li>
                        <li><Link to="/blog">Diario Visual</Link></li>
                        <li><Link to="/about">Sobre Mí</Link></li>
                    </ul>
                </div>

                {/* Derecha: Contacto y Ubicación */}
                <div className="footer-section contact-section">
                    <h4 className="footer-heading">Contacto & Ubicación</h4>
                    <a href="mailto:hello@marcelocampbell.com" className="footer-email">
                        hello@marcelocampbell.com
                    </a>
                    <p className="footer-location mt-1">
                        Basado en la Ciudad.<br />
                        Viajando a Todas Partes.
                    </p>
                    <div className="footer-socials">
                        <a href="#" target="_blank" rel="noreferrer">IG</a>
                        <a href="#" target="_blank" rel="noreferrer">VSCO</a>
                        <a href="#" target="_blank" rel="noreferrer">IN</a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 Marcelo Campbell. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
