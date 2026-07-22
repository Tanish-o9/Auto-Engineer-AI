from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlueprintViewSet, ArtifactViewSet

router = DefaultRouter()
router.register(r'artifacts', ArtifactViewSet, basename='artifact')
router.register(r'', BlueprintViewSet, basename='blueprint')

urlpatterns = [
    path('', include(router.urls)),
]
