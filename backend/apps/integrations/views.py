import hmac
import hashlib
import json
import requests
from django.conf import settings
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import WebhookEvent

class GitHubWebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        signature = request.headers.get('X-Hub-Signature-256')
        delivery_id = request.headers.get('X-GitHub-Delivery')
        event_type = request.headers.get('X-GitHub-Event')

        if not signature or not delivery_id:
            return Response({"error": "Missing signature or delivery header"}, status=status.HTTP_400_BAD_REQUEST)

        # Verify HMAC SHA-256
        secret = settings.GITHUB_WEBHOOK_SECRET.encode('utf-8')
        expected_sig = 'sha256=' + hmac.new(secret, request.body, hashlib.sha256).hexdigest()

        if not hmac.compare_digest(expected_sig, signature):
            return Response({"error": "Invalid HMAC signature"}, status=status.HTTP_403_FORBIDDEN)

        payload = json.loads(request.body.decode('utf-8'))
        event, created = WebhookEvent.objects.get_or_create(
            delivery_id=delivery_id,
            defaults={'event_type': event_type, 'payload': payload}
        )

        if event_type == 'pull_request' and payload.get('action') in ['opened', 'synchronize']:
            # Dispatch to AI Service for automated Security/QA PR review
            try:
                ai_url = f"{settings.AI_SERVICE_URL}/api/v1/integrations/github/review-pr"
                headers = {'X-Service-Token': settings.AI_SERVICE_SECRET}
                requests.post(ai_url, json={'delivery_id': delivery_id, 'payload': payload}, headers=headers, timeout=5)
            except Exception:
                pass

        event.is_processed = True
        event.save()

        return Response({"status": "received", "event_type": event_type}, status=status.HTTP_200_OK)
