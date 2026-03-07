import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">

                {/* Lado Fotográfico: Alto contraste y misterio */}
                <div className="about-image-wrapper">
                    <img
                        // Placeholder: Silueta humana de alto contraste / urbana
                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Marcelo Campbell - Silueta"
                        className="about-portrait"
                    />
                </div>

                {/* Lado Textual: Tipografía cuidada e Invertida */}
                <div className="about-text-wrapper">
                    <h2 className="about-title">
                        EL OJO<br />
                        EN LA<br />
                        SOMBRA
                    </h2>

                    <div className="about-statement">
                        <p>
                            Marcelo Campbell es un documentalista visual enfocado en la tensión entre la geometría rígida de las ciudades y la fugacidad del elemento humano.
                        </p>
                        <p>
                            Su obra explora el silencio y las sombras de las calles, capturando el pulso imperceptible de quienes transitan espacios diseñados para ser ignorados. Trabajando principalmente en blanco y negro con acentos tonales muy específicos, su método requiere una paciencia casi arquitectónica.
                        </p>
                    </div>

                    <div className="about-socials">
                        <a href="#" target="_blank" rel="noreferrer">Instagram</a>
                        <span className="separator">/</span>
                        <a href="#" target="_blank" rel="noreferrer">VSCO</a>
                        <span className="separator">/</span>
                        <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
