from django.urls import path

from dj_rest_auth.views import UserDetailsView 
from dj_rest_auth.views import LoginView, LogoutView
# from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView

# from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserDetailsView.as_view(), name='user'),
    # path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('token/refresh/', get_refresh_view(), name='token_refresh'),
]