from courses.models import Company, CompanyStudent
from rest_framework import serializers


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "description", "logo", "color"]


class CompanyStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyStudent
        fields = ["id", "company_name", "logo"]
