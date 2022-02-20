from django.urls import path
from ecommerce.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getOrders, name='myorders'),
    path('<str:key>/', views.getOrderById, name='user-order'),
]