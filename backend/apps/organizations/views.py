from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Organization, OrganizationMember
from .serializers import OrganizationSerializer, OrganizationMemberSerializer
from .permissions import IsOrgAdminOrOwner, AgentExecutionBoundaryPermission

class OrganizationViewSet(viewsets.ModelViewSet):
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated, AgentExecutionBoundaryPermission]
    is_admin_only_view = True

    def get_queryset(self):
        return Organization.objects.filter(members__user=self.request.user)

    def perform_create(self, serializer):
        org = serializer.save()
        OrganizationMember.objects.create(
            organization=org,
            user=self.request.user,
            role=OrganizationMember.Role.OWNER
        )

    @action(detail=True, methods=['get', 'post'], permission_classes=[permissions.IsAuthenticated, IsOrgAdminOrOwner])
    def members(self, request, pk=None):
        org = self.get_object()
        if request.method == 'GET':
            members = org.members.all()
            serializer = OrganizationMemberSerializer(members, many=True)
            return Response(serializer.data)
        elif request.method == 'POST':
            # Add member functionality
            return Response({"detail": "Member invite endpoint initialized"}, status=status.HTTP_200_OK)
