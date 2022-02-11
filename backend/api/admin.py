from django.contrib import admin
from .models import Marca, Computadora
# Register your models here.

class Marca(admin.ModelAdmin):
    list = ('nombre')

    admin.site.register(Marca)

class Computadora(admin.ModelAdmin):
    list = ('modelo', 'marca')

    admin.site.register(Computadora)