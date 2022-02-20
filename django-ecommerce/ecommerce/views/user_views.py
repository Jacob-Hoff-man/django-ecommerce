# hashing import for storing password
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# status codes used for error handling to maintain unique account credentials on registration
from rest_framework import status

from ecommerce.models import User
from ecommerce.serializers import UserSerializer, UserSerializerWithToken

# importing from rest-framework-simplejwt for changing the token claim to include user data 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# sub class for customizing validate method to serialize custom user data in token claims
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        # looping through the serializer fields
        for key, val in serializer.items():
            data[key] = val

        return data 

# sub class for the token serializer (serializer that returns the user data from token)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    # store a new user in the db
    data = request.data
    try:
        # creating the user and storing in db
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
        )
        # returning the serialized user
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        # error handler for duplicate user credentials on registration attempt
        message = {'detail': "This email is already taken."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    # update a specified user from the db
    # using rest-api-simplejwt, so request.user is getting data from token, and user from this data
    user = request.user
    # returning the user with a new token  
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    # get a single user from the db
    # using rest-api-simplejwt, so request.user is getting data from token, and user from this data
    user = request.user     
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    # get all the users from the db
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)