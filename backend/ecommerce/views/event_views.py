from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
# status codes used for error handling
from rest_framework import status

from ecommerce.models import Event, RaffleTicket
from ecommerce.serializers import EventSerializer, RaffleTicketSerializer

@api_view(['GET'])
def getEvent(request, key):
    # get the event matching the key (id) parameter
    event = Event.objects.get(_id=key)
    serializer = EventSerializer(event, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getEvents(request):
    # get all events
    event = Event.objects.all()
    serializer = EventSerializer(event, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRaffleTickets(request, key):
    # get all the raffle tickets from the db for a specified event using key ( event's id) parameter */
    raffleTickets = RaffleTicket.objects.filter(event___id=key)
    serializer = RaffleTicketSerializer(raffleTickets, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addRaffleTicket(request):
    # store a new raffle ticket in the db
    data = request.data

    event = Event.objects.get(_id=data['event']['_id'])
    
    # check if email has already submitted a raffle ticket
    if RaffleTicket.objects.filter(email=data['email']).exists():
        return Response({'detail': 'This email has already submitted a raffle ticket.'}, status = status.HTTP_400_BAD_REQUEST)
    else:
        # creating the raffle ticket and storing in db
        raffleTicket = RaffleTicket.objects.create(
            event = event,
            name=data['name'],
            email=data['email'],
        )
        # returning the serialized raffle ticket
        serializer = RaffleTicketSerializer(raffleTicket, many=False)
        return Response(serializer.data)
