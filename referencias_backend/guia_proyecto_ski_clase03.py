"""
1) Activemos el botón de arrendar 

En el views.py agreguemos la nueva vista:
"""
@login_required
def arrendar(request, equipo_id):
    equipo = get_object_or_404(Equipo, id=equipo_id)

    if request.method == 'POST':
    
        fecha = request.POST.get('fecha')
        #observacion = request.POST.get('observacion', '')
         
        fecha_seleccionada = timezone.datetime.strptime(fecha, "%Y-%m-%d").date()
        fecha_hoy = timezone.now().date()
        
        if fecha_seleccionada < fecha_hoy:
            messages.error(request, "La fecha seleccionada debe ser hoy o una fecha futura.")
            return render(request, 'arrendar.html', {
                'equipo': equipo,
                'precio': equipo.precio,
                'fecha': fecha, 
            })
       
        nuevo_arriendo = Arriendo.objects.create(
            fecha=fecha,
            user=request.user,
            equipo=equipo
        )

        equipo.estado = "arrendado"
        equipo.save()
        
        return redirect('index')  

    
    return render(request, 'arrendar.html', {
        'equipo': equipo,
        'precio': equipo.precio,
    })
    
 ### IMPORTACIONES NECESARIAS:
 from django.shortcuts import render, redirect, get_object_or_404
 from django.utils import timezone
 
 
 """
 2) Nuevo template arrendar.html  (agregar el archivo dentro de /templates)
 
 y agrega el siguiente contenido:
 """
 
{% extends 'base.html' %}

{% block content %}

    <div class="container">
        <h3 class="text-center my-4">Arrendar</h3>

        <div class="row justify-content-center mt-4">
            <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                {{equipo.nombre}}
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <img src="{{equipo.imagen}}" class="img-fluid" alt="..." style="max-width:50%;">
                </div>
                
                <div class="card-body">
                    
                    <form action="{% url 'arrendar' equipo.id  %}" method="post" enctype="multipart/form-data">
                        {% csrf_token %}
                        
                        <h5>${{precio}}</h5>

                        <div class="mb-3">
                            
                            <input
                                    id=""
                                    type="date"
                                    class="form-control"
                                    name="fecha"
                                    placeholder="Fecha"
                                    value="{{ fecha | default:'' }}"
                                    required
                            >
                        </div>
           
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-sm btn-primary my-3">Arrendar</button>
                        </div>
                    </form>
                
                </div>
            </div>
        </div>
    </div>

{% endblock %} 
 
 
 """
 3) Nueva ruta en urls.py (dentro de /web)
 
 """
 path('equipos/<int:equipo_id>/arrendar/', arrendar, name='arrendar'),
 
 # IMPORTACIONES:
 
 from .views import index, arrendar
 
""" 
 3.1) Agregar la url de arriendo en el index.html
 
 Buscar la línea y colocar lo mostrado en el href (Para activar el botón de Arrendar)
 
 <a href="{% url 'arrendar' equipo.id  %}" class="btn btn-info">Arrendar</a>
 
""" 
 
 
 """
 4) Activación de página para ver mis arriendos
 
 Crear una nueva vista:
 
 """

@login_required
def misArriendos(request):
    arriendos = Arriendo.objects.filter(user=request.user).select_related('equipo')

    return render(request, 'mis_arriendos.html', {'arriendos': arriendos})
    
 """
 5) Activación de página para ver mis arriendos
 
 Crear el template mis_arriendos.html  
 """
 
{% extends 'base.html' %}

{% block content %}
 
<div class="container mt-5">
        <table class="table table-bordered table-striped table-success">
          <thead>
            <tr>
              <th scope="col">
                <div class="text-center">Nombre</div>
                
              </th>
              <th scope="col">
                <div class="text-center">Categoría</div>
                
              </th>
              <th scope="col">
                <div class="text-center">Fecha de arriendo</div>
              </th>
              <th scope="col">
                <div class="text-center">Acción</div>
              </th>

            </tr>
          </thead>
          <tbody>
            {% for arriendo in arriendos %}
            <tr>
                <td>{{ arriendo.equipo.nombre }}</td>
                <td>{{ arriendo.equipo.categoria.nombre }}</td>
                <td>{{ arriendo.fecha }}</td>
                <td>
                    <a href="" class="btn btn-info">Devolver</a>
                </td>
            </tr>
            {% endfor %}
        </tbody>
        </table>
      
      </div>
    </div>
   
{% endblock %}

"""
 6) Activación de página para ver mis arriendos
 
 Crear la ruta en el urls.py  
"""
path('equipos/misarriendos/', misArriendos, name='misarriendos'),

#IMPORTACIONES:
from .views import index, arrendar, misArriendos