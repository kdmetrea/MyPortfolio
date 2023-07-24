from django.urls import path
from .views import *


urlpatterns = [
    path('Home/',Home.as_view()),
    path('Profile/<str:Slug>',Home.as_view()),
    path('api/V1/AdditionToUsers/<str:slug>/',AdditionToUserAPIList.as_view()),
    path('api/V1/Forgot/',ForgotPasswordApi.as_view()),
    path('api/V1/EnterUser/',EnterUserApi.as_view()),
    path('api/V1/Post/',ControlPost.as_view()),
    path('api/V1/Message/',ControlMessage.as_view()),
    path('api/V1/YourUserHome/',YourUserHomeApi.as_view()),
    path('api/V1/YourUserProfile/',YourUserProfileApi.as_view()),
    path('api/V1/Search/',SearchApi.as_view()),
    path('ForgotPass/<int:random_code>/',Home.as_view(),name = "ForgotPass"),
    path('api/V1/Forgot/Random_code_true/',AcceptRandom_code.as_view()),
    path('api/V1/Chat/',CreateChat.as_view()),
    path('api/V1/ExitUser/',ExitUserApi.as_view()),
    path('api/V1/DeleteMessage/<int:id>/',DeleteMessage.as_view()),
    path('api/V1/DeleteChat/<str:slug>/',DeleteChat.as_view()),
    path('api/V1/DeletePost/<int:id>/',DeletePost.as_view()),
    path('api/V1/ShowLineNews/',ShowLineNews.as_view()),
]