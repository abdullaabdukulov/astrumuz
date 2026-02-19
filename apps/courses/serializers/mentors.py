from courses.models import Mentor
from rest_framework import serializers


class MentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = ["id", "name", "position", "bio", "photo"]
