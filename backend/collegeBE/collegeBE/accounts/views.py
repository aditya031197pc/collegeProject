from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
import json
from django.conf import settings
from django.core import serializers
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, mixins, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.views import APIView
from rest_framework import generics

from .models import User
from .serializers import UserSerializer
from ..ml.prediction import predict

class LogoutView(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        token = get_object_or_404(Token, user=request.user)
        token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PredictionView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        body_unicode = request.body.decode('utf-8')
        symptoms = json.loads(body_unicode)
        result, probab = predict(symptoms)
        print(result, probab)
        predicted = True
        probab = probab * 100
        if(probab < 40):
            predicted = False
            # result = "Could't Predict the disease with the given symptoms"
        return Response({"disease": result, "probability": probab, "predicted": predicted},status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = [JSONParser, FormParser, MultiPartParser]

class CurrentUserView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(instance=request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)