from common.utils.custom_response_decorator import custom_response
from courses.models import Company
from courses.serializers import CompanySerializer
from rest_framework import viewsets
from rest_framework.views import APIView


@custom_response
class CompanyViewSet(viewsets.ReadOnlyModelViewSet, APIView):
    """API endpoint for companies"""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
