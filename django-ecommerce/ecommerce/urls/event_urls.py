from django.urls import path
from ecommerce.views import event_views as views

urlpatterns = [
    path('', views.getEvents, name='events'),
    path('<str:key>/', views.getEvent, name='event'),
    path('tickets/add/', views.addRaffleTicket, name='event-raffle-tickets-add'),
    path('tickets/<str:key>/', views.getRaffleTickets, name='event-raffle-tickets'),
    
]