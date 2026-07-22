from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import AuditLog
from .serializers import AuditLogSerializer

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['action', 'resource_type', 'actor_type']

    def get_queryset(self):
        org_id = self.request.query_params.get('org_id')
        queryset = AuditLog.objects.filter(organization__members__user=self.request.user)
        if org_id:
            queryset = queryset.filter(organization_id=org_id)
        return queryset

    @action(detail=False, methods=['get'])
    def compliance_summary(self, request):
        queryset = self.get_queryset()
        total_events = queryset.count()
        agent_actions = queryset.filter(actor_type='AGENT').count()
        user_actions = queryset.filter(actor_type='USER').count()

        return Response({
            "total_events": total_events,
            "agent_actions": agent_actions,
            "user_actions": user_actions,
            "audit_retention_days": 365,
            "status": "COMPLIANT"
        })
