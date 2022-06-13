from django.shortcuts import get_object_or_404, render
from .serializers import CustomUserSerializer, LoginSerializer
from core.models import CustomUser, Doctor, Patient, Profile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.hashers import check_password




@api_view(['GET'])
def index(request):
    return Response({'data': 'welcome to the index'})

@api_view(['POST'])
def save_user(request):
    serializer = CustomUserSerializer(data=request.data)
    token = ""
    if serializer.is_valid():
        serializer.save()
    user = CustomUser.objects.get(username=serializer.validated_data.get('username'))
    token = Token.objects.create(user=user)

    return Response({'user': serializer.data}, status=201)

# from rest_framework.authtoken.views import ObtainAuthToken
class Authenticate(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')
        user_profile = Profile.objects.get(user=user)
        token, create = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'account_type': user.account_type,
            'email': user.email,
            'profile': {
                'image': user_profile.profile_image.url,
                'weight': user_profile.weight,
                'height': user_profile.height,
                'blood_group': user_profile.blood_group
            }
        })

