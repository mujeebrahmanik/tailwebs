from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.
class Teacher(AbstractBaseUser):
    username=models.CharField(max_length=50,unique=True)
    password=models.CharField(max_length=256)
    email=models.EmailField()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    
    
    def __str__(self):
        return self.username
    
    
class Student(models.Model):
    name=models.CharField(max_length=100)
    subject=models.CharField(max_length=100)
    marks=models.PositiveIntegerField()
    
    def __str__(self):
        return self.name
    
        
    
class Logs(models.Model):
    activity=models.CharField(max_length=300)
    created_date=models.DateTimeField(auto_now_add=True)
