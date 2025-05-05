from common.pagination import CompanyPagination
from common.utils.custom_response_decorator import custom_response
from courses.models import Company
from courses.openapi_schema import company_list_schema, company_retrieve_schema
from courses.serializers import CompanySerializer
from rest_framework import viewsets
from rest_framework.views import APIView


@custom_response
class CompanyViewSet(viewsets.ReadOnlyModelViewSet, APIView):
    """API endpoint for companies"""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    pagination_class = CompanyPagination

    @company_list_schema
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @company_retrieve_schema
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
