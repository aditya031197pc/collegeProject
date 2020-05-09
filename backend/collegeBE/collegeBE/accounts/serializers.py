from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        print(validated_data['password'])
        validated_data['password'] = make_password(validated_data['password'])
        user = super().create(validated_data)
        return user
    
    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ['id', 'name','email','bio', 'image','height', 'weight','dob', 'password']