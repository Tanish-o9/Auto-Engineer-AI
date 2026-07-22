from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('apps.accounts.urls')),
    path('api/v1/organizations/', include('apps.organizations.urls')),
    path('api/v1/projects/', include('apps.projects.urls')),
    path('api/v1/blueprints/', include('apps.blueprints.urls')),
    path('api/v1/integrations/', include('apps.integrations.urls')),
    path('api/v1/audit/', include('apps.audit.urls')),
]
