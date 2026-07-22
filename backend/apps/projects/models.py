import uuid
from django.db import models
from apps.organizations.models import Organization

class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    github_repo_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Idea(models.Model):
    class Status(models.TextChoices):
        SUBMITTED = 'SUBMITTED', 'Submitted'
        CLARIFYING = 'CLARIFYING', 'Clarifying Questions'
        PROCESSING = 'PROCESSING', 'Processing Blueprint'
        COMPLETED = 'COMPLETED', 'Completed'
        FAILED = 'FAILED', 'Failed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ideas')
    raw_prompt = models.TextField()
    target_scale = models.CharField(max_length=100, default='Medium (10k-100k DAU)')
    target_budget = models.CharField(max_length=100, default='Standard ($500-$2000/mo)')
    deployment_target = models.CharField(max_length=100, default='AWS EKS / Containerized')
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.SUBMITTED)
    clarifying_answers = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Idea {self.id} ({self.status})"

class RequirementSet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    idea = models.OneToOneField(Idea, on_delete=models.CASCADE, related_name='requirement_set')
    epics = models.JSONField(default=list)
    stories = models.JSONField(default=list)
    sprint_plan = models.JSONField(default=dict)
    non_functional_requirements = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"RequirementSet for Idea {self.idea.id}"
