from django.contrib import admin
from .models import Category, Photo, Project, BlogPost

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

class PhotoInline(admin.TabularInline):
    """
    Permite que Marcelo agregue, edite o elimine fotos de un proyecto
    específico directamente desde la página del proyecto, visualizando una pequeña tabla.
    """
    model = Photo
    extra = 1 # Campos vacíos por defecto al crear uno nuevo
    fields = ('title', 'category', 'image', 'order', 'is_featured')
    # No mostramos toda la inmensa cantidad de campos aquí para no abrumar la vista del proyecto

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'location', 'is_featured', 'order')
    list_editable = ('is_featured', 'order')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'location', 'year')
    inlines = [PhotoInline]

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'category', 'is_featured', 'order', 'created_at')
    list_filter = ('project', 'category', 'is_featured')
    search_fields = ('title', 'description', 'alt_text')
    list_editable = ('is_featured', 'order')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_date', 'is_published')
    list_filter = ('is_published', 'published_date')
    search_fields = ('title', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}

    class Media:
        css = {
            'all': ('css/editorjs_admin_v2.css',)
        }
