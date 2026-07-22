from rest_framework import serializers
from .models import Project, Idea, RequirementSet

class RequirementSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequirementSet
        fields = ('id', 'epics', 'stories', 'sprint_plan', 'non_functional_requirements', 'created_at')

class IdeaSerializer(serializers.ModelSerializer):
    requirement_set = RequirementSetSerializer(read_only=True)

    class Meta:
        model = Idea
        fields = ('id', 'project', 'raw_prompt', 'target_scale', 'target_budget', 'deployment_target', 'status', 'clarifying_answers', 'requirement_set', 'created_at')

class ProjectSerializer(serializers.ModelSerializer):
    ideas = IdeaSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'organization', 'name', 'description', 'github_repo_url', 'ideas', 'created_at', 'updated_at')
