from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

def user_directory_path(instance, filename):
    return '{0}/{1}'.format(instance.user.username, filename)
def user_thumbnail_directory_path(instance, filename):
    return '{0}/thumbnail/{1}'.format(instance.user.username, filename)

class AdditionToUser(models.Model):
    user = models.OneToOneField(User,on_delete = models.CASCADE)
    Slug = models.SlugField(unique=True,max_length=128)
    Bio = models.TextField(max_length=128 ,blank=True)
    Photo = models.ImageField(upload_to = user_directory_path,blank = True)
    Random_code_for_password = models.CharField(blank = True,max_length=16)
    Photo_Thumbnail = ImageSpecField(source="Photo",
                                    processors=[ResizeToFill(100, 100)],
                                    format='JPEG',
                                    options={'quality': 60})
    HTMLCode = models.TextField(blank=True,max_length=1024)
    AdminForChat = models.OneToOneField("UserChat",on_delete=models.CASCADE,blank = True,null = True)
    Massages = models.ForeignKey("Massage",on_delete = models.CASCADE,blank = True,null = True)
    
    def get_absolute_url(self):
        return reverse('ForgotPass', kwargs={'random_code': self.Random_code_for_password})

    class Meta:
        verbose_name = ("Пользователь")
        verbose_name_plural = ("Пользователи")

    def __str__(self):
        return self.user.username
def Massage_Photo_directory_path(instance, filename):
    return '{0}_Massage/Photo/{1}'.format(instance.user.username, filename)
def Massage_File_directory_path(instance, filename):
    return '{0}_Massage/File/{1}'.format(instance.user.username, filename)
class Massage(models.Model):
    Time = models.DateTimeField()
    user = models.OneToOneField(User,on_delete = models.CASCADE)
    Chat = models.ForeignKey("UserChat",on_delete=models.CASCADE)
    Text = models.TextField(blank = True)
    Photo = models.ImageField(blank = True,upload_to = Massage_Photo_directory_path)
    File = models.FileField(blank = True,upload_to=Massage_File_directory_path)
    
    class Meta:
        verbose_name = ("Сообщение")
        verbose_name_plural = ("Сообщения")
        
    def __str__(self):
        return "Сообщение от "+self.user.username
class UserChat(models.Model):
    Users = models.ManyToManyField("AdditionToUser")
    class Meta:
        verbose_name = ("Чат")
        verbose_name_plural = ("Чаты")