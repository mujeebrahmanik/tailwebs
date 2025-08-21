from rest_framework import serializers
from .models import *
from .utils import hash_password

class Teacher_serializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['id','username','password','email']
        extra_kwargs = {
            'password': {'write_only': True}
        }

        
    def create(self, validated_data):
        validated_data['password']=hash_password(validated_data['password'])
        return super().create(validated_data)
    
    
class Student_serializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields="__all__"
        
class Audit_serializer(serializers.ModelSerializer):
    class Meta:
        model=Logs
        fields="__all__"