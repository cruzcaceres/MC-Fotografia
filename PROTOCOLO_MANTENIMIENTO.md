# Manual de Mantenimiento y Protocolo de Resolución de Errores (Bugs)

Este documento está diseñado para ser la "hoja de ruta" de emergencia y mantenimiento para el portafolio de Marcelo. Si en el futuro (dentro de semanas, meses o años) ocurre un error o necesitas realizar un cambio, sigue estos protocolos. 

No tienes que memorizar el código, solo saber dónde buscar y cómo pedir ayuda.

---

## 1. Regla de Oro: Que no cunda el pánico
Las páginas web modernas son construcciones por bloques (React) interconectados a un cerebro (Django). Si algo se rompe, el error suele estar aislado en un "bloque" específico. Un bug en la Galería no va a borrar los textos del Blog.

## 2. Protocolo de Triaje: ¿De dónde viene el error?
Cuando Marcelo reporte un problema (ej. "La foto no carga" o "El botón no hace nada"), el primer paso es identificar de qué lado está el problema:

### A. Errores de Frontend (React / Interfaz)
*   **Síntomas:** El texto se ve chueco, un color cambió, la animación se traba, el diseño se rompe en celulares, un botón al hacer clic no hace la animación esperada.
*   **Culpable:** El código en la carpeta principal de React (`src/components/`, `src/pages/`, `index.css`).
*   **Cómo solucionarlo con IA:**
    1.  Abre el archivo específico que controla esa página (Ej: si es la galería, abre `MasonryGallery.jsx`).
    2.  Pídele a Antigravity (o a la IA que uses en el futuro): *"Tengo un problema visual en el componente MasonryGallery.jsx, en pantallas de móvil el margen es muy pequeño. ¿Puedes ajustarlo?"*

### B. Errores de Backend (Django / Servidor)
*   **Síntomas:** Las fotos no aparecen en absoluto (pantalla negra o recuadros rotos), Marcelo no puede entrar al panel de administración, un formulario de contacto no se envía y lanza un error de "Servidor Caído 500".
*   **Culpable:** El código en la carpeta `backend_mc/` (Modelos, Vistas, URLs, o la Base de Datos PostgreSQL).
*   **Cómo solucionarlo con IA:**
    1.  Revisa la consola (terminal) donde se ejecuta `python manage.py runserver`. Si hay un error, allí habrá un texto en rojo informando qué falló.
    2.  Copia ese error rojo completamente.
    3.  Pídele a la IA: *"Recibí este error en el backend de Django al intentar subir una foto: [pegar error]. Revisa mis modelos en portafolio/models.py, ¿cómo lo reparo?"*

---

## 3. Protocolo para Solucionar Bugs (Paso a Paso)

Si necesitas mi ayuda en el futuro (o la de cualquier otro agente técnico/desarrollador), esta es la mejor forma de reportar el problema para obtener una solución en segundos:

1.  **Describe el escenario:** "Estaba en la página X, intenté hacer Y, y pasó Z". (Ej: *Estaba en la vista de Proyectos, di clic en la foto de Tokio, y el Lightbox no se abrió.*)
2.  **Abre los archivos sospechosos:** Abre en tu editor de código el componente Frontend (Ej: `Lightbox.jsx`) y/o el archivo Backend relevante (`views.py`). Mientras los tengas abiertos, la IA los podrá leer automáticamente.
3.  **Captura de Pantalla:** Si es un problema visual, muéstrame una captura de pantalla. Es la forma más rápida de entender un desajuste de CSS.

---

## 4. Actualizaciones Comunes (Manual Rápido)

### "Marcelo quiere cambiar un color o una tipografía"
1.  Ve a `index.css` en la raíz de React.
2.  Busca la sección `:root`.
3.  Cambia las variables de color (`--bg-color`, `--accent-color`). Todo el sitio cambiará instantáneamente sin tener que tocar código de componentes.

### "Marcelo quiere cambiar la información del Footer o las Redes Sociales"
1.  Abre `src/components/Footer.jsx`.
2.  Desplázate hacia abajo y edita los textos directamente en el HTML (etiquetas `<p>` y `<a>`).

### "Marcelo no recuerda cómo usar el Panel de Control (Django Admin)"
1.  Inicia el servidor (`python manage.py runserver`).
2.  Ve a `http://localhost:8000/admin` (o a la URL de producción cuando esté en vivo).
3.  Usa el superusuario que creamos. Desde allí, la interfaz es intuitiva y permite Añadir/Editar Fotos y Proyectos con simples botones.

---

## 5. El Legado para "Cris" (El Equipo Backend)
Si Cris necesita intervenir el proyecto en el futuro, no tendrá que adivinar nada.
*   **Para el Frontend:** Existe `DOCUMENTACION_DECISIONES.md` donde explicamos por qué elegimos Vite, Vanilla CSS y React puro sin librerías invasivas.
*   **Para el Backend:** La estructura de Django Rest Framework es el estándar de la industria bajo el patrón MTV (Models, Templates/Views). Los Serializadores (`serializers.py`) son limpios y el mapeo de URLs es explícito en `urls.py`. Cualquier desarrollador de Python se sentirá en casa con esta estructura en menos de 10 minutos.

---
**Nota Final:** El software está vivo, es normal que surjan bugs (especialmente cuando se suba a producción o cambien los navegadores). Tienes una arquitectura robusta, dividida y profesional. No se va a desmoronar fácilmente. Y cuando algo se atasque, siempre puedes abrir esta conversación o una nueva y decir: *"Antigravity, reparemos este bug"*. Misión cumplida.
