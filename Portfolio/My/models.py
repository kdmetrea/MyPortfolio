from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

def Message_Photo_directory_path(instance, filename):
    return '{0}/Massage/Photo/{1}'.format(instance.FromUser.username, filename)

def Message_File_directory_path(instance, filename):
    return '{0}/Massage/File/{1}'.format(instance.FromUser.username, filename)

def Post_Photo_directory_path(instance, filename):
    return '{0}/Post/Photo/{1}'.format(instance.ForUser.username, filename)

def Post_File_directory_path(instance, filename):
    return '{0}/Post/File/{1}'.format(instance.ForUser.username, filename)

def user_directory_path(instance, filename):
    return '{0}/Image/{1}'.format(instance.user.username, filename)

def Chat_Image_directory_path(instance, filename):
    return '{0}/Image/{1}'.format(instance.Name, filename)

def user_thumbnail_directory_path(instance, filename):
    return '{0}/ImageThumbnail/{1}'.format(instance.user.username, filename)

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
    Friends = models.ForeignKey('AdditionToUser',on_delete=models.DO_NOTHING,blank = True,null = True)
    HTMLCode = models.TextField(blank=True,max_length=1024)
    AdminForChat = models.ForeignKey("Chat",on_delete=models.CASCADE,blank = True,null = True)
    Posts = models.ForeignKey("Post",on_delete=models.CASCADE,blank = True,null = True)
    
    def get_absolute_url(self):
        return reverse('ForgotPass', kwargs={'random_code': self.Random_code_for_password})

    class Meta:
        verbose_name = ("Пользователь")
        verbose_name_plural = ("Пользователи")

    def __str__(self):
        return self.user.username

class Mеssage(models.Model):
    Time = models.DateTimeField(auto_now_add=True)
    FromUser = models.ForeignKey(User,on_delete=models.CASCADE)
    Text = models.TextField(blank = True)
    Photo = models.ImageField(blank = True,upload_to = Message_Photo_directory_path)
    File = models.FileField(blank = True,upload_to=Message_File_directory_path)
    Chat = models.ForeignKey('Chat', on_delete = models.DO_NOTHING, related_name = 'Chat')
	
    class Meta:
        verbose_name = ("Сообщение")
        verbose_name_plural = ("Сообщения")
        
    def __str__(self):
        return "Сообщение от "+self.FromUser.username
    
class Post(models.Model):
    FromUser = models.ForeignKey(User,on_delete = models.CASCADE,related_name = 'FromUser')
    ForUser = models.ForeignKey(User,on_delete = models.CASCADE,related_name='ForUser')
    Time = models.DateTimeField(auto_now_add = True)
    Text = models.TextField(blank = True)
    Photo = models.ImageField(blank = True,upload_to = Post_Photo_directory_path)
    File = models.FileField(blank = True,upload_to=Post_File_directory_path)
    
    class Meta:
        verbose_name = ("Пост")
        verbose_name_plural = ("Посты")
        
class Chat(models.Model):
    Name = models.SlugField(unique=True,max_length=128)
    Image = models.ImageField(blank = True,upload_to = Chat_Image_directory_path)
    Users = models.ManyToManyField(User,related_name = 'Users')
    Mеssages = models.ManyToManyField(Mеssage,related_name = 'Message')
	
    class Meta:
        verbose_name = ("Чат")
        verbose_name_plural = ("Чаты")