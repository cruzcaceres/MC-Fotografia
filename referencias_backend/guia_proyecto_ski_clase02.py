"""
1) Registrar modelos en el admin.py
"""
from django.contrib import admin
from .models import Categoria, Equipo, Arriendo, UserProfile

admin.site.register(Categoria)
admin.site.register(Equipo)
admin.site.register(Arriendo)
admin.site.register(UserProfile)

"""
2) En la carpeta web/templates/  crear subcarpeta registration

    /web/templates/registration

3) Dentro de la carpeta registration, agregar archivo login.html

"""
{% extends 'base.html' %}

{% block content %}
<h3 class="text-center my-4">Ingrese a su cuenta:</h3>
<div class="row">
	<div class="col-4 offset-4">
		{% if form.errors %}
		<div class="row">
			<div class="col">
				<div class="alert alert-danger alert-dismissible fade show" role="alert">
					<strong>Usuario y contraseña no coinciden</strong>
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>
			</div>
		</div>
		{% endif %}

		<form action="{% url 'login' %}" method="post">
			{% csrf_token %}
			<div class="mb-3">
				<label for="username" class="form-label">Email<span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="username" name="username" required>
                {% if form.username.errors %}
                    <div class="error-message">{{ form.username.errors.0 }}</div>
                {% endif %}
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Contraseña<span class="text-danger">*</span></label>
                <input type="password" class="form-control" id="password" name="password" required>
                {% if form.password.errors %}
                    <div class="error-message">{{ form.password.errors.0 }}</div>
                {% endif %}
			</div>
			<button type="submit" class="btn btn-primary">Ingresar</button>
		</form>
		<p class="mt-3">Si no se ha registrado, puede hacerlo <a href="{% url 'register' %}">AQUÍ</a></p>
	</div>
</div>
{% endblock %}

"""
4) Dentro de la carpeta registration, agregar archivo register.html
"""
{% extends 'base.html' %}

{% block content %}
<div class="container">
  <h3 class="text-center my-4">Crea un Usuario</h3>
  <form action="{% url 'register' %}" method="POST" id="form">
    {% csrf_token %}
    <div class="row gy-4 gy-xl-5 p-4 p-xl-5">
        <div class="col-12 col-md-6">
            <label for="first_name" class="custom-label">Nombre<span class="text-danger">*</span></label>
            <input name="first_name" type="text" class="form-control custom-input" required>
        </div>
        <div class="col-12 col-md-6">
            <label for="last_name" class="custom-label">Apellido<span class="text-danger">*</span></label>
            <input name="last_name" type="text" class="form-control custom-input" required>
        </div>
        <div class="col-12">
            <label for="email" class="custom-label">Email<span class="text-danger">*</span></label>
            <input name="email" type="email" class="form-control custom-input" required>
        </div>
        <div class="col-12 col-md-6">
            <label for="password1" class="custom-label">Contraseña<span class="text-danger">*</span></label>
            <input name="password1" type="password" class="form-control custom-input" required>
        </div>
        <div class="col-12 col-md-6">
            <label for="password2" class="custom-label">Confirma Contraseña<span class="text-danger">*</span></label>
            <input name="password2" type="password" class="form-control custom-input" required>
        </div>
        <div class="col-12">
            <div class="d-grid">
                <button class="btn btn-secondary btn-lg" type="submit">Registrar</button>
            </div>
        </div>
    </div>
</form>

</div>

{% endblock %}

"""
5) Agregar vistas relativas al sistema de autenticación y activar el @login_required de la vista index
"""

class RegisterView(View):
    def get(self, request):
        return render(request, 'registration/register.html')

    def post(self, request):
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        if password1 != password2:
            messages.error(request, 'Passwords do not match')
            return redirect(reverse('register'))  
        user = User.objects.create_user(username=email, email=email, password=password1, first_name=first_name, last_name=last_name)
        #user.is_active = False
        UserProfile.objects.create(user=user, tipo='cliente')
        user.save()
        user = authenticate(username=email, password=password1)
        if user is not None:
            login(request, user)
        messages.success(request, 'Usuario creado exitosamente')
        return redirect('index')
    
class CustomLoginView(SuccessMessageMixin, LoginView):
    success_message = "Sesion Iniciada Exitosamente"
    template_name = 'registration/login.html'  
    redirect_authenticated_user = True
    
class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('login')
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        messages.add_message(request, messages.WARNING, "Sesion Cerrada Exitosamente")
        return response
        
@login_required
def index(request):
    context = { }
    return render(request, 'index.html', context)
        
"""
 OJO -->  IMPORTACIONES NECESARIAS
 """
 
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from datetime import timedelta, date
from django.urls import reverse, reverse_lazy
from django.contrib.auth import authenticate, login
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.auth.views import LoginView, LogoutView
from .models import *



"""
6) Ajustes en urls.py de /web
"""
from django.urls import path
from .views import index
from web.views import CustomLoginView, CustomLogoutView, RegisterView

urlpatterns = [
    path('', index, name='index'),
    path('accounts/login/', CustomLoginView.as_view(), name='login'),
    path('accounts/logout/', CustomLogoutView.as_view(), name='logout'),
    path('accounts/register/', RegisterView.as_view(), name='register'),
]

"""
7) Ajustes en settings.py
Al final agregar:
"""
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/accounts/login'


"""
8) Cargar datos en el /admin

Carga datos en los modelos, primero Categorías y luego algunos equipos.
Nada en Arriendo (not yet!)

"""

"""
9) Nueva versión del header.html

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
            <a class="nav-link text-light" href="#">Arriendo</a>
          </li>
          
        </ul>

        <ul class="navbar-nav">
        {% if user.is_authenticated %}
        <li class="nav-item">
          <form action="{% url 'logout' %}" method="post">
            <label class="fs-5 text-warning me-3">Hola, {{ user.first_name }} </label>
            {% csrf_token %}
            <button class="btn btn-outline-danger" type="submit">Salir</button>
          </form>
        </li>
        {% else %}
        <li class="nav-item">
          <a href="{% url 'login' %}" class="btn btn-outline-primary btn-sm">Login</a>
        </li>
        <li class="nav-item">
          <a href="{% url 'register' %}" class="btn btn-outline-success btn-sm ms-2">Registro</a>
        </li>
        {% endif %}
      </ul>
      </div>
    </div>
  </nav>
 
 """
 10) Nueva versión del index.html
 """
 
{% extends 'base.html' %}

{% block content %}
 
    <div class="container mt-5">
        <form method="GET" class="mb-4">
            {{ form }}
        </form>

        <table class="table table-bordered table-striped table-success">
          <thead>
            <tr>
              <th scope="col">
                <div class="text-center">Nombre</div>
                
              </th>
              <th scope="col">
                <div class="text-center">Precio</div>
                
              </th>
              <th scope="col">
                <div class="text-center">Acciones</div>
                
              </th>
            </tr>
          </thead>
          <tbody>
            {% for equipo in equipos %}
            <tr>
                <td>{{ equipo.nombre }}</td>
                <td>${{ equipo.precio }}</td>
                <td>
                    <a href="" class="btn btn-info">Arrendar</a>
                </td>
            </tr>
            {% endfor %}
        </tbody>
        </table>
      
      </div>
   
{% endblock %}

"""
11) Preparamos un formulario simple para el selector (filtro) de Categoría
en /web/  crear el archivo forms.py  y agregar lo siguiente:
"""
from django import forms
from .models import Categoria

class CategoriaFilterForm(forms.Form):
    categoria = forms.ModelChoiceField(
        queryset=Categoria.objects.all(),
        required=False,
        empty_label="Todas las categorías",
        widget=forms.Select(attrs={'class': 'form-control', 'onchange': 'this.form.submit();'})
    )

"""
12) Nueva vista de index
"""
from .forms import CategoriaFilterForm   ## agregar esa importación arriba

@login_required
def index(request):
    form = CategoriaFilterForm(request.GET)  
    
    if form.is_valid():
        categoria = form.cleaned_data.get('categoria')  
        if categoria:
            equipos = Equipo.objects.filter(categoria=categoria)  
        else:
            equipos = Equipo.objects.all() 
    else:
        equipos = Equipo.objects.all()

    return render(request, 'index.html', {'equipos': equipos, 'form': form})


