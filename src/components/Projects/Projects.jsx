import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Projects.css';
import Lightbox from '../Gallery/Lightbox';
import { getProjects } from '../../services/portfolioService';
import { MEDIA_BASE_URL } from '../../config/api';

const Projects = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lightboxState, setLightboxState] = useState({ isOpen: false, index: 0 });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const fetchedProjects = await getProjects();
                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Error cargando proyectos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Bug visual resuelto: Al entrar o salir de un Reportaje Específico, 
    // forzamos al navegador a subir la vista al instante para no heredar el scroll de la galería.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const activeProject = slug ? projects.find(p => p.slug === slug) : null;

    // --------- CONTROLADORES DEL LIGHTBOX INTERNO ---------
    const openProjectLightbox = (index) => setLightboxState({ isOpen: true, index });
    const closeLightbox = () => setLightboxState({ isOpen: false, index: 0 });
    const nextPhoto = () => setLightboxState(prev => ({ ...prev, index: (prev.index + 1) % activeProject.photos.length }));
    const prevPhoto = () => setLightboxState(prev => ({ ...prev, index: (prev.index === 0 ? activeProject.photos.length - 1 : prev.index - 1) }));

    if (isLoading) {
        return <div className="projects-index-container"><h2 className="projects-main-title">CARGANDO REVELADOS...</h2></div>;
    }

    if (slug && !activeProject) {
        return (
            <div className="project-detail-container">
                <button className="back-to-projects-btn" onClick={() => navigate('/projects')}>
                    ← Volver a Colecciones
                </button>
                <div style={{ textAlign: 'center', marginTop: '2rem', color: 'black' }}>Reportaje no encontrado.</div>
            </div>
        );
    }

    // --------- VISTA 1: ÍNDICE DE COLECCIONES ---------
    if (!slug) {
        return (
            <div className="projects-index-container">
                <h2 className="projects-main-title">COLECCIONES SELECCIONADAS</h2>

                <div className="projects-list">
                    {projects.map(project => (
                        <article
                            key={project.id}
                            className="project-card"
                            onClick={() => navigate(`/projects/${project.slug}`)}
                        >
                            <div className="project-card-image matte-photo">
                                {/* Overlay oscuro sutil para que el texto encima contraste mejor */}
                                <div className="project-image-overlay"></div>
                                <img
                                    src={project.cover_image?.startsWith('http') ? project.cover_image : `${MEDIA_BASE_URL}${project.cover_image}`}
                                    alt={project.title}
                                    loading="lazy"
                                />

                                {/* Meta-Datos Flotantes */}
                                <div className="project-card-meta">
                                    <span className="project-year">{project.year}</span>
                                    <h3 className="project-card-title">{project.title}</h3>
                                    <span className="project-location">{project.location}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        );
    }

    // --------- VISTA 2: DETALLE DEL PROYECTO (EL REPORTAJE) ---------
    return (
        <div className="project-detail-container">
            <button className="back-to-projects-btn" onClick={() => navigate('/projects')}>
                ← Volver a Colecciones
            </button>

            {/* Cabecera del Reportaje */}
            <header className="project-detail-header">
                <div className="detail-meta text-accent">
                    <span>{activeProject.year}</span>
                    <span className="separator">/</span>
                    <span>{activeProject.location}</span>
                </div>
                <h1 className="detail-title">{activeProject.title}</h1>
                <p className="detail-description">{activeProject.description}</p>
            </header>

            {/* Galería Lineal Limpia para apreciación del ensayo */}
            <div className="project-linear-gallery">
                {activeProject.photos && activeProject.photos.map((photo, idx) => (
                    <div
                        key={photo.id}
                        // Usamos aspect aleatorio temporal hasta que Django calcule el aspeto o lo impongamos en portrait temporalmente
                        className={`project-linear-item matte-photo aspect-landscape`}
                        onClick={() => openProjectLightbox(idx)}
                    >
                        <img
                            src={photo.image?.startsWith('http') ? photo.image : `${MEDIA_BASE_URL}${photo.image}`}
                            alt={photo.alt_text || `Obra ${idx + 1} de ${activeProject.title}`}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Cierre Narrativo (Volver al menú al terminar de leer el proyecto) */}
            <div className="project-detail-footer">
                <button className="back-to-projects-btn footer-btn" onClick={() => navigate('/projects')}>
                    ← Volver a Colecciones
                </button>
            </div>

            {/* Reutilizamos el Lightbox que construimos para el Home */}
            {activeProject && lightboxState.isOpen && (
                <Lightbox
                    isOpen={lightboxState.isOpen}
                    // Simulamos el objeto url que Lightbox espera leyendo del campo image uñado al Host
                    currentPhoto={{
                        ...activeProject.photos[lightboxState.index],
                        url: activeProject.photos[lightboxState.index].image?.startsWith('http')
                            ? activeProject.photos[lightboxState.index].image
                            : `${MEDIA_BASE_URL}${activeProject.photos[lightboxState.index].image}`
                    }}
                    onClose={closeLightbox}
                    onNext={nextPhoto}
                    onPrev={prevPhoto}
                />
            )}
        </div>
    );
};

export default Projects;
