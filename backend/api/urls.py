from .views import MarcaViewSet, ComputadoraViewSet
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'marcas', views.MarcaViewSet, basename='marca')
router.register(r'computadoras', views.ComputadoraViewSet, basename='computadora')
urlpatterns = router.urls