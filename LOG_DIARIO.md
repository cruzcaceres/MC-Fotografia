# Log Diario de Desarrollo

Este documento lleva el registro diario del trabajo realizado en el proyecto, documentando los avances, decisiones y próximos pasos organizados cronológicamente conforme al formato acordado.

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Auditoría Responsiva).
- **Fecha:** 19 y 20 de febrero de 2026
- **Probé / Trabajé en:**
  - Auditoría de estilos CSS para asegurar la responsividad del layout en dispositivos móviles.
- **Resultado:** Interfaz base revisada y mejor adaptada a distintos tamaños de pantalla.
- **Aprendí:** La relevancia de usar media queries para flexibilizar los bloques de las galerías en el portafolio.
- **Siguiente paso (1):** Ajustar la vista específica del sección principal "Hero" y empezar a planear despliegues.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Auditoría Responsiva:** Revisión general del CSS para asegurar que los componentes de la web se visualizan correctamente en móviles.
2) **Ajustes de Layout:** Modificaciones para adaptar el contenido principal en diferentes resoluciones.

**Cierre:** Página web en camino a ser completamente responsiva.

## GLOSARIO OPERATIVO
- **Responsividad (Responsive):** La capacidad del diseño e interfaz de adaptarse de forma fluida a pantallas de computadoras, tablets y móviles.

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Despliegue y Ajustes de sección de inicio "Hero").
- **Fecha:** 21 de febrero de 2026
- **Probé / Trabajé en:**
  - Opciones de despliegue gratuito de la página web considerando recursos previos (Bootstrap Studio, Cloudflare, dominios vinculados).
  - Ajuste y reducción del tamaño del logo y título principal en la sección Hero del inicio para pantallas de escritorio.
  - Configuración de márgenes y padding para visibilizar correctamente los botones de acción sin hacer *scroll*.
- **Resultado:** Discusión clara sobre viabilidad de un entorno de hosting gratis, e interfaz de inicio rediseñada sin recortes visuales.
- **Aprendí:** Cómo organizar el *Hero Section* reduciendo elementos prominentes sin perder impacto, optimizando el primer pantallazo en desktop.
- **Siguiente paso (1):** Continuar refinando componentes interactivos particulares como el visualizador de imágenes (Lightbox).

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Deploy Gratuito:** Alternativas de despliegue en línea sin costo utilizando infraestructura existente del usuario (Cloudflare y dominios de Bootstrap Studio).
2) **Ajustes del Hero Section:** Correcciones de maquetación en el inicio para asegurar que el contenido vital (botones y layout base) no requieran desplazamiento vertical en escritorio.

**Cierre:** Decisiones de ecosistema de despliegue tomadas y *Hero section* estabilizado en monitores grandes.

## GLOSARIO OPERATIVO
- **Hero Section:** La gran sección principal visible al cargar la web. Fundamental para el impacto visual inicial y captación (CTAs).
- **Cloudflare:** Proveedor de CDN y DNS que se analizó para el despliegue del dominio existente.

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Mejora funcional en Lightbox).
- **Fecha:** 24 de febrero de 2026
- **Probé / Trabajé en:**
  - Arreglo de visibilidad y acceso del botón de cierre (X) en el modal "Lightbox" de las imágenes.
  - Solución de obstrucción visual del componente (la X quedaba escondida tras de la navegación global).
  - Integración de animación por transformación (rotación al hacer *hover*) y redimensionamiento de este botón.
- **Resultado:** Botón de la galería funcional, visible por delante del *Navbar*, con un tamaño estético equilibrado e interacciones dinámicas.
- **Aprendí:** El valor de priorizar el `z-index` y posicionamiento *fixed/absolute* cuando hay capas superpuestas como una cabecera flotante en conjunto con un modal.
- **Siguiente paso (1):** Empezar la arquitectura y conceptualización de crear un backend para el administrador.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Fix de Lightbox:** Solución a incidencia de experiencia de usuario al no encontrar cómo cerrar las imágenes maximizadas.
2) **Estilos y Transiciones:** Implementación de diseño sutil e interactivo (medium/small + transform hover) en un componente base de funcionalidad.

**Cierre:** El manejador de fotos se renderiza y suprime de pantalla de manera óptima sin colisiones de interfaces. 

## GLOSARIO OPERATIVO
- **Lightbox:** Ventana emergente opaca que aísla visualmente una fotografía aumentada, deteniendo o desenfocando el fondo temporalmente.

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Setup Backend Django local y Estilos del Navbar en vista secundaria).
- **Fecha:** 25 al 26 de febrero de 2026
- **Probé / Trabajé en:**
  - Proceso de levantamiento base e instalación del entorno backend vía Framework Django.
  - Conexión del marco a base de datos externa usando PostgreSQL a nivel local.
  - Definición de los primeros modelos lógicos en ORM (Galería, Categorías, Photo) junto con configuración de puntos de acceso API básicos.
  - Limpieza de bordes blancos que causaban disonancia estética de color alrededor de la barra de navegación superior al cargar en la URL "About".
- **Resultado:** Instancia local de API operando y consultable. Página "About" consolidada con el color oscuro que mantiene la inmersión requerida.
- **Aprendí:** Procedimientos fundacionales para encender un API en Django en entorno Microsoft Windows y enlazar variables al administrador local.
- **Siguiente paso (1):** Incorporar requerimientos de administración directa (proyectos) que faciliten la carga al mantenedor del sistema y solucionar reglas de base de datos.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Configuración DB y Backend:** Documentos metodológicos guiados para que el usuario local inicie PostgreSQL y lance un proceso Django (servidor puerto 8000).
2) **Modelamiento Básico:** Creación virtual en backend de lo que sería el catálogo de imágenes.
3) **Detalles de UI - Navbar:** Pequeño retoque de margen superior en página "About" que fracturaba los colores oscuros de fondo.

**Cierre:** Sistema cliente / servidor conectado localmente con panel y base de datos corriendo. Estética superior del menú global sin defectos de línea.

## GLOSARIO OPERATIVO
- **Django (Backend):** Estructura base utilizada para desarrollar toda la lógica no visual y administrativa del administrador.
- **PostgreSQL:** Sistema central gestor de la base de datos para asegurar el guardado persistente para la web.

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Backend de Proyectos, Gestión de Blog y Protocolos de Mantenimiento).
- **Fecha:** 1 de marzo de 2026
- **Probé / Trabajé en:**
  - Diseño de la estrategia de la base de datos para responder a las dudas de Cris sobre la optimización y límites de almacenamiento.
  - Implementación del modelo `Project` y su relación con el modelo existente `Photo` en el backend (Django).
  - Mejora del panel de administración de Django para que Marcelo pueda crear proyectos y asignar categorías a las fotos directamente desde la misma pantalla.
  - Corrección de la restricción `not-null` de base de datos para las categorías de las fotos.
  - Creación de *Endpoints* de API (`ProjectViewSet`) para servir los datos anidados de Proyectos al frontend.
  - Establecimiento de protocolos y buenas prácticas de mantenimiento para el cliente (Marcelo).
  - Ajustes de estilo en la barra de navegación de la página "About" para lograr un fondo negro puro sin bordes blancos.
  - Corrección funcional de la subida de imágenes dentro de las publicaciones del blog a través de **Editor.js**, sincronizando el frontend con el backend.
- **Resultado:** El backend ahora soporta agrupaciones lógicas de fotos (Proyectos), la API entrega estos datos, y el editor del blog es capaz de recibir y almacenar imágenes. Además, las reglas de mantenimiento quedaron documentadas y la UI ajustada.
- **Aprendí:** La importancia de estructurar correctamente las relaciones de modelos (Projects vs. Photos) para que la interfaz de administración sea intuitiva para el usuario final, y lo vital de establecer protocolos claros antes de entregar el código.
- **Siguiente paso (1):** Conectar el frontend para consumir la API de Proyectos e implementar el layout de desplazamiento vertical definido por el usuario final, además de validar en pantalla las imágenes renderizadas por el blog.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Estrategia de Almacenamiento:** Discusión sobre cómo gestionar las fotos temporal y permanentemente en la base de datos sin limitar a Marcelo (respondiendo a Cris).
2) **Backend Project Management:** Creación de los modelos y configuración visual del Django Admin (inserción de vistas *inline* para fotos).
3) **Protocolos de Mantenimiento:** Pausa estratégica para definir cómo se harán las futuras actualizaciones del código y la resolución de bugs por parte de Marcelo.
4) **Estilos del Navbar:** Corrección estética rápida en la página "About" para mantener la consistencia oscura.
5) **Blog Image Upload:** Identificación y resolución de que el backend no estaba correctamente configurado para procesar e integrar las imágenes soltadas en Editor.js.

**Cierre:** Backend estructurado para recibir Proyectos y Entradas de Blog ricas en contenido visual. Queda pendiente la etapa de renderización de estos datos en el frontend.

## GLOSARIO OPERATIVO
- **Modelo Project:** Entidad creada en Django para la base de datos que permite agrupar múltiples fotografías bajo un mismo concepto o trabajo.
- **Editor.js:** Bloque de edición de texto enriquecido (rich-text) integrado en el frontend, el cual fue ajustado para soportar adjuntos de imágenes al servidor.
- **Django Admin (Inline):** Capacidad del panel de administración de Django que configuramos para agregar/editar "Fotos" directamente desde la página de creación de un "Proyecto".
- **Endpoint (ProjectViewSet):** La ruta/URL de entrada creada para que el frontend emita la petición (request) y reciba el JSON con las fotos ordenadas por proyecto.
- **Restricción not-null:** Regla de base de datos que solucionamos, la cual estaba bloqueando el guardado de fotos si estas no tenían una categoría explícitamente definida.

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Personalización y Branding del Panel de Administración backend).
- **Fecha:** 3 de marzo de 2026
- **Probé / Trabajé en:**
  - Configuración e integración de la librería de estilos `django-jazzmin` para modernizar el panel de administración de Django nativo.
  - Creación de hojas de estilo personalizadas (`mc_admin.css`) para integrar el "Naranja Corporativo" de la marca (`#ee7c2b`) en todo el ecosistema.
  - Sobrescritura (overriding) de la plantilla principal del administrador (`base.html`) para forzar la inyección de los estilos visuales propios y depurar el layout usando Bootstrap/AdminLTE subyacente.
- **Resultado:** El panel de administración fue transformado exitosamente; dejando de lado el aspecto genérico para convertirse en una herramienta atractiva, moderna y completamente moldeada a la identidad visual de "M.C. Fotografía".
- **Aprendí:** La técnica para sobrescribir HTML de apps externas en Django (como Jazzmin) a través de la carpeta nativa de templates, y el método para sobreponer variables CSS limpias dentro de administradores basados en Bootstrap.
- **Siguiente paso (1):** Dejar atrás las configuraciones bases del backend y avanzar de regreso hacia el public frontend (interfaces de cliente final) para consumir las APIs creadas.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Mejora Interfaz Base Panel de Administración:** Revisión de la UX nativa de Django y decisión de acoplar un tema visual moderno instalado vía pip (`Jazzmin`).
2) **Branding y CSS Custom:** Modificaciones en los activos estáticos (`mc_admin.css`) para aplicar la paleta de color Naranja oficial de la marca a menús, hover y elementos de formulario.
3) **Ajuste Estructural (Overriding):** Desacople parcial del archivo base `base.html` desde jazzmin hacia la ruta principal local para lograr prioridad de carga sobre las hojas de estilo corporativas.

**Cierre:** El entorno de administración quedó gráficamente finalizado, funcional y brandeado. Entorno listo y muy estético para que el administrador central pueda operar con comodidad.

## GLOSARIO OPERATIVO
- **Jazzmin:** Extensión de terceros para Django que sustituye el tema estándar del panel de control por uno altamente parametrizable soportado en Bootstrap 4/5 y plantillas tipo panel (AdminLTE).
- **Template Overriding:** Práctica arquitectónica en Django donde se toma posesión de una plantilla original de una aplicación externa colocando un archivo del mismo nombre en nuestras capetas locales (ej: `templates/admin/base.html`), dándole prioridad automática a la nuestra.
- **Naranja Corporativo:** Color clave hexadecimal de M.C Fotografía (`#ee7c2b`) que actúa como hilo conductor visual.
