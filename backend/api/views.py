from django.shortcuts import render
from .models import Marca, Computadora
from .serializers import MarcaSerializer, ComputadoraSerializer
from rest_framework import viewsets

# Create your views here.
class MarcaViewSet(viewsets.ModelViewSet):
    serializer_class = MarcaSerializer
    queryset = Marca.objects.all()

class ComputadoraViewSet(viewsets.ModelViewSet):
    serializer_class = ComputadoraSerializer
    queryset = Computadora.objects.all()