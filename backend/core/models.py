from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ACCOUNT_TYPE = [
        ('doctor', 'doctor'),
        ('patient', 'patient')
    ]
    id = models.UUIDField(default=uuid4, editable=False, unique=True, primary_key=True)
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPE)
    

    def __str__(self) -> str:
        return f'@{self.username} | {self.first_name} {self.last_name}'

class Profile(models.Model):
    BLOOD_GROUP = [
        ('O-', 'O-'),
        ('O+', 'O+'),
        ('A-', 'A-'),
        ('A+', 'A+'),
        ('B-', 'B-'),
        ('B-', 'B-'),
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    weight = models.FloatField(default=0.0)
    height  = models.FloatField(default=0.0)
    blood_group = models.CharField(choices=BLOOD_GROUP, max_length=3, blank=True)
    profile_image = models.ImageField(upload_to="profile_images", default="profile.jpg")

    def __str__(self) -> str:
        return f"{self.user.username}'s profile"

class Doctor(models.Model):
    id = models.UUIDField(default=uuid4, editable=False, unique=True, primary_key=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    certificate = models.ImageField(upload_to="doctors_certificate", default="doctors_certificate.jpg")

    def __str__(self) -> str:
        return f"{self.user.username} doctor's profile"

class Patient(models.Model):
    id = models.UUIDField(default=uuid4, editable=False, unique=True, primary_key=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    allergies = models.TextField(help_text="Separate each allergy with a comma", blank=True)

    def __str__(self) -> str:
        return f'{self.user.username} patient profile'