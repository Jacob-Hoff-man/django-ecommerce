from .models import Product, User, Order, OrderItem, ShippingAddress, RaffleTicket, Event

from rest_framework import serializers
# used to generate User refresh token for serialization 
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    # serializing custom fields
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id','username','email','name', 'isAdmin']
    

    # renaming a field 'isAdmin' by utilizing the default is_staff from django User model
    def get_isAdmin(self, obj):
        return obj.is_staff

    # renaming a field '_id' by utilizing the default id from django User model 
    def get__id(self, obj):
        return obj.id

    # returning first name only as name field, or user's email if they have no name
    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email

        return name
 
# Extending UserSerializer, including a refresh token
class UserSerializerWithToken(UserSerializer):
    # serializing custom fields
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id','username','email','name', 'isAdmin', 'token']

    def get_token(self, obj):
        # returning an additional token with the initial user response
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ShippingAddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = '__all__'

# nested serializer--calling only order serializer in view, which is handling queries for Order, ShippingAddress, and OrderItems
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

class EventSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Event
        fields = '__all__'

class RaffleTicketSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = RaffleTicket
        fields = '__all__'
        

