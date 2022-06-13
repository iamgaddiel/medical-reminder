from django.urls import path
from .views import (
    index, 
    # login, 
    save_user,
    Authenticate
)

urlpatterns = [
    path('', index, name='index'),
    path('save_user/', save_user, name='save_user'),
    path('login/', Authenticate.as_view(), name='login'),
]