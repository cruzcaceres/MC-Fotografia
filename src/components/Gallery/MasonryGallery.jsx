import React, { useState, useEffect } from 'react';
import Lightbox from './Lightbox';
import './MasonryGallery.css';

import { getFeaturedPhotos } from '../../services/portfolioService';
import { MEDIA_BASE_URL } from '../../config/api';

const MasonryGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [columns, setColumns] = useState(3);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [visibleImages, setVisibleImages] = useState(new Set()); // Rastrear qué fotos ya pasaron por el viewport
    const [isLoading, setIsLoading] = useState(true);

    // --------- ESTADO DEL LIGHTBOX ---------
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // --------- FETCH BACKEND DATA ---------
    useEffect(() => {
        const fetchInitialPhotos = async () => {
            setIsLoading(true);
            const fetchedPhotos = await getFeaturedPhotos();
            // Assign random aspect just for visually appealing masonry if not provided by backend.
            // Ideally backend would have width/height or aspect field.
            const photosWithAspect = fetchedPhotos.map((p, idx) => ({
                ...p,
                image: p.image?.startsWith('http') ? p.image : `${MEDIA_BASE_URL}${p.image}`,
                thumbnail: p.thumbnail?.startsWith('http') ? p.thumbnail : (p.thumbnail ? `${MEDIA_BASE_URL}${p.thumbnail}` : null),
                aspect: p.aspect || (idx % 3 === 0 ? 'landscape' : idx % 2 === 0 ? 'square' : 'portrait')
            }));
            setPhotos(photosWithAspect);
            setIsLoading(false);
        };
        fetchInitialPhotos();
    }, []);

    // Inteligencia de Columnas: Re-calcula cuántas columnas mostrar según la pantalla
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 640) setColumns(1);
            else if (window.innerWidth < 1024) setColumns(2);
            else setColumns(3);
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    // Intersection Observer: Determinar cuando una foto ya se asoma en pantalla
    useEffect(() => {
        if (!photos || photos.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = parseInt(entry.target.getAttribute('data-id'));
                    setVisibleImages(prev => new Set(prev).add(id));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const elements = document.querySelectorAll('.photo-item');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [columns, photos]); // Re-attach cuando llegan las fotos del backend o cambian las columnas

    // Dividimos el arreglo lineal de fotos en múltiples arreglos (uno para cada columna)
    const columnWrappers = Array.from({ length: columns }, () => []);
    photos.forEach((photo, i) => {
        columnWrappers[i % columns].push(photo);
    });

    // Efecto de 'Respiración / Fade-in' cuando una imagen termina de descargar del servidor
    const handleImageLoad = (id) => {
        setLoadedImages(prev => new Set(prev).add(id));
    };

    // --------- CONTROLADORES DEL LIGHTBOX ---------
    const openLightbox = (photoId) => {
        // Encontrar índice real para navegación
        const realIndex = photos.findIndex(p => p.id === photoId);
        setCurrentPhotoIndex(realIndex);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => setIsLightboxOpen(false);

    const goToNextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    };

    const goToPrevPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    };

    if (isLoading) {
        return <div style={{ color: "white", padding: "100px", textAlign: "center" }}>Cargando portafolio...</div>;
    }

    if (!photos || photos.length === 0) {
        return <div style={{ color: "white", padding: "100px", textAlign: "center" }}>Aún no hay fotos en el portafolio. Administrador: Ingrese a /admin para subirlas.</div>;
    }

    return (
        <div className="masonry-grid">
            {/* --- EL LIGHTBOX OCULTO HASTA QUE SE LLAME --- */}
            <Lightbox
                isOpen={isLightboxOpen}
                currentPhoto={{
                    ...photos[currentPhotoIndex],
                    url: photos[currentPhotoIndex]?.image // Adapt prop for old component
                }}
                onClose={closeLightbox}
                onNext={goToNextPhoto}
                onPrev={goToPrevPhoto}
            />

            {columnWrappers.map((column, colIndex) => (
                <div key={colIndex} className="masonry-column" style={{ transitionDelay: `${colIndex * 0.15}s` }}>
                    {column.map((photo) => (
                        <div
                            key={photo.id}
                            data-id={photo.id}
                            // La clase "matte-photo" viene de nuestro sistema de diseño global en index.css
                            // Se muestra "cargada" SÓLO cuando JS la descargó del host Y la persona bajó el scroll
                            className={`photo-item matte-photo ${loadedImages.has(photo.id) && visibleImages.has(photo.id) ? 'is-loaded' : ''}`}
                            onClick={() => openLightbox(photo.id)}
                        >
                            <div className={`img-wrapper aspect-${photo.aspect}`}>
                                <img
                                    src={photo.thumbnail || photo.image}
                                    alt={photo.alt_text || "Marcelo Campbell Photography"}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(photo.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MasonryGallery;
