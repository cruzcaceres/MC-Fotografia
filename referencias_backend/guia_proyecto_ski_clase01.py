"""
1) Crear proyecto. En la carpeta de su elección, abrir el terminal y ejecutar:
""" 
    django-admin startproject rental_ski
    cd rental_ski
    
    python manage.py startapp web
"""
Luego, abrir el VS-Code:    
"""
    code .

2) Registrar la aplicación "web" en el settings.py

3) En el PSQL, crear la base de datos:

    CREATE DATABASE rental_ski;

4) Conectar el proyecto con ls BD.

    Sustituir el diccionario DATABASES del settings.py por el siguiente:
"""
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'rental_ski',
        'USER': 'postgres',
        'PASSWORD': '12345',
        'HOST': '127.0.0.1',
        'PORT': '5432'
    }
}

"""
5) Ejercutar migraciones:
"""
    python manage.py makemigrations
    python manage.py migrate
"""
6) Iniciar servidor y verificar conectividad.

7) Configurar rutas. En /rental_ski/rental_ski/urls.py
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('web.urls')),
]

"""
8) Crear /web/urls.py  y agregue lo siguiente:
"""
from django.urls import path
from .views import index   

urlpatterns = [
    path('', index, name='index'),
]

"""
9) Primera versión el views.py:
"""
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from datetime import timedelta, date


#@login_required
def index(request):
    context = {
    }
    return render(request, 'index.html', context)

"""
10) Dentro de /web crear la carpeta "templates"

11) Dentro de /web/templates crear base.html y agregue lo siguiente:
"""

<!doctype html>
<html lang="en">

<head>
  
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="xxx">
  <meta name="description" content="Proyecto de certficación Talento Digital">
  <meta name="keywords" content="....">

  <title>Nombre de la aplicación</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  {% load static %}
  <link rel="stylesheet" href="{% static 'css/styles.css' %}">

<body>

  <header>
    {% include 'header.html' %}
  </header>

  {% block message %}
  {% if messages %}
  {% for message in messages %}
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="alert alert-{{ message.tags }} alert-dismissible fade show" role="alert">
          <strong>{{ message }}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>

  {% endfor %}
  {% endif %}
  {% endblock %}

  <main>
    {% block content %}
    {% endblock %}
  </main>

  <footer>
    {% include 'footer.html' %}
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"
    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
  <script src="{% static 'js/script.js' %}"></script>
  {% block js %}
  {% endblock %}
</body>

</html>

"""
12) Dentro de /web/templates crear index.html y agregue lo siguiente: 
"""

{% extends 'base.html' %}

{% block content %}
    
    {% if user.is_authenticated %}
        <form action="{% url 'logout' %}" method="post">
            <label>Hola, {{ user.first_name }} </label>
            {% csrf_token %}
            <button type="submit">Salir</button>
        </form>
        
    {% else %}
        {% comment %}
            <a href="{% url 'login' %}">Login</a>
            <a href="{% url 'register' %}">Registro</a>
        {% endcomment %}
    {% endif %}
    
{% endblock %}

"""
13) Crear archivo header.html dentro de web/templates

    (puede insertar un navbar  desde el sitio de bootstrap y adaptar a los requerimientos o el código siguiente)
"""
<nav class="navbar navbar-expand-lg bg-dark text-light">
    <div class="container-fluid">
      <a class="navbar-brand text-light" href="#">Rental</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active text-light" aria-current="page" href="#">Equipos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Arriendos</a>
          </li>
          
        </ul>
        <form class="d-flex" role="search">
          
          <button class="btn btn-outline-dark btn-warning " type="submit">SALIR</button>
        </form>
      </div>
    </div>
  </nav>

"""
14) Crear en web/templates el archivo footer.html, vacío.
"""


"""
15) Dentro de la carpeta web/ crear la carpeta static.
    Dentro de static, crear carpeta css
    Dentro de css, crear el archivo styles.css, cuyo contenido es el siguiente:
"""
.navbar {
    background-color: black !important;
}

.nav-link {
    color: white !important;
}



"""
16) Crear el modelo.  Editar el archivo models.py:  
"""
from django.db import models
from django.contrib.auth.models import User

class Categoria(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    
    def __str__(self):
        return f'Nombre: {self.nombre}'


class Equipo(models.Model):
    estados = (
        ('disponible', 'Disponible'),
        ('arrendado', 'Arrendado'),
        ('mantencion', 'Mantención')
    )

    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    imagen = models.URLField()
    precio = models.IntegerField()
    estado = models.CharField(max_length=45, default='disponible', choices=estados)
    categoria = models.ForeignKey(Categoria, related_name='equipos', on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.id} | {self.nombre} | {self.estado} | {self.categoria.nombre} | {self.precio}'
        


class Arriendo(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateField()
    observacion = models.TextField(null=True, blank=True)
    danado = models.BooleanField(default=False)
    user = models.ForeignKey(User, related_name='arriendos', on_delete=models.CASCADE)
    equipo = models.ForeignKey(Equipo, related_name='arriendos', on_delete=models.CASCADE)

    def __str__(self):
        id = self.id
        fecha = self.fecha
        observacion = self.observacion
        danado = self.danado
        usuario = self.user.username
        equipo = self.equipo.nombre
        categoria = self.equipo.categoria.nombre
        return f'{id} | Fecha: {fecha} | Obs: {observacion} | Está dañado?: {danado} | User: {usuario} | Eq: {equipo} | Cat: {categoria}'

class UserProfile(models.Model):
    tipos = (
        ('cliente', 'Cliente'),
        ('operario', 'Operario')
    )
    tipo = models.CharField(max_length=50, default='cliente', choices=tipos)
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
    
    def __str__(self):
        id = self.user.id
        nombre = self.user.first_name
        apellido = self.user.last_name
        usuario = self.user.username
        tipo = self.tipo
        return f'{id} | {nombre} {apellido} | {usuario} | {tipo}'




"""
17) Realizar migraciones
"""
    python manage.py makemigrations
    python manage.py migrate

"""
18) Crear superusuario.   Nombre: admin   Pass: admin
"""
python manage.py createsuperuser





    
