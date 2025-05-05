from courses.models import Company
from courses.serializers import CompanySerializer
from rest_framework import viewsets


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for companies"""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
