from django.urls import path
from ecommerce.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('<str:key>/', views.getProduct, name="product"),


]