from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categorias', views.CategoryViewSet)
router.register(r'fotos', views.PhotoViewSet)
router.register(r'proyectos', views.ProjectViewSet)
router.register(r'blog', views.BlogPostViewSet)

urlpatterns = [
    path('editorjs_image_upload/', views.CustomImageUploadView.as_view(), name='custom_editorjs_image_upload'),
    path('', include(router.urls)),
]
