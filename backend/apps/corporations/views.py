from rest_framework.generics import ListAPIView, CreateAPIView
from .models import Corporate, ApplyCorporateRequest
from .serializers import CorporateListSerializer, ApplyCorporateRequestSerializer
from common.utils.custom_response_decorator import custom_response


@custom_response
class CorporateListView(ListAPIView):
    queryset = Corporate.objects.prefetch_related("features").all()
    serializer_class = CorporateListSerializer


@custom_response
class ApplyCorporateRequestCreateView(CreateAPIView):
    queryset = ApplyCorporateRequest.objects.all()
    serializer_class = ApplyCorporateRequestSerializer
