from typing import Dict, Any
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class DevOpsMultiCloudEngine:
    """
    DevOps & Multi-Cloud Deployment Engine
    Generates production DevOps assets and deployment manifests:
    - Multi-stage Dockerfile
    - docker-compose.yml (App, DB, Redis, Nginx)
    - Production Nginx reverse proxy config
    - GitHub Actions CI/CD pipeline
    - Platform-specific deployment configs for AWS, Azure, Railway, Render, Fly.io, Vercel
    """
    def __init__(self):
        self.synthesizer = DomainSynthesizerEngine()

    def generate_devops_config(self, prompt_or_name: str, cloud_provider: str = "AWS") -> Dict[str, Any]:
        domain_data = self.synthesizer.synthesize(prompt_or_name)
        title = domain_data["title"]
        domain_name = domain_data["domain_name"]

        target_cloud = cloud_provider.strip().upper()
        if target_cloud not in ["AWS", "AZURE", "RAILWAY", "RENDER", "FLY.IO", "VERCEL"]:
            target_cloud = "AWS"

        # 1. Multi-Stage Dockerfile
        dockerfile = f"""# Multi-Stage Alpine Dockerfile for {title}
FROM python:3.11-alpine AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-alpine AS runner
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
"""

        # 2. Production Docker Compose
        docker_compose = f"""version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/{domain_name}_db
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB={domain_name}_db
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  pgdata:
"""

        # 3. Nginx Reverse Proxy Config
        nginx_conf = f"""server {{
    listen 80;
    server_name api.{domain_name}.example.com;

    location / {{
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }}
}}
"""

        # 4. GitHub Actions CI/CD Pipeline
        github_actions = f"""name: CI/CD Pipeline — {title}

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies & Run Tests
        run: |
          pip install -r requirements.txt pytest
          pytest --cov=.
      - name: Deploy to {target_cloud}
        run: echo "Deploying to {target_cloud}..."
"""

        # 5. Cloud Platform Specific Manifest
        cloud_manifest = self._generate_cloud_manifest(target_cloud, domain_name)

        return {
            "project_title": title,
            "domain_name": domain_name,
            "target_cloud": target_cloud,
            "devops_assets": {
                "Dockerfile": dockerfile,
                "docker-compose.yml": docker_compose,
                "nginx.conf": nginx_conf,
                ".github/workflows/ci-cd.yml": github_actions,
                "cloud_manifest_filename": cloud_manifest["filename"],
                "cloud_manifest_content": cloud_manifest["content"]
            }
        }

    def _generate_cloud_manifest(self, cloud: str, domain_name: str) -> Dict[str, str]:
        if cloud == "RENDER":
            return {
                "filename": "render.yaml",
                "content": f"""services:
  - type: web
    name: {domain_name}-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
"""
            }
        elif cloud == "FLY.IO":
            return {
                "filename": "fly.toml",
                "content": f"""app = "{domain_name}-app"
primary_region = "iad"

[http_service]
  internal_port = 8000
  force_https = true
"""
            }
        elif cloud == "VERCEL":
            return {
                "filename": "vercel.json",
                "content": f"""{{
  "version": 2,
  "builds": [
    {{ "src": "app/main.py", "use": "@vercel/python" }}
  ],
  "routes": [
    {{ "src": "/(.*)", "dest": "app/main.py" }}
  ]
}}"""
            }
        elif cloud == "RAILWAY":
            return {
                "filename": "railway.json",
                "content": f"""{{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {{ "builder": "NIXPACKS" }},
  "deploy": {{ "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT" }}
}}"""
            }
        else: # AWS / Azure
            return {
                "filename": "aws-apprunner.json" if cloud == "AWS" else "azure-appservice.json",
                "content": f"""{{
  "ServiceName": "{domain_name}-service",
  "Provider": "{cloud}",
  "AutoScaling": true
}}"""
            }
