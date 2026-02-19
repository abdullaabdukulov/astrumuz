from common.serializers import BadgeSerializer
from rest_framework import serializers

from .models import Blog, BlogCategory


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ("id", "name")


class BlogListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer()
    badge = BadgeSerializer()

    class Meta:
        model = Blog
        fields = (
            "id",
            "title",
            "slug",
            "category",
            "badge",
            "image",
            "created_time",
        )


class BlogDetailSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer()

    class Meta:
        model = Blog
        fields = (
            "id",
            "title",
            "content",
            "category",
            "image",
            "created_time",
        )
