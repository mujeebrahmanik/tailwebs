from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from .utils import verify_password
from .serializers import *
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from .helper import calculate_marks
from rest_framework.permissions import IsAuthenticated,AllowAny

# Create your views here.


def get_token(teacher):
    refresh = RefreshToken.for_user(teacher)
    refresh['teacher_id']=str(teacher.id)
    refresh['username']=teacher.username
    
    return{
        'refresh':str(refresh),
        'access':str(refresh.access_token)
    }
    


class Register_teacher_view(generics.ListCreateAPIView):
    queryset=Teacher.objects.all()
    serializer_class=Teacher_serializer
    
    


class Login_teacher_view(APIView):
    def post(self,request):
        username=request.data.get('username')
        password=request.data.get('password')
        
        try:
            teacher=Teacher.objects.get(username=username)
        except Teacher.DoesNotExist:
            return Response({'error':'Invalid Credentials'},status=status.HTTP_400_BAD_REQUEST)
        
        if not verify_password(password,teacher.password):
            return Response({'error':'Invalid Credentials'},status=status.HTTP_400_BAD_REQUEST)
        
        tokens=get_token(teacher)
        return Response(tokens,status=status.HTTP_200_OK)
    
    
class Student_view(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    queryset=Student.objects.all()
    serializer_class=Student_serializer
    
class Add_student_view(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
    
        name=request.data.get('name')
        subject=request.data.get('subject')
        marks=int(request.data.get('marks'))
        
        try:
            student=Student.objects.get(name=name,subject=subject)
            calculated_mark=calculate_marks(marks,student.marks)
            
            if calculated_mark>100:
                return Response({'error':'Student Already Exists so Calculated Marks Cannot Exceed 100'},status=status.HTTP_400_BAD_REQUEST)
            
            elif calculated_mark<0:
                return Response({'error':'Negative values not allowed'},status=status.HTTP_400_BAD_REQUEST)
            
            student.marks=calculated_mark
            data=student.save()
            Logs.objects.create(activity=f"Mark of {name} ({subject}) is changed.")
            return Response(Student_serializer(data).data,status=status.HTTP_201_CREATED)
            
        except Student.DoesNotExist:
            if marks>100:
                return Response({'error':'Marks Cannot Exceed 100'},status=status.HTTP_400_BAD_REQUEST)
            
            elif marks<0:
                return Response({'error':'Negative values not allowed'},status=status.HTTP_400_BAD_REQUEST)
        
            data=Student.objects.create(name=name,subject=subject,marks=marks)
            Logs.objects.create(activity=f"{name} ({subject}) is added.")
            return Response(Student_serializer(data).data,status=status.HTTP_201_CREATED)
        
        
class Edit_student(APIView):
    permission_classes=[IsAuthenticated]
    def put(self,request,pk):
        name=request.data.get('name')
        subject=request.data.get('subject')
        marks=int(request.data.get('marks'))
        
        try:
            student=Student.objects.get(pk=pk)
            
            if marks>100:
                return Response({'error':'Marks cannot exceed more than 100'},status=status.HTTP_400_BAD_REQUEST)
            elif marks<0:
                return Response({'error':'Negative values not Allowed'},status=status.HTTP_400_BAD_REQUEST)
            
            student.name=name
            student.subject=subject
            student.marks=marks
            data=student.save()
            Logs.objects.create(activity=f"{student.name} ({student.subject}) is edited.")
            return Response(Student_serializer(data).data,status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
            
            
class Delete_student(APIView):
    permission_classes=[IsAuthenticated]

    def delete(self,request,pk):
        try:
            student=Student.objects.get(pk=pk)
            student.delete()
            Logs.objects.create(activity=f"{student.name} ({student.subject}) is deleted.")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        
class Audit_log(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    queryset=Logs.objects.all()
    serializer_class=Audit_serializer
    

        
        

            