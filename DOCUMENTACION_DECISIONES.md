# Marcelo Campbell - Registro de Decisiones Arquitectónicas (ADR)

Este documento registrará las decisiones técnicas tomadas por Antigravity a lo largo del desarrollo del portafolio fotográfico de Marcelo Campbell, con el fin de que Cris y tú puedan entender el razonamiento detrás del código tanto del Frontend como del Backend.

## 1. Frontend: Arquitectura Inicial
**Decisión:** Uso de React (vía Vite) para la interfaz de usuario.
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   **Experiencia de Usuario (UX):** Un portafolio fotográfico exige fluidez. React permite crear una *Single Page Application* (SPA), lo que significa que al navegar entre "Proyectos", "Sobre mí" y "Contacto", la página no se recarga blanca; cambia instantáneamente, manteniendo la inmersión y permitiendo transiciones suaves (como si hojeáramos un fotolibro).
*   **Velocidad (Vite):** Se eligió Vite en lugar de herramientas antiguas como Create React App o Webpack, porque Vite compila y muestra los cambios casi instantáneamente en desarrollo, y genera un paquete final ultra ligero y veloz para el visitante.
*   **Componentización:** El diseño de Stitch (masonry, lightbox, tarjetas de proyectos) se beneficia de crear "bloques de lego" (Componentes de React). En lugar de copiar y pegar código HTML 50 veces para 50 fotos, creamos un solo componente `<PhotoPrint />` que recibe datos y se autoconstruye.
*   **Mantenimiento a futuro:** Es un estándar de la industria, lo que significa que en el futuro cualquier desarrollador frontend podrá leer, entender y expandir este código fácilmente.

### Estado Actual:
*   Se inicializó un proyecto estándar de React + Vite en la carpeta raíz.
*   Se instalarón las dependencias básicas vía `npm install`.

## 2. Frontend: Sistema de Diseño y Estilos Globales
**Decisión:** Uso de Vanilla CSS (variables CSS) y tipografía "Manrope" estricta.
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   Se solicitó que la estética ("geometría de concreto + pulso humano") y las guías de diseño de Stitch no se modifiquen.
*   En lugar de complicar el código con frameworks como Tailwind o Bootstrap (que traerían estilos innecesarios que chocarían con las guías predefinidas), se implementó un `index.css` limpio.
*   Allí se configuraron en la raíz (`:root`) como **variables CSS puras** los colores (Fondo cálido `#f8f7f6`, Acento naranja `#ee7c2b` y el texto casi negro), y el sombreado exacto *Matted Photo* para la presentación de arte, asegurando que cualquier componente nuevo (o parte programada por Cris) pueda usar estas variables y verse perfectamente alineado al estilo de "Galería y Museo Editorial".

## 3. Frontend: Componente de Galería "Masonry" Estricto
**Decisión:** Crear un componente Masonry desde cero (`MasonryGallery.jsx`) combinando CSS Flexbox y lógica JS de separación de array.
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   **Problema Común:** Los plugins prehechos a menudo causan *Cumulative Layout Shift* (CLS) que hace que las fotografías "parpadeen" y salten de un lado a otro en lo que cargan, arruinando la sensación premium.
*   **Solución Programada:** Separamos la galería en **Columnas Vertientes independientes**. Cada elemento sabe exactamente su proporción (`aspect-ratio: 4/5`, etc.) ANTES de que la foto real baje del servidor de internet. Esto previene brincotéos groseros en la pantalla al 100%. Así mismo, se le añadió la sensación de "respirar": un revelado en cascada retardado para cada columna logrando ese *pulso humano* que se requería en el brief.

## 4. Frontend: Visualizador inmersivo (Lightbox)
**Decisión:** Creación de un Lightbox propio con "efecto cristal roto" (`Lightbox.jsx`).
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   Se necesitaba aislar las fotografías del fondo restándole ruido visual al usuario. 
*   Se diseñó una superposición con `backdrop-filter: blur(8px)` y un tono `rgba(248, 247, 246, 0.98)` que simula sostener una fina hoja de papel cebolla sobre el resto de la página, dándole total protagonismo al arte.
*   **Accesibilidad y UX:** Se implementó control nativo por teclado para que el visitante pueda navegar fluidamente sus obras usando las flechas (Derecha/Izquierda) y salir con (Escape) tal y como se diseñó en Stitch.

## 5. Backend: Arquitectura y Modelado de Datos (Django + PostgreSQL)
**Decisión:** Utilizar Python con Django Rest Framework (DRF) como cerebro del proyecto y PostgreSQL como base de datos, con soporte para subida de arte a la nube (AWS S3).
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   **Seguridad y Panel Nativo:** Django nos regala un panel de administración seguro y "Out-of-the-box" (listo para usarse) donde Marcelo entrará con un usuario y contraseña y no interactuará con código, sino con una interfaz gráfica amigable similar a WordPress o Squarespace para subir sus obras.
*   **Separación de Responsabilidades (API):** Django actuará como una "API" (una caja de respuestas). Cuando el Frontend de React le pregunte `Dame las últimas fotos del portafolio`, Django buscará en PostgreSQL y devolverá un paquete (JSON) con los enlaces de las imágenes guardadas en el disco de alta capacidad (AWS S3).
*   **Modelado de la Base de Datos:** Se recomienda a Cris desarrollar la siguiente estructura para empezar:
    *   `Project` (Modelo): Título de la galería, año, locación, descripción corta y una bandera booleana `is_featured` para reordenar la portada.
    *   `Photo` (Modelo): La fotografía en sí misma vinculada mediante clave foránea (Foreign Key) a un `Project`. Cada foto tendrá un campo de imagen, un texto alternativo (alt text para SEO) y un número de orden.
    *   `BlogPost` (Modelo): Título, slug (URL amigable), estado publicitario (Borrador/Publicado), contenido rico, fechas de creación/modificación, y etiqueta de categoría.

## 6. Frontend: Composición Invertida (Sobre Mí)
**Decisión:** Crear un entorno visual oscuro e inmersivo (`About.jsx`) diferente al resto del sitio.
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   **Contraste Temático:** Mientras el "Home" asemeja a una galería blanca e iluminada de día, el "Sobre Mí" es dramático e invertido (`#0b0b0c` de fondo), forzando al espectador a hacer una pausa y leer íntimamente la biografía del artista.
*   **Efectos visuales programados:**
    *   Transición fluida de color (FadeIntoDark) en CSS al entrar a la sección.
    *   Fotografía sombreada fuertemente, forzada a mostrarse casi en blanco y negro (mediante la propiedad CSS `filter: grayscale(100%)`) y con una relación de aspecto rígida que simula una impresión estricta.

## 7. Frontend: El Diario Visual (Blog)
**Decisión:** Componente dual (`Blog.jsx`) para mostrar índice y artículos con formato editorial.
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   **Diseño Editorial / Revista:** Para la vista individual del artículo se impuso en CSS un ancho estricto de lectura (aprox `680-720px`) para no cansar los ojos en pantallas grandes, un "dropcap" (la primera letra de la publicación destacada en grande) típico de artículos periodísticos y bloques de citas grandes tipo `blockquote`.
*   **Imágenes con sangrado completo (`full-bleed`):** En el artículo extendido, las imágenes rompen intencionalmente el ancho del texto usando márgenes negativos (`margin: 0 -10vw`) para sentirse inmersivas, siempre acompañadas por una diminuta etiqueta en mayúsculas sostenidas (`Caption`).

Este diseño asegura el nivel de "Editorial de Museo": estable, estructurado y sin riesgos de interrupción.

## 8. Frontend: Utilidad y Formularios (Contacto)
**Decisión:** Formulario in situ (sin scroll), usando el patrón UX de "Floating Labels" (Etiquetas flotantes).
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   **Limpieza visual extrema:** En lugar de recuadros marcados para que el usuario escriba, se implementó un diseño de líneas simples (`border-bottom`) donde el placeholder se desliza elegantemente hacia arriba cuando el visitante empieza a escribir.
*   **Interacción Feedback:** Se simuló un estado de carga (`submitting`) y un mensaje de éxito con desvanecimiento. Cris podrá reemplazar nuestro temporizador `setTimeout` en React por su llamada Axios al puerto de envío de correos de Django fácilmente.

## 9. Frontend: Reportajes y Colecciones Fotográficas (Proyectos)
**Decisión:** Crear una vista de "Portadas Panorámicas" que abre paso a una lectura lineal del ensayo fotográfico (`Projects.jsx`).
**Fecha:** 24 de febrero de 2026.
**Justificación:**
*   **Contraste con la Portada (Inicio):** Mientras que el Inicio es una explosión caótica tipo *Masonry Grid* mezclando fotos de distintas fechas, la sección de "Proyectos" requería un tono curatorial serio donde las fotos no compitan entre sí por atención.
*   **Diseño Interactivo (Index):** Se crearon bloques masivos de portadas de reportaje (ancho completo `aspect-ratio: 16/7`). Al poner el cursor, el proyecto se entinta apenas de gris y revela, subiendo grácilmente, el Título, el Año y la Locación (ej: TOKIO / OSAKA).
*   **Lectura Vertical (Detail):** Una vez que haces clic en un Reportaje, la vista cambia a una columna simple. Las fotos caen de arriba a abajo, con `6rem` de margen de "aire" (espacio en blanco) entre cada una para que el usuario las procese como en una pared lisa de galería de arte moderno. Y si pulsan cualquiera, se reutiliza el mismo componente aislante (`Lightbox`) que ya habíamos creado de manera universal. 

## 10. Frontend: Pie de Página y Navegación Secundaria (Footer)
**Decisión:** Incluir un Footer global utilitario basado en la propuesta final del diseño en Stitch (`Footer.jsx`).
**Fecha:** 25 de febrero de 2026.
**Justificación:**
*   **Balance del Ecosistema:** Al tener páginas tan inmersivas (como el About Invertido y las colecciones) las sesiones de usuario pueden terminar en un "callejón sin salida" abajo. El Footer actúa como una gran red de contención que invita a seguir navegando.
*   **Diseño Modular:** Consta de 3 bloques clave en pantalla ancha: 
    *   Izquierda: Declaración de identidad (Mini manifiesto) y enlaces rápidos al arte.
    *   Centro: Navegación utilitaria.
    *   Derecha: Información inmediata (correo directo, ubicación y redes).
*   Se asegura que el `Footer` esté incrustado directamente en `App.jsx` fuera del contenedor dinámico, asegurando su permanencia sutil al final de cualquier ruta transitada.

## 11. Frontend: Inmersión Parallax y Typografía Figurativa (Hero)
**Decisión:** Transformar el Hero del Inicio en una pantalla completa (`100vh`) paralaje, e insertar fotografía pura dentro de la propia tipografía de título.
**Fecha:** 25 de febrero de 2026.
**Justificación:**
*   **Paralaje Orgánico (Push-up):** Para lograr que las fotos de la galería sientan que "empujan" el nombre del artista, el contenedor del logo `hero-wrapper` se fijó como un elemento pegajoso (`position: sticky`), provocando que la galería inferior (`main-content`) se deslice suavemente sobre el nombre al desplazar la rueda del ratón (scroll), logrando un efecto físico superior a un simple desplazamiento estándar sin requerir librerías pesadas (cero JavaScript, puro CSS).
*   **La Letra "O" como Ventana:** Se transformó físicamente el código HTML de la letra 'O' del nombre MARCELO en un div redondo y perfecto (`.letter-window`). Se le inyectó una imagen de silueta misteriosa, a la vez que se oscurecía con `filter: grayscale(100%)` para igualar perfectamente la temperatura del texto negro, dotando a la tipografía de una vida visual inmensa.

## 12. Frontend: Repositorio de Recursos Estáticos (Pruebas)
**Decisión:** Creación de un directorio `public/fotos_originales/` para alojar momentáneamente los archivos de arte en alta calidad.
**Fecha:** 1 de marzo de 2026.
**Justificación:**
*   **Pruebas Reales:** Antes de implementar completamente la carga vía Backend y guardado en la nube (AWS), el equipo requería un espacio físico y organizado dentro del proyecto para probar con el material original de Marcelo y pre-visualizar la apariencia real de las galerías.
*   **Aislamiento del Bundler (Vite):** Al alojar estas fotos iniciales en la carpeta global `public/` en lugar de `src/assets/`, el servidor de Vite procesará estas imágenes de forma neutral (sirviéndolas como URL tal y como están, ej. `/fotos_originales/foto.jpg`) sin compilar ni alterar su firma visual. Esto simula limpiamente el mismo comportamiento que experimentará nuestro Frontend cuando le pida las imágenes al Backend de Cris en producción.

---

## 13. Implementación de Blog (Editor de Bloques)
**Decisión:** Para proteger el diseño estético premium de la web y a la vez darle flexibilidad a Marcelo, hemos implementado el Blog usando un **Editor de Bloques (Editor.js)** desde el lado de Django.
**Fecha:** 1 de marzo de 2026.
**Justificación:**
*   **Razón:** Los editores WYSIWYG clásicos inyectan "HTML sucio" mezclando CSS en la base de datos (etiquetas span, fuertes colores, etc), destruyendo el diseño estricto de React. Un editor de bloques devuelve un objeto estructural `JSON` que limpiamente es interceptado y mapeado por componentes de React a través de un `ArticleRenderer`.
*   **Backend (Django):** Se añadió la librería `django-editorjs-fields`. Se creó el modelo `BlogPost` en `portafolio/models.py` usando `EditorJsJSONField` para la interfaz nativa del administrador. 
*   **Frontend (React):** Se modificó `Blog.jsx` y se creó `ArticleRenderer.jsx` que intercepta los bloques (`paragraph`, `header`, `image`, `quote`, etc.) y les aplica nuestras propias clases CSS controladas y elásticas (`ArticleRenderer.css`).

## 14. Frontend: Enrutamiento Real (React Router DOM)
**Decisión:** Migración del sistema de navegación basado en estado (`useState`) a URLs reales con `react-router-dom`.
**Fecha:** 1 de marzo de 2026.
**Justificación:**
*   **Persistencia y Compartición:** Al basar la navegación en la barra de direcciones (Ej: `/blog/un-dia-para-recordar`), el usuario puede refrescar (F5), guardar en favoritos y enviar enlaces directos a galerías o artículos específicos sin ser devuelto a la página de inicio.
*   **Escalabilidad:** Se preparó el archivo `App.jsx` inyectando `<Routes>` estándar, y el `Blog.jsx` con utilidades de `useParams` y `useNavigate` para leer dinámicamente los "slugs" de cada post.

## 15. Arquitectura de Medios: Separación de Imágenes (Portafolio vs Blog)
**Decisión:** Tratamiento asimétrico de los subprocesos de almacenamiento: Las imágenes de "Bellas Artes" se separan estrictamente de las "Imágenes Editoriales/Blog".
**Fecha:** 1 de marzo de 2026.
**Justificación:**
*   **Separation of Concerns:** Un portafolio de arte requiere inmaculada limpieza. Las fotografías que se suben internamente dentro de los bloques del Blog (ej. capturas de pantalla, fotos de "detrás de cámara" con el móvil) se suben y mapean mediante el flujo interno de `Editor.js`.
*   Estas imágenes habitan en su propio ecosistema de carga (usualmente `/media/uploads/` manejado por el plugin) y **nunca se inyectan ni ensucian** los modelos de arte core de Django (`models.Photo`, `models.Project`), asegurando que las "colecciones de Arte" del usuario final nunca se mezclen con el contenido de bitácora diaria.

---

***Status al momento de actualización:** Frontend y Backend (Blog) completados y conectados. Todo preparado para enrutarse al servidor (Backend en Django) programado por el equipo de datos.*

*(Este documento servirá de base y referencia cruzada para ti y para Cris a lo largo del desarrollo conjunto de la plataforma).*
