from django.urls import path
from .views import GitHubWebhookView

urlpatterns = [
    path('github/webhook/', GitHubWebhookView.as_view(), name='github_webhook'),
]
