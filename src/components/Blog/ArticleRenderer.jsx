import React from 'react';
import { MEDIA_BASE_URL } from '../../config/api';
import './ArticleRenderer.css';

/**
 * Renders an individual EditorJS block.
 */
const BlockRenderer = ({ block }) => {
    // Normalizamos el tipo a minúsculas porque el backend a veces los manda con la primera mayúscula ("Quote", "Header", etc.)
    const type = block.type ? block.type.toLowerCase() : '';

    switch (type) {
        case 'paragraph':
            return (
                <p
                    className="article-paragraph"
                    dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
            );
        case 'header':
            const Tag = `h${block.data.level || 2}`;
            return (
                <Tag
                    className={`article-header article-header-h${block.data.level || 2}`}
                    dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
            );
        case 'image':
            // EditorJS a menudo guarda URLs relativas (ej. /media/uploads/...), las complementamos con el host en Frontend
            const imageUrl = block.data.file.url.startsWith('http')
                ? block.data.file.url
                : `${MEDIA_BASE_URL}${block.data.file.url}`;

            return (
                <figure className={`article-image-figure ${block.data.stretched ? 'stretched' : ''}`}>
                    <img
                        src={imageUrl}
                        alt={block.data.caption || 'Imagen del artículo'}
                        className="article-image"
                        loading="lazy"
                    />
                    {block.data.caption && (
                        <figcaption
                            className="article-image-caption text-accent"
                            dangerouslySetInnerHTML={{ __html: block.data.caption }}
                        />
                    )}
                </figure>
            );
        case 'list':
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
                <ListTag className="article-list">
                    {block.data.items.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ListTag>
            );
        case 'quote':
            return (
                <blockquote className="article-quote">
                    <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                    {block.data.caption && (
                        <cite dangerouslySetInnerHTML={{ __html: block.data.caption }} />
                    )}
                </blockquote>
            );
        case 'warning':
            return (
                <div className="article-warning">
                    {block.data.title && (
                        <h4 className="article-warning-title text-accent">¡ATENCIÓN: {block.data.title}!</h4>
                    )}
                    <p dangerouslySetInnerHTML={{ __html: block.data.message }} />
                </div>
            );
        case 'table':
            return (
                <div className="article-table-wrapper">
                    <table className="article-table">
                        <tbody>
                            {block.data.content.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => {
                                        // Si la tabla fue configurada con Headings
                                        if (block.data.withHeadings && rowIndex === 0) {
                                            return <th key={cellIndex} dangerouslySetInnerHTML={{ __html: cell }} />;
                                        }
                                        return <td key={cellIndex} dangerouslySetInnerHTML={{ __html: cell }} />;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case 'delimiter':
            return <hr className="article-delimiter" />;
        default:
            console.warn(`Block type "${block.type}" is not supported yet.`);
            return null;
    }
};

/**
 * Component that takes EditorJS JSON content and renders it as React components.
 */
const ArticleRenderer = ({ content }) => {
    if (!content || !content.blocks || content.blocks.length === 0) {
        return null;
    }

    return (
        <div className="article-renderer">
            {content.blocks.map((block) => (
                <BlockRenderer key={block.id || Math.random().toString()} block={block} />
            ))}
        </div>
    );
};

export default ArticleRenderer;
