from rest_framework import serializers
from .models import Category, Photo, Project, BlogPost

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class PhotoSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    category_slug = serializers.ReadOnlyField(source='category.slug')

    class Meta:
        model = Photo
        fields = ['id', 'title', 'image', 'thumbnail', 'alt_text', 'category', 'category_name', 'category_slug', 'project', 'description', 'order', 'is_featured', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    # Esto atrapará a todas las fotos que estén amarradas a este proyecto específico (usando "related_name='photos'")
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'year', 'location', 'description', 'cover_image', 'is_featured', 'order', 'created_at', 'photos']

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'published_date', 'excerpt', 'cover_image', 'content', 'is_published']
