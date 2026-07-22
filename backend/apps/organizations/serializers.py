from rest_framework import serializers
from .models import Organization, OrganizationMember
from apps.accounts.serializers import UserSerializer

class OrganizationMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = OrganizationMember
        fields = ('id', 'organization', 'user', 'role', 'created_at')

class OrganizationSerializer(serializers.ModelSerializer):
    members_count = serializers.SerializerMethodField()

    class Meta:
        model = Organization
        fields = ('id', 'name', 'slug', 'created_at', 'updated_at', 'members_count')

    def get_members_count(self, obj):
        return obj.members.count()
