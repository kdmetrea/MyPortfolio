import random
from django.shortcuts import get_object_or_404
from django.views.generic import ListView
from Portfolio.settings import EMAIL_HOST_USER,ALLOWED_HOSTS
from .services.json_services import *
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from .services.services import *
from fuzzywuzzy.fuzz import token_sort_ratio
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.core.files.base import ContentFile



class Home(ListView):
    model = ModelUser
    template_name = 'index.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["Url"] = self.request.path.split('/')[1]
        return context
class SearchApi(APIView):
    serializer_class = SearchSerializer
    @csrf_exempt
    def post(self,request):
        data = []
        AllAdditions = all_objects(ModelUser.objects)
        for addition in AllAdditions:
            if token_sort_ratio(addition.Slug,request.data['Slug']) >= 70:
                if addition.Photo:
                    if addition.Photo_Thumbnail and addition.Photo:
                        addition.Photo = addition.Photo_Thumbnail
                    elif not addition.Photo_Thumbnail and addition.Photo:
                        addition.Photo_Thumbnail = addition.Photo
                        addition.save()
                        addition.Photo = addition.Photo_Thumbnail
                data.append(AdditionToUserAndUserSerializer(addition).data)
        return Response(data)
class YourUserHomeApi(APIView):
    def get(self,request):
        return Response(request.user.username)
class YourUserProfileApi(APIView):
    def get(self,request):
        YourUser = get_object_or_404(ModelUser,Slug = request.user.username)
        return Response(AdditionToUserAndUserSerializer(YourUser).data)
class AdditionToUserAPIList(APIView):
    def get(self,*args, **kwargs):
        slug = kwargs.get('slug')
        print(slug)
        if slug == 'all':
            additions = all_objects(ModelUser.objects)
            addition = []
            for add in additions:
                addition.append(AdditionToUserAndUserSerializer(add).data)
        else:
            addition = AdditionToUserAndUserSerializer(get_object_or_404(ModelUser,Slug = slug)).data
        return Response(addition)
    def post(self,request,*args, **kwargs):
        seria = AdditionToUserAndUserSerializer(data = request.data)
        seria.is_valid(raise_exception = True)
        seria.save()
        user = get_object_or_404(ModelUser,Slug = request.data['user']['username'])
        print(request.data['user']['username'],request.data['user']['password'])
        login(request,user.user)
        return Response('')
class ForgotPasswordApi(APIView):
    serializer_class = ForgotSerializer
    def post(self,request):
        user = get_object_or_404(User,username = request.data['username'],email = request.data['email'])
        if user:
            random_code = []
            for ran in range(random.randrange(8,16)):
                random_code.append(random.randrange(0,10))
            random_code = ''.join(str(el) for el in random_code)
            addition = get_object_or_404(ModelUser,user = user)
            addition.Random_code_for_password = random_code
            print(random_code)
            addition.save()
            email = []
            email.append(request.data['email'])
            send_mail(f'Ваш пароль от {ALLOWED_HOSTS[0]}', f"Сожалеем что Вы потеряли пароль, но по этой ссылке, Вы можете его поменять - {ALLOWED_HOSTS[0]+'/'+'ForgotPass'+'/'+random_code+'/'}",EMAIL_HOST_USER,email)
            return Response('')
        else:
            return Response('Вы не зарегистрированы')
class AcceptRandom_code(APIView):
    serializer_class = AcceptRandom_codeSerializer
    def post(self,request):
        user = get_object_or_404(User,username = request.data['login'],email = request.data['email'])
        addition = get_object_or_404(ModelUser,user = user,Random_code_for_password = request.data['random_code'])
        if addition:
            addition.Random_code_for_password = ''
            user.set_password(request.data['new_password'])
            user.save()
            addition.save()
            return Response('valid')
class EnterUserApi(APIView):
    serializer_class = EnterUserSerializer
    def post(self,request):
        user = authenticate(
            username = request.data["username"],
            password = request.data['password'])
        if user is not None and user.email == request.data['email']:
            login(request,user)
            return Response('')
        else:
            return Response('Такого Пользователя нет')
class ExitUserApi(APIView):
    def get(self,request):
        logout(request)
        return Response('Logout')
class CreateChat(APIView):
    serializer_class = ChatSerializer
    def post(self,request):
        if request.user.is_authenticated:
            usernames = request.data['usernames'].split(',')
            idUsers = []
            Users = filter_objects(User.objects,username__in = usernames).values('id')
            for idUser in Users:
                idUsers.append(idUser['id'])
            NewChat = Chat(Name = request.data['Name'],Image = request.data['Image'])
            NewChat.save()
            NewChat.Users.add(*idUsers)
            return Response("")
        else:
            return Response('Вы не зарегистрированы')
    def get(self,request):
        if request.user.is_authenticated:
            data = []
            MyChat = filter_objects(Chat.objects,Users__in = [request.user])
            for chat in MyChat:
                data.append(ChatSerializer(chat).data)
            return Response(data)
        else:
            return Response('Вы не зарегистрированы')
class DeleteChat(APIView):
    def delete(self,request,Name):
        if request.user.is_authenticated:
            get_object_or_404(Chat,Users__in = [request.user], Name = Name).delete()
            return Response('')
        else:
            return Response('Вы не зарегистрированы')
class ControlMassage(APIView):
    serializer_class = MassageSerializer
    def post(self,request):
        seria = MassageSerializer(data = request.data)
        seria.is_valid(raise_exception = True)
        seria.save()
        return Response('')
    def get(self,request,Chat):
        if request.user.is_authenticated:
            Massages = filter_objects(Massage.objects,Chat = Chat)
            return ChatSerializer(Massages).data
        else:
            return Response('Вы не зарегистрированы')
class DeleteMassage(APIView):
    def delete(self,request,id):
        if request.user.is_authenticated:
            get_object_or_404(Massage.objects,id = id,FromUser = request.user).delete()
            return Response('')
        else:
            return Response('Вы не зарегистрированы')
class ControlPost(APIView):
    serializer_class = PostSerializer
    def post(self,request,slug):
        if request.user.is_authenticated:
            user = get_object_or_404(User,username = slug)
            create_object(Post.objects,
                                Text = request.data['Text'],
                                Photo = request.data['Photo'],
                                File = request.data['File'],
                                ForUser = user,
                                FromUser = request.user
                                ).save()
            return Response('')
        else:
            return Response('Вы не зарегистрированы')
    def get(self,request,slug):
        if request.user.is_authenticated:
            data = []
            user = get_object_or_404(User,username = slug)
            Posts = filter_objects(Post.objects,
                                   FromUser = user)
            for post in Posts:
                data.append(PostSerializer(post).data)
            print(data)
            return Response(data)
        else:
            return Response('Вы не зарегистрированы')
class DeletePost(APIView):
    def delete(self,request,id):
        if request.user.is_authenticated:
            DelPost = get_object(Post.objects,id = id,FromUser = request.user)
            if DelPost == None:
                DelPost = get_object(Post.objects,id = id,ForUser = request.user)
                if DelPost == None:
                    return Response('Это не Ваш пост')
                else:
                    DelPost.delete()
                    return Response('')
            else:
                DelPost.delete()
                return Response('')
        else:
            return Response('Вы не зарегистрированы')
class ShowLineNews(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            data = []
            Friend = get_object(AdditionToUser.objects, user = request.user).Friends
            print(Friend,'not for')
            for Frien in Friend:
                print(Frien,'for')
                data.append(LineSerializer(Frien.Posts).data)
            return Response(data)
        else:
            return Response('Вы не зарегистрированы')