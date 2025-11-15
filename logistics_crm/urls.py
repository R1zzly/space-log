from django.contrib import admin
from django.urls import path, include
from crm import views as crm_views

urlpatterns = [
    path('admin/', admin.site.urls),
     path('', crm_views.root_redirect_view, name='root_redirect'),
    path('', include('crm.urls')),
]