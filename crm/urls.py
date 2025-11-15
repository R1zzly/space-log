from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.order_list_page, name='order_list_page'), 
    path('api/orders/', views.order_list_api, name='order_list_api'),

    path('orders/<int:order_id>/', views.order_detail_page, name='order_detail_page'),
    path('api/orders/<int:order_id>/', views.order_detail_api, name='order_detail_api'),

    path('orders/<int:order_id>/download/<int:file_id>/', views.download_file, name='download_file'),
    
    path('orders/create/', views.order_create_page, name='order_create_page'),
    path('api/orders/create/', views.order_create_api, name='order_create_api'),

    path('login/', views.login_page, name='login_page'),
    path('api/login/', views.login_api, name='login_api'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.register_page, name='register_page'),
    path('api/register/', views.register_api, name='register_api'),
    path('profile/', views.profile_page, name='profile_page'),
]