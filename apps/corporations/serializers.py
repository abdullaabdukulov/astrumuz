from rest_framework import serializers

from .models import ApplyCorporateRequest, Corporate, CorporateFeature


class CorporateFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorporateFeature
        fields = ("id", "name")


class CorporateListSerializer(serializers.ModelSerializer):
    features = CorporateFeatureSerializer(many=True)

    class Meta:
        model = Corporate
        fields = ("id", "title", "description", "features")


class ApplyCorporateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplyCorporateRequest
        fields = (
            "id",
            "first_name",
            "last_name",
            "phone_number",
            "email_address",
            "cv",
            "message",
            "company",
        )
