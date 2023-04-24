from .services.base_services import create_object, filter_objects
from .services.services import ModelUser
from .models import AdditionToUser, UserChat
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import login
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from drf_extra_fields.fields import Base64ImageField

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    email = serializers.EmailField(write_only = True)
    class Meta:
        model = User
        fields = ['password',"username","email","last_name","first_name"]
class AdditionToUserAndUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    Photo = Base64ImageField()
    class Meta:
        model = AdditionToUser
        fields = ['Bio','Photo','HTMLCode','user']
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data["password"] = make_password(user_data["password"])
        user = create_object(User.objects,**user_data)
        user.save()
        if len(validated_data["HTMLCode"].split('<script>')) != 1:
            HTML_del = validated_data["HTMLCode"].split('<script>')[1].split('</script>')[0]
            validated_data["HTMLCode"] = validated_data["HTMLCode"].replace(HTML_del,'')
        addition = create_object(ModelUser.objects,
                                 **validated_data,
                                 user=user,Slug = user.username)
        return addition
class ChatSerializer(serializers.ModelSerializer):
    Users = AdditionToUserAndUserSerializer()
    class Meta:
        model = UserChat
        fields = ['Users']
    def create(self, validated_data):
        if self.request.user.is_authenticated:
            Username_users = validated_data['Users'].split(',').append(self.request.user.username)
            Users = filter_objects(User.objects,username__in = Username_users)
            Chat = create_object(UserChat.objects,Users = Users)
            return Chat
        else:
            return Response('Вы не зарегистрированы')
class ForgotSerializer(serializers.Serializer):
    email = serializers.EmailField()
    login = serializers.CharField()
class EnterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password',"username","email"]
class AcceptRandom_codeSerializer(serializers.Serializer):
    random_code = serializers.CharField()
    email = serializers.EmailField()
    login = serializers.CharField()
    new_password = serializers.CharField()
class SearchSerializer(serializers.Serializer):
    Slug = serializers.CharField()