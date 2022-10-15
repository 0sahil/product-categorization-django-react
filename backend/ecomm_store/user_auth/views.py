from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserCreateSerializer, UserSerializer

User = get_user_model()

class RegisterView(APIView):
    """
    Register User
    """
    def post(self, request):
        data = request.data  # fname, lname, email, pw

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():  # data validation
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)  # user creation
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class GetUserView(APIView):
    """
    Retrieve User
    """

    permission_classes = [permissions.IsAuthenticated]  # logged in
    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)

