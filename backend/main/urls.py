from django.urls import path,include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView

urlpatterns = [
    path('register',Register_teacher_view.as_view(),name='Register_teacher'),
    path('login',Login_teacher_view.as_view(),name='Login_teacher'),
    path('students',Student_view.as_view(),name='Students'),
    path('add_student',Add_student_view.as_view(),name='add_students'),
    path('edit_student/<int:pk>',Edit_student.as_view(),name='edit_students'),
    path('delete_student/<int:pk>',Delete_student.as_view(),name='delete_students'),
    path('audit_log',Audit_log.as_view(),name='audit_log'),
    
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

 
]
