from django.db import models
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image, ImageOps
import os
from pillow_heif import register_heif_opener
from django_editorjs_fields import EditorJsJSONField

# Esto permite que Pillow pueda abrir y leer los archivos pesados de iPhone (.HEIC)
register_heif_opener()

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Nombre")
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"

    def __str__(self):
        return self.name

def get_default_category():
    # Django ejecutará esta función para buscar o crear la Categoría por defecto.
    # Usamos get_or_create para que nunca falle, devolviendo la tupla (objeto, creado) de la cual nos interesa el objeto [0].
    category, _ = Category.objects.get_or_create(
        name="Portfolio",
        defaults={'slug': 'portfolio', 'description': 'Categoría general asignada automáticamente.'}
    )
    return category.id

class Photo(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título")
    image = models.ImageField(upload_to="portfolio/originals/", verbose_name="Imagen")
    thumbnail = models.ImageField(upload_to="portfolio/thumbnails/", blank=True, null=True, verbose_name="Miniatura Optimizada (Auto)")
    alt_text = models.CharField(max_length=255, blank=True, verbose_name="Texto Alternativo (SEO)")
    category = models.ForeignKey(Category, related_name="photos", on_delete=models.SET_DEFAULT, default=get_default_category, null=True, blank=True, verbose_name="Categoría")
    project = models.ForeignKey('Project', related_name="photos", on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Proyecto Asignado", help_text="Si se deja vacío, aparecerá suelta en el HOME.")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción de la foto")
    order = models.PositiveIntegerField(default=0, verbose_name="Orden de aparición")
    is_featured = models.BooleanField(default=False, verbose_name="Destacada en Home")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Fotografía"
        verbose_name_plural = "Fotografías"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} - {self.category.name}"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Guardamos el estado original para saber si Marcelo subió una NUEVA foto y no procesar en vano
        self.__original_image = self.image

    def save(self, *args, **kwargs):
        # Primero detectamos si la foto ha cambiado o es nueva
        image_changed = False
        if self.image and self.image != getattr(self, '__original_image', None):
            image_changed = True
            
        super().save(*args, **kwargs)

        if image_changed:
            self._crear_versiones_optimizadas()
            # Actualizamos nuestra memoria para no entrar en un bucle
            self.__original_image = self.image

    def _crear_versiones_optimizadas(self):
        try:
            # Abrir archivo original descargado recién en disco
            img = Image.open(self.image.path)
            
            # Respetar la orientación original de Apple/Cámara y limpiar EXIF peligroso (GPS)
            img = ImageOps.exif_transpose(img)
            
            # Asegurarnos de que el modo soporte WebP
            if img.mode in ("RGBA", "P"): 
                img = img.convert("RGB")

            filename = os.path.splitext(os.path.basename(self.image.name))[0]
            
            # --- 1. PROCESAR ORIGINAL: Límite 1920px Full HD, forzar a WEBP
            # thumbnail() respeta las proporciones. No recorta, solo restringe el lado más largo a 1920.
            img_big = img.copy()
            img_big.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
            
            big_io = BytesIO()
            img_big.save(big_io, format='WEBP', quality=85)
            new_filename = f"{filename}.webp"
            
            # --- 2. PROCESAR MINIATURA: Límite 800px para la grilla Masonry estricta
            img_thumb = img.copy()
            img_thumb.thumbnail((800, 800), Image.Resampling.LANCZOS)
            
            thumb_io = BytesIO()
            img_thumb.save(thumb_io, format='WEBP', quality=80)
            thumb_filename = f"thumb_{new_filename}"
            
            # Guardamos ambas versiones sin ejecutar el comando general .save() para no hacer loop
            self.image.save(new_filename, ContentFile(big_io.getvalue()), save=False)
            self.thumbnail.save(thumb_filename, ContentFile(thumb_io.getvalue()), save=False)
            
            # Ahora sí guardamos solo esos campos en la BD
            super().save(update_fields=['image', 'thumbnail'])
            
        except Exception as e:
            print(f"[{self.title}] Error procesando la imagen: {e}")

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título del Proyecto")
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    year = models.CharField(max_length=4, verbose_name="Año", help_text="Ej: 2026")
    location = models.CharField(max_length=150, verbose_name="Locación", help_text="Ej: TOKIO / OSAKA")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción Principal")
    cover_image = models.ImageField(upload_to="projects/covers/", blank=True, null=True, verbose_name="Foto de Portada")
    # Este mismo embudo podríamos agregárselo a cover_image en el futuro si Marcelo sube archivos muy grandes para las tapas.
    is_featured = models.BooleanField(default=False, verbose_name="Destacado")
    order = models.PositiveIntegerField(default=0, verbose_name="Orden de aparición")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.year})"

class BlogPost(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título del Artículo")
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    published_date = models.DateField(auto_now_add=True, verbose_name="Fecha de Publicación")
    excerpt = models.TextField(blank=True, null=True, verbose_name="Resumen")
    cover_image = models.ImageField(upload_to="blog/covers/", blank=True, null=True, verbose_name="Imagen de Portada")
    # Este campo guardará los bloques de EditorJS como un objeto JSON nativamente soportado
    content = EditorJsJSONField(
        plugins=[
            "@editorjs/image",
            "@editorjs/header",
            "@editorjs/list",
            "@editorjs/quote",
            "@editorjs/embed",
            "@editorjs/delimiter",
            "@editorjs/warning",
            "@editorjs/table",
        ],
        verbose_name="Contenido (Editor de Bloques)",
        blank=True, 
        null=True
    )
    is_published = models.BooleanField(default=False, verbose_name="Publicado")
    
    class Meta:
        verbose_name = "Artículo de Blog"
        verbose_name_plural = "Artículos de Blog"
        ordering = ['-published_date']

    def __str__(self):
        return self.title
