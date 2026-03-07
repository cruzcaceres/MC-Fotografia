import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle | submitting | success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulación de envío de formulario para que Cris lo conecte a Django después
        setTimeout(() => {
            setStatus('success');
            // Reset después de 4 segundos
            setTimeout(() => setStatus('idle'), 4000);
        }, 1500);
    };

    return (
        <div className="contact-container">
            <div className="contact-content">

                {/* Lado Izquierdo: Información Directa */}
                <div className="contact-info">
                    <h1 className="contact-title">HABLEMOS.</h1>
                    <p className="contact-manifesto">
                        Disponible para comisiones editoriales, impresiones de bellas artes de tiraje limitado y proyectos documentales de largo aliento.
                    </p>

                    <div className="contact-direct">
                        <span className="contact-label">EMAIL DIRECTO</span>
                        <a href="mailto:estudio@marcelocampbell.com" className="contact-email text-accent">
                            estudio@marcelocampbell.com
                        </a>
                    </div>

                    <div className="contact-socials">
                        <span className="contact-label">REDES</span>
                        <div className="social-links-wrapper">
                            <a href="#" target="_blank" rel="noreferrer">Instagram</a>
                            <span className="separator">/</span>
                            <a href="#" target="_blank" rel="noreferrer">VSCO</a>
                        </div>
                    </div>
                </div>

                {/* Lado Derecho: Formulario minimalista */}
                <div className="contact-form-wrapper">
                    {status === 'success' ? (
                        <div className="success-message">
                            <h3 className="success-title">Mensaje Recibido</h3>
                            <p>Tu perspectiva ha sido anotada. Me comunicaré contigo pronto.</p>
                        </div>
                    ) : (
                        <form className="minimal-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder=" "
                                    required
                                    disabled={status === 'submitting'}
                                />
                                <label htmlFor="name">Tú Nombre</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder=" "
                                    required
                                    disabled={status === 'submitting'}
                                />
                                <label htmlFor="email">Correo Electrónico</label>
                            </div>

                            <div className="form-group textarea-group">
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder=" "
                                    rows="4"
                                    required
                                    disabled={status === 'submitting'}
                                ></textarea>
                                <label htmlFor="message">Sobre tu proyecto...</label>
                            </div>

                            <button
                                type="submit"
                                className={`submit-btn ${status === 'submitting' ? 'is-loading' : ''}`}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Contact;
