import requests
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project, Idea, RequirementSet
from .serializers import ProjectSerializer, IdeaSerializer, RequirementSetSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(organization__members__user=self.request.user)

    @action(detail=True, methods=['post'])
    def submit_idea(self, request, pk=None):
        project = self.get_object()
        serializer = IdeaSerializer(data={**request.data, 'project': project.id})
        serializer.is_valid(raise_exception=True)
        idea = serializer.save()

        # Trigger AI Service PM Agent async run
        try:
            ai_url = f"{settings.AI_SERVICE_URL}/api/v1/agents/intake"
            headers = {'X-Service-Token': settings.AI_SERVICE_SECRET}
            requests.post(ai_url, json={'idea_id': str(idea.id), 'prompt': idea.raw_prompt}, headers=headers, timeout=5)
        except Exception as e:
            # Service call logged, status remains SUBMITTED for polling/retry
            pass

        return Response(IdeaSerializer(idea).data, status=status.HTTP_201_CREATED)

class IdeaViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = IdeaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Idea.objects.filter(project__organization__members__user=self.request.user)
