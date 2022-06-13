from django.contrib import admin
from django.urls import include, path
from rest_framework_swagger.views import get_swagger_view
from django.conf import settings
from django.conf.urls.static import static


schema_view = get_swagger_view(title='Tyme API')

urlpatterns = [
    path('route/', schema_view),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)