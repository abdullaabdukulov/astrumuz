from common.utils.custom_response_decorator import custom_response
from rest_framework.generics import CreateAPIView, ListAPIView

from .models import ApplyCorporateRequest, Corporate
from .serializers import (
    ApplyCorporateRequestSerializer,
    CorporateListSerializer,
)


@custom_response
class CorporateListView(ListAPIView):
    queryset = Corporate.objects.prefetch_related("features").all()
    serializer_class = CorporateListSerializer


@custom_response
class ApplyCorporateRequestCreateView(CreateAPIView):
    queryset = ApplyCorporateRequest.objects.all()
    serializer_class = ApplyCorporateRequestSerializer
