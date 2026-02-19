from common.utils.custom_response_decorator import custom_response
from courses.models import Company
from courses.serializers import CompanySerializer
from rest_framework import generics


@custom_response
class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
