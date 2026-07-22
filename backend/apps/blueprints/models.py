import uuid
from django.db import models
from apps.projects.models import Project, RequirementSet

class Blueprint(models.Model):
    class Status(models.TextChoices):
        GENERATING = 'GENERATING', 'Generating'
        READY = 'READY', 'Production Ready'
        REJECTED = 'REJECTED', 'Requires Revision'
        FAILED = 'FAILED', 'Failed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='blueprints')
    requirement_set = models.ForeignKey(RequirementSet, on_delete=models.SET_NULL, null=True, related_name='blueprints')
    version = models.CharField(max_length=50, default='v1.0.0')
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.GENERATING)
    is_immutable = models.BooleanField(default=True)
    summary = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('project', 'version')

    def __str__(self):
        return f"{self.project.name} {self.version} ({self.status})"

class Artifact(models.Model):
    class ArtifactType(models.TextChoices):
        ARCHITECTURE_DIAGRAM = 'ARCHITECTURE_DIAGRAM', 'Architecture Diagram'
        ER_SCHEMA = 'ER_SCHEMA', 'ER Schema & Migration SQL'
        OPENAPI_SPEC = 'OPENAPI_SPEC', 'OpenAPI 3.0 Spec'
        FOLDER_TREE = 'FOLDER_TREE', 'Folder Tree & Coding Standards'
        COST_ESTIMATE = 'COST_ESTIMATE', 'Cloud Cost Estimate'
        SCALING_SIMULATION = 'SCALING_SIMULATION', 'Scaling Simulation'
        DR_PLAN = 'DR_PLAN', 'Disaster Recovery Plan'
        COMPLIANCE_REPORT = 'COMPLIANCE_REPORT', 'Compliance & Audit Report'
        OTHER = 'OTHER', 'Other Artifact'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    blueprint = models.ForeignKey(Blueprint, on_delete=models.CASCADE, related_name='artifacts')
    artifact_type = models.CharField(max_length=50, choices=ArtifactType.choices)
    name = models.CharField(max_length=255)
    file_path = models.CharField(max_length=500, blank=True, null=True)
    content_json = models.JSONField(default=dict, blank=True)
    content_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} [{self.artifact_type}] ({self.blueprint.version})"
