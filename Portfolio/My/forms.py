from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from .models import AdditionToUser

class RegisterUserForm(UserCreationForm):
    username = forms.CharField(label="Логин",widget=forms.TextInput(attrs={"class":'form-input'}))
    email=forms.EmailField(label="Email",widget=forms.EmailInput(attrs={"class":'form-input'}))
    password1 = forms.CharField(label="Пароль",widget=forms.PasswordInput(attrs={"class":'form-input'}))
    password2 = forms.CharField(label="Повтор пароля",widget=forms.PasswordInput(attrs={"class":'form-input'}))
    class Meta:
        model=User
        fields=('username',"email","password1","password2")
class AuthenticationUserForm(AuthenticationForm):
    username = forms.CharField(label="Логин",widget=forms.TextInput(attrs={"class":'form-input'}))
    password = forms.CharField(label="Пароль",widget=forms.PasswordInput(attrs={"class":'form-input'}))
class AdditionToUserForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    class Meta():
        model = AdditionToUser
        fields = ['Bio', 'Photo']