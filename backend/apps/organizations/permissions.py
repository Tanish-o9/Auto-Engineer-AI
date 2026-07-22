from rest_framework import permissions
from .models import OrganizationMember

class IsOrgMember(permissions.BasePermission):
    def has_permission(self, request, view):
        org_id = view.kwargs.get('org_pk') or request.data.get('organization_id')
        if not org_id:
            return True
        return OrganizationMember.objects.filter(
            organization_id=org_id,
            user=request.user
        ).exists()

class IsOrgAdminOrOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        org_id = view.kwargs.get('org_pk') or request.data.get('organization_id')
        if not org_id:
            return False
        return OrganizationMember.objects.filter(
            organization_id=org_id,
            user=request.user,
            role__in=[OrganizationMember.Role.OWNER, OrganizationMember.Role.ADMIN]
        ).exists()

class AgentExecutionBoundaryPermission(permissions.BasePermission):
    """
    Human-vs-Agent Boundary Rule:
    Agents can write blueprints, artifacts, and execution logs, but can NEVER manage
    organization memberships, billing settings, or delete projects.
    """
    def has_permission(self, request, view):
        is_agent_request = request.headers.get('X-Agent-Service-Token') is not None
        if is_agent_request:
            # Block agents from membership/admin views
            if getattr(view, 'is_admin_only_view', False):
                return False
        return True
