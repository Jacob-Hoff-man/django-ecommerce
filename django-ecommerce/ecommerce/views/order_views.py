from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# status codes used for error handling
from rest_framework import status

from ecommerce.models import Product, Order, OrderItem, ShippingAddress
from ecommerce.serializers import ProductSerializer, OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    # return a status error if there are no items in orderItems
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status= status.HTTP_400_BAD_REQUEST)
    else:
        # create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

        # create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            zipCode=data['shippingAddress']['zipCode'],
            country=data['shippingAddress']['country']
        )
        # create order items and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            # checking if product has attr image
            if product.image and hasattr(product.image, 'url'):
                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    quantity=i['quantity'],
                    price=i['price'],
                    image=product.image.url,
                )
            else:
                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    quantity=i['quantity'],
                    price=i['price'],
                )


            # update the ordered items' stock
            product.countInStock -= item.quantity
            product.save()
        
    # serialize the Order, ShippingAddress, and OrderItem
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, key):
    user = request.user

    try:
        order = Order.objects.get(_id = key)
        # only admin or user that created the order can access an order by id
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view the order.'}, status = status.HTTP_400_BAD_REQUEST)
    except:
            return Response({'detail': 'Order does not exist.'}, status = status.HTTP_400_BAD_REQUEST)