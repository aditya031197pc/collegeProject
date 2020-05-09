from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


# Create your models here.

from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError("Please set email")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **kwargs):
        kwargs['is_staff'] = True
        kwargs['is_superuser'] = True
        return self.create_user(email, password, **kwargs)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        max_length=255, unique=True, verbose_name='email')
    name = models.CharField(max_length=255, verbose_name='name')
    image = models.ImageField(upload_to='pictures/',
                              null=True, blank=True, verbose_name='image')
                              
    bio = models.TextField(blank=True, verbose_name='bio')
    is_staff = models.BooleanField(default=False, verbose_name='staff')
    is_active = models.BooleanField(default=True, verbose_name='active')
    height = models.IntegerField(null=True, blank=True, verbose_name='Height in cms')
    weight = models.IntegerField(null=True, blank=True, verbose_name='Weight in kgs')
    dob = models.DateField(null=True, blank=True, verbose_name='Date of Birth')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name
    
    class Meta:
        verbose_name = 'user'

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)