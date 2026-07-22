from rest_framework import serializers
from .models import Blueprint, Artifact

class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = ('id', 'blueprint', 'artifact_type', 'name', 'file_path', 'content_json', 'content_text', 'created_at')

class BlueprintSerializer(serializers.ModelSerializer):
    artifacts = ArtifactSerializer(many=True, read_only=True)

    class Meta:
        model = Blueprint
        fields = ('id', 'project', 'requirement_set', 'version', 'status', 'is_immutable', 'summary', 'artifacts', 'created_at')
