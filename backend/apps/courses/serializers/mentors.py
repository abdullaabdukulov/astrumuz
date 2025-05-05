from rest_framework import serializers
from courses.models import Mentor

class MentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = ['id', 'name', 'position', 'bio', 'photo']
