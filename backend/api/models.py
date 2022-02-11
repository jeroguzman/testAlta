from django.db import models

class Marca(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

# Create your models here.
class Computadora(models.Model):
    modelo = models.CharField(max_length=250)
    descripcion = models.TextField(max_length=250)
    marca = models.ForeignKey(Marca, db_column='nombre', on_delete=models.CASCADE)

    def __str__(self):
        return self.modelo