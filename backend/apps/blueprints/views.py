from rest_framework import viewsets, permissions, filters
from .models import Blueprint, Artifact
from .serializers import BlueprintSerializer, ArtifactSerializer

class BlueprintViewSet(viewsets.ModelViewSet):
    serializer_class = BlueprintSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['version', 'summary', 'status']

    def get_queryset(self):
        project_id = self.request.query_params.get('project_id')
        queryset = Blueprint.objects.filter(project__organization__members__user=self.request.user)
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

class ArtifactViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ArtifactSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        blueprint_id = self.request.query_params.get('blueprint_id')
        queryset = Artifact.objects.filter(blueprint__project__organization__members__user=self.request.user)
        if blueprint_id:
            queryset = queryset.filter(blueprint_id=blueprint_id)
        return queryset
