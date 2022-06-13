from django.contrib import admin
from .models import CustomUser, Profile, Patient, Doctor


admin.site.register(CustomUser)
admin.site.register(Profile)
admin.site.register(Patient)
admin.site.register(Doctor)
