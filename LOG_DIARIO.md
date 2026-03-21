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

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Búsqueda y Evaluación de Hosting).
- **Fecha:** 4 de marzo de 2026
- **Probé / Trabajé en:**
  - Investigación y análisis de diferentes proveedores y opciones de alojamiento web (hosting) para el despliegue en producción del proyecto.
  - Evaluación de requerimientos técnicos de infraestructura basados en la arquitectura dual que poseemos (Frontend en React y Backend robusto en Django con PostgreSQL).
- **Resultado:** Se generó una claridad sobre las alternativas tecnológicas de hosting más acordes y viables para estabilizar la web de M.C Fotografía en línea de forma segura.
- **Aprendí:** Los criterios primordiales para seleccionar un alojamiento adecuado considerando la separación de capas (cliente/servidor) y costos asociados para mantener bases de datos relacionales.
- **Siguiente paso (1):** Continuar mejorando los módulos backend/frontend mientras se define completamente cuál plataforma recibirá el despliegue definitivo.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Infraestructura de Hosting:** Apertura de la investigación sobre qué plataformas soportan mejor despliegues para aplicaciones full-stack de este perfil.
2) **Comparativa de Proveedores:** Valoración de aspectos técnicos en distintas opciones del mercado (facilidad de uso, integración y soporte a largo plazo).

**Cierre:** Mapa referencial de servicios de alojamiento configurado. Preparación mental completada antes de realizar pagos o migrar archivos reales.

## GLOSARIO OPERATIVO
- **Hosting (Alojamiento Web):** Servicio que provee el espacio y los servidores conectados a internet necesarios para almacenar y servir públicamente el proyecto, permitiendo que el dominio sea visitable.
- **Despliegue en Producción:** Fase final de la ingeniería donde los archivos de código fuente local se construyen y suben al alojamiento para que operen globalmente.

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Blog: Sistema de Archivo Histórico y Etiquetas).
- **Fecha:** 7 de marzo de 2026
- **Probé / Trabajé en:**
  - Creación del modelo Tag (Etiquetas) en base de datos conectado al modelo BlogPost mediante una relación ManyToMany en Django.
  - Configuración del panel de administración, serializadores (serializers.py) y endpoints (iews.py y urls.py) para poder exponer las etiquetas en la API.
  - Creación del nuevo componente frontend Archive.jsx (y su respectiva hoja de estilos) destinado a funcionar como índice histórico del blog.
  - Extensión de lógica en consumos frontend (portfolioService.js y estados de React) para iterar solicitudes a la API temporalmente eludiendo la paginación hasta agrupar todos los registros.
  - Implementación de la agrupación automática de artículos según el año de publicación usando la función 
educe sobre los datos de la base de datos de Django para el listado final.
  - Integración o enrutamiento del nuevo componente de Archivo en la renderización principal de la app (App.jsx y Blog.jsx).
- **Resultado:** El blog ganó un sistema de taxonomía en backend para etiquetar posts, e incorporó el componente Archivo Histórico para visualizar de forma rápida publicaciones pasadas ordenadas por año.
- **Aprendí:** La técnica para recolectar datos paginados del cliente armando un bucle en el hook useEffect al inicio de carga, así como agrupar y ordenar propiedades de objetos cronológicamente en el frontend.
- **Siguiente paso (1):** Implementar y presentar visualmente los resultados y métricas del sistema de etiquetas ("Tags") dentro de la interfaz final de consumo público, o avanzar al despliegue.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Definición Estructura Etiquetas:** Se identificó la necesidad de categorizar los artículos del diario. Se crearon bases de datos de Tag integradas con BlogPost.
2) **Lógica de APIs Backend:** Habilitación de endpoints y adaptadores para la lectura de los "tags" mediante los llamados en React.
3) **Creación del Componente Archivo Histórico:** Diseño de una subpágina separada Archive para poder listar la historia completa de publicaciones sin sobrecargar la lista principal del blog.
4) **Gestión de Paginación en Consumo Frontend:** Solución de lógica de frontend para hacer fetching concurrente de las colecciones limitadas iterando la clave "next".

**Cierre:** Ecosistema de blog fortificado. Preparación estructural finalizada para categorizar y archivar masivamente.

## GLOSARIO OPERATIVO
- **ManyToMany (Relación):** Modalidad base de datos utilizada hoy, permitiendo que un Post englobe múltiples Tags y un Tag pertenezca a múltiples Posts, sin replicar registros.
- **Reduce (Agrupación Array JavaScript):** Patrón funcional usado para transformar el listado de todos los artículos en un diccionario categorizado puntualmente por años.
- **Pagination Loop (Bucle):** Estructura que diseñamos para "traer todo" iterando las peticiones a la API mientras el JSON contenga una respuesta en el atributo "next".


---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Preparativos de Despliegue Backend, Refinamiento UI y Sincronización CI/CD).
- **Fecha:** 8 al 17 de marzo de 2026
- **Probé / Trabajé en:**
  - **Frontend (8 de marzo):** Refinamientos estéticos generales y ajustes de CSS (index.css, App.css) en varios componentes de la aplicación (Contact, Footer, About). Ejecución exitosa del build de producción (generación de la carpeta dist).
  - **Backend (15 de marzo):** Preparación estructural del servidor Django para un entorno de despliegue tipo PaaS (Plataforma como Servicio). Creación de los archivos críticos Procfile y 
untime.txt, actualización de 
equirements.txt y ajustes de seguridad/despliegue en settings.py. Modificación del .gitignore para limpiezas de repositorios.
  - **Sincronización (17 de marzo):** Implementación de integración continua (CI) en GitHub Actions (sync_to_client.yml). Se configuró un workflow para empujar (*push*) el código validado desde el repositorio de la agencia hacia el repositorio final del cliente (mcampbelldev/MC-portfolio).
- **Resultado:** Interfaz pulida, backend empacado y estandarizado para entornos de producción, y hemos concretado "una pequeña gran victoria" al lograr automatizar la sincronización de repositorios sin generar bucles infinitos y manejando correctamente los tokens y permisos de GitHub Actions.
- **Aprendí:** Cómo orquestar componentes para despliegues (Procfile/runtime.txt para Python), y la configuración del action cpina/github-action-push-to-another-repository controlando directorios fuente y destino para evitar copiado del propio workflow y ciclos de sincronización.
- **Siguiente paso (1):** Ejecutar finalmente el despliegue del código sincronizado hacia el servicio de hosting para ver el proyecto en vivo y configurar el dominio.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **Pulido Visual y Build:** Ajustes menores de estilo en el frontend para asegurar consistencia; prueba de compilación de React/Vite.
2) **Configuraciones de Producción Backend:** Evolución del servidor local hacia un entorno estándar de despliegue, inyectando variables y archivos de entorno remoto (Procfile).
3) **Automatización de Repositorios (CI/CD):** Resolución del atasco técnico para mover de forma automática y transparente nuestro código al GitHub personal del cliente (Marcelo) usando *Actions*.

**Cierre:** Barreras técnicas de sincronización superadas. Repositorio del cliente recibiendo nuestro código estable. Rumbo claro al *deploy* final.

## GLOSARIO OPERATIVO
- **CI/CD (Integración y Despliegue Continuo):** Práctica de desarrollo que en nuestro caso usamos para que cada *push* en nuestra rama envíe el código actualizado a las manos del cliente mediante un *Workflow* automatizado.
- **Procfile:** Archivo de texto sin extensión que le instruye a la plataforma de hosting (ej. Heroku/Render) qué comando ejecutar para iniciar los procesos web del backend.
- **Workflow (GitHub Actions):** Archivo YAML (sync_to_client.yml) que dicta una serie de pasos automáticos a ejecutar en los servidores de GitHub ante un evento (como un push).

---

## LOG OPERATIVO
- **Proyecto / Tema:** Portafolio de Fotografía (Despliegue a Producción Completo: Railway, Vercel, Neon y Cloudflare R2).
- **Fecha:** 18 al 20 de marzo de 2026
- **Probé / Trabajé en:**
  - **Fase 2 (Estabilización de GitHub Actions):** Inyección de llaves de seguridad y permisos directos para lograr el "Espejo" en el repositorio del cliente.
  - **Fase 3 (Backend en Railway):** Configuración del "Root Directory" de monorepo para forzar el motor de Python (bypaseando a Vite). Resolución de conflictos de versiones actualizando `runtime.txt` a Python 3.12. Desactivación de verificaciones estrictas en WhiteNoise (`CompressedStaticFilesStorage`) para evitar colapsos al no encontrar mapas de origen de Bootstrap al hacer el despliegue. Configuración exhaustiva de seguridad HTTP/HTTPS tras proxy (`SECURE_PROXY_SSL_HEADER`) y paso dinámico de CORS (`CSRF_TRUSTED_ORIGINS`).
  - **Base de Datos y Storage:** Ejecución de migraciones y creación del Superusuario en Neon.tech directamente inyectando los scripts de `manage.py` de Django aisladamente. Resolución de error "NoSuchBucket" ajustando la URL final del Endpoint y abriendo permisos de solo lectura a la web a través del dominio público `r2.dev` de Cloudflare.
  - **Fase 4 (Frontend en Vercel):** Refactorización del código base (`api.js`) para reemplazar direcciones `localhost:8000` estrictas por `import.meta.env.VITE_API_URL`. Despliegue y vinculación en Vercel logrando petición HTTP 200 en `/api/fotos/`.
- **Resultado:** ¡Sitio publicado y ecosistema en la nube integrado al 100%! La arquitectura Headless opera como un reloj suizo: Django administra los datos y envía JSON seguros a React, mientras Cloudflare despacha velozmente las imágenes esquivando todas las prevenciones CSRF de los navegadores.
- **Aprendí:** La cantidad masiva de pequeñas restricciones y mecanismos de defensa por defecto que tanto Django 6, Cloudflare, como Servicios Proxy tipo Railway imponen al intentar acoplarlos. Todo paso conlleva configurar meticulosa y rigurosamente las barreras de origen, protocolos seguros (vía cabeceras inversas) y el manejo silencioso de excepciones en los motores de despliegue automáticos.
- **Siguiente paso (1):** Curaduría y carga de contenido visual real en la base de datos (por parte de Marcelo) probados directamente en el entorno de producción. Pruebas visuales completas por parte del usuario y entrega formal del proyecto.

## LÍNEA DE LA CONVERSACIÓN (temas en orden)
1) **El Espejo de Repositorios:** Estabilización de los permisos GITHUB_TOKEN.
2) **Engaños al Robot Constructor:** Bypass al constructor de Railway para usar Python y no node (configuración en Root Directory) más arreglos al almacenamiento de WhiteNoise para esquivar errores con `bootstrap.bundle.map`.
3) **Lidiando con el Guardián (CSRF y SSL):** Diagnósticos y solución de errores Error 500 y 403 modificando las defensas Proxy de Django.
4) **Cloudflare a Puertas Abiertas:** Solución a `NoSuchBucket` e implementación de dominio asignado `r2.dev` para evitar la restricción por ORB en navegadores ante la caída o bloqueo CORS de imágenes.
5) **El Fantasma de Localhost:** Corrección manual de código para permitir inyección dinámica de variables de entorno de frontend usando Vercel.

**Cierre:** El hito más complejo superado. El portafolio está totalmente público, funcional, respaldado y optimizado.

## GLOSARIO OPERATIVO
- **Arquitectura Headless (Sin Cabeza):** Diseño donde la base de datos y la gestión (Backend / Railway) están totalmente desconectadas del diseño estético (Frontend / Vercel), comunicándose únicamente mediante JSON de datos por APIs.
- **CORS (Cross-Origin Resource Sharing):** Medida de seguridad vital en navegadores. Bloquea que un sitio (Vercel) intente consumir descaradamente recursos de otro sin permiso (Railway / Cloudflare R2).
- **Proxy Inverso:** Servidor intermedio (como Railway) que recibe peticiones del usuario en HTTPS seguro y las redirige hacia el servidor web nativo de la aplicación. Obliga al uso de cabeceras de refracción seguras (como `HTTP_X_FORWARDED_PROTO` en Django).
- **WhiteNoise (Storage):** Librería que le permite al mismo programa en Python comprimir, hashear y despachar archivos HTML/CSS. Requiere configuraciones permisivas en esquemas inestables con herramientas que ignoran o extravían archivos auxiliares como sourcemaps.
- **ERR_BLOCKED_BY_ORB:** Código de error en la consola del navegador que indica que, por seguridad, en un intento de cargar una imagen (o medio), el servidor retornó un documento en texto/XML (como de "Acceso Denegado"), por lo cual el navegador omitió mostrar algo.
