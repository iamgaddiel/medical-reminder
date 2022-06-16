from rest_framework import serializers
from core.models import CustomUser, Doctor, Patient, Profile


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'account_type', 'username','first_name', 'last_name', 'password']
        # read_only_fields = ['id']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        user = CustomUser(
            username = validated_data.get('username'),
            account_type = validated_data.get('account_type'),
            first_name = validated_data.get('first_name'),
            last_name = validated_data.get('last_name')
        )
        user.set_password(validated_data.get('password'))
        user.save()
        Profile.objects.create(user=user)

        # create doctor/patient profile based on account_type
        match(user.account_type):
            case 'doctor':
                Doctor.objects.create(user=user)
            case 'patient':
                Patient.objects.create(user=user)
        return user


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 
            'username', 
            'first_name', 
            'last_name', 
            'email',
            'profile', 
            'doctor'
        ]
        depth = 1

