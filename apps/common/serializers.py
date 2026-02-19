from common.models import Badge, Page, Setting, SocialMedia
from rest_framework import serializers


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ["id", "url", "logo"]


class SettingSerializer(serializers.ModelSerializer):
    links = SocialMediaSerializer(many=True, read_only=True)

    class Meta:
        model = Setting
        fields = [
            "id",
            "location_name",
            "location_description",
            "phone_number",
            "address",
            "email",
            "latitude",
            "longitude",
            "links",
        ]


class PageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ["slug", "title"]


class PageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ["slug", "title", "content"]


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ("title", "color")
