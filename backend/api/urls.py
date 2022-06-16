from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    index, 
    # login, 
    save_user,
    Authenticate,
    DoctorsViewSet,
)

router = DefaultRouter()
router.register('doctors', DoctorsViewSet)

urlpatterns = [
    path('', index, name='index'),
    path('save_user/', save_user, name='save_user'),
    path('login/', Authenticate.as_view(), name='login'),
]

urlpatterns += router.urls