from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, IdeaViewSet

router = DefaultRouter()
router.register(r'ideas', IdeaViewSet, basename='idea')
router.register(r'', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
]
