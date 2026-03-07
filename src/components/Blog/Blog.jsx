import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Blog.css';
import { getBlogPosts } from '../../services/portfolioService';
import ArticleRenderer from './ArticleRenderer';

const Blog = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Estado para las entradas de blog
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getBlogPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error cargando blog posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const activePost = slug ? posts.find(p => p.slug === slug) : null;

    // Si estamos en la url de un apunte concreto, pero todavía se está cargando el array de posts:
    if (slug && isLoading) {
        return (
            <div className="blog-index-container">
                <div className="section-subtitle" style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando apunte...</div>
            </div>
        );
    }

    // Si pasamos un slug pero el post no existe:
    if (slug && !activePost && !isLoading) {
        return (
            <div className="blog-post-container">
                <button
                    className="back-to-index-btn"
                    onClick={() => navigate('/blog')}
                >
                    ← Volver al diario
                </button>
                <div className="section-subtitle" style={{ textAlign: 'center', marginTop: '2rem' }}>Apunte no encontrado.</div>
            </div>
        );
    }

    // Vista de Índice de Blog (cuando NO hay slug)
    if (!slug) {
        return (
            <div className="blog-index-container">
                <header className="blog-header">
                    <h2 className="section-title">Diario Visual</h2>
                    <p className="section-subtitle">Anotaciones sobre la luz y el concreto.</p>
                </header>

                {isLoading ? (
                    <div className="section-subtitle" style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando bitácora...</div>
                ) : posts.length === 0 ? (
                    <div className="section-subtitle" style={{ textAlign: 'center', marginTop: '2rem' }}>Aún no hay apuntes en el diario.</div>
                ) : (
                    <div className="blog-list">
                        {posts.map(post => {
                            // Convertir fecha (asumiendo formato ISO YYYY-MM-DD)
                            const dateObj = new Date(post.published_date);
                            const options = { year: 'numeric', month: 'short', day: 'numeric' };
                            const formattedDate = dateObj.toLocaleDateString('es-ES', options).toUpperCase();

                            return (
                                <article
                                    key={post.id}
                                    className="blog-list-item"
                                    onClick={() => navigate(`/blog/${post.slug}`)}
                                >
                                    <div className="blo-item-meta">
                                        <span className="blog-meta">{formattedDate}</span>
                                        <span className="blog-separator">/</span>
                                        <span className="blog-tag text-accent">ENTRADA #{post.id}</span>
                                    </div>
                                    <div className="blog-item-content">
                                        <h3 className="blog-item-title">{post.title}</h3>
                                        <p className="blog-item-excerpt">{post.excerpt}</p>
                                        <button className="read-more-btn">Leer apunte →</button>
                                    </div>
                                    {post.cover_image && (
                                        <div className="blog-item-thumb matte-photo">
                                            <img src={post.cover_image} alt={post.title} loading="lazy" />
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    // A partir de aquí, dibujamos un Post Activo encontrado exitosamente

    // Formatear la fecha para el Post activo
    const dateObj = new Date(activePost.published_date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('es-ES', options).toUpperCase();

    // Vista de Lectura de Post (Editorial, calmada, centrada)
    return (
        <article className="blog-post-container">
            <button
                className="back-to-index-btn"
                onClick={() => navigate('/blog')}
            >
                ← Volver al diario
            </button>

            <header className="post-header">
                <div className="post-meta-top">
                    <span className="blog-meta">{formattedDate}</span>
                    <span className="blog-separator">/</span>
                    <span className="blog-tag text-accent">ENTRADA #{activePost.id}</span>
                </div>
                <h1 className="post-title">{activePost.title}</h1>
            </header>

            {/* Opcional: Cover Image (Si existe y se quiere mostrar a tamaño completo al inicio) */}
            {activePost.cover_image && (
                <figure className="post-full-image matte-photo">
                    <img src={activePost.cover_image} alt={activePost.title} />
                </figure>
            )}

            <div className="post-body">
                {activePost.excerpt && (
                    <p className="post-dropcap">
                        {activePost.excerpt}
                    </p>
                )}

                {/* Aquí inyectamos el renderer de nuestro modelo JSON generado por Editor.js */}
                {activePost.content ? (
                    <ArticleRenderer content={activePost.content} />
                ) : (
                    <p>Contenido no disponible.</p>
                )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '2rem' }}>
                <button
                    className="back-to-index-btn"
                    onClick={() => navigate('/blog')}
                >
                    ← Volver al diario
                </button>
            </div>
        </article>
    );
};

export default Blog;
