from django.contrib import admin
# import all models 
from .models import *
# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(Event)
admin.site.register(RaffleTicket)


