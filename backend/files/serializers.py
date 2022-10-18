from .models import InputFiles
from rest_framework import serializers

class InputFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputFiles
        fields = "__all__"