from rest_framework.authtoken import views
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LogoutView, CurrentUserView
from rest_framework.authtoken.views import ObtainAuthToken

router = DefaultRouter()
router.register(r'users', UserViewSet, 'users')

urlpatterns = [
    url(r'', include(router.urls, namespace='users')),
    url(r'login/$', ObtainAuthToken.as_view(), name="login-api"),
    url(r'logout/$', LogoutView.as_view(), name="logout-api"),
    url(r'current-user/$', CurrentUserView.as_view(), name="current-user-api")
]