from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>HealthTrack API</h1><p>Visit <a href='/api/activities/'>/api/activities/</a> to access the API.</p>")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('tracker.urls')),
]
