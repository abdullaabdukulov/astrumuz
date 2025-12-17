from common.serializers import BadgeSerializer
from rest_framework import serializers

from .models import News, NewsCategory


class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ("id", "name")


class NewsListSerializer(serializers.ModelSerializer):
    category = NewsCategorySerializer()
    badge = BadgeSerializer()

    class Meta:
        model = News
        fields = (
            "id",
            "title",
            "slug",
            "category",
            "badge",
            "image",
            "created_time",
        )


class NewsDetailSerializer(serializers.ModelSerializer):
    category = NewsCategorySerializer()

    class Meta:
        model = News
        fields = (
            "id",
            "title",
            "content",
            "category",
            "image",
            "created_time",
        )
