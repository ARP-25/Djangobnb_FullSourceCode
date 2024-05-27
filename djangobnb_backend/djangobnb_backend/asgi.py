import os
from django.core.asgi import get_asgi_application
from djangobnb_backend.routing import application as djangobnb_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangobnb_backend.settings')
django_asgi_app = get_asgi_application()

application = djangobnb_application
