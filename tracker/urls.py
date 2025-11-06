from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'activities', views.ActivityViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),
]
