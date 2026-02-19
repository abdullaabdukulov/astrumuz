from common.models import Page, Setting
from common.serializers import (
    PageDetailSerializer,
    PageListSerializer,
    SettingSerializer,
)
from common.utils.custom_response_decorator import custom_response
from rest_framework.generics import ListAPIView, RetrieveAPIView


@custom_response
class SettingRetrieveAPIView(RetrieveAPIView):
    serializer_class = SettingSerializer

    def get_object(self):
        return Setting.objects.first()


@custom_response
class PageListAPIView(ListAPIView):
    queryset = Page.objects.all()
    serializer_class = PageListSerializer


@custom_response
class PageDetailAPIView(RetrieveAPIView):
    queryset = Page.objects.all()
    serializer_class = PageDetailSerializer
    lookup_field = "slug"
