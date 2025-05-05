from rest_framework import serializers
from courses.models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    company_logo = serializers.ImageField(source='company.logo', read_only=True)
    company_color = serializers.CharField(source='company.color', read_only=True)

    class Meta:
        model = Testimonial
        fields = [
            'id',
            'name',
            'position',
            'company',
            'company_name',
            'company_logo',
            'company_color',
            'avatar',
            'text'
        ]
