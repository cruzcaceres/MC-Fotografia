import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Lightbox.css';

const Lightbox = ({ isOpen, currentPhoto, onClose, onNext, onPrev }) => {
    // Manejo de eventos de teclado (Escape para cerrar, Flechas para navegar)
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
    }, [isOpen, onClose, onNext, onPrev]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Evitar que la página de fondo siga haciendo scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen || !currentPhoto) return null;

    return createPortal(
        <div className="lightbox-overlay" onClick={onClose}>
            {/* Botón de cierre superior derecho */}
            <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">
                ✕
            </button>

            {/* Contenedor central de la imagen interactiva */}
            <div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()} // Evita que un clic en la foto cierre el lightbox
            >
                <button className="nav-button prev" onClick={onPrev} aria-label="Anterior">
                    ←
                </button>

                <div className="lightbox-image-container matte-photo">
                    <img
                        src={currentPhoto.url.replace('&w=800', '&w=1600')} // Solicitamos mayor resolución (o la original) a Unsplash
                        alt="Obra fotográfica en detalle"
                        className="lightbox-img"
                    />
                </div>

                <button className="nav-button next" onClick={onNext} aria-label="Siguiente">
                    →
                </button>
            </div>

            {/* Contador o caption sumamente minimalista inferior */}
            <div className="lightbox-caption">
                <span style={{ color: 'var(--color-accent)' }}>—</span> Visualización Aislada
            </div>
        </div>,
        document.body
    );
};

export default Lightbox;
