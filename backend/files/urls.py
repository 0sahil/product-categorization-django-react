from django.urls import path, include
from .views import api_urlpatterns

urlpatterns = [
]

urlpatterns += [
    path('submit/', include(api_urlpatterns)),
]