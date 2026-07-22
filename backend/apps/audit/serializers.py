from rest_framework import serializers
from .models import AuditLog

class AuditLogSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = AuditLog
        fields = ('id', 'organization', 'user', 'user_email', 'actor_type', 'action', 'resource_type', 'resource_id', 'metadata', 'created_at')
