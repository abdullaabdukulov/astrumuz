from common.pagination import NewsPagination
from common.utils.custom_response_decorator import custom_response
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import News, NewsCategory
from .serializers import NewsDetailSerializer, NewsListSerializer, NewsCategorySerializer


@custom_response
class NewsListView(ListAPIView):
    queryset = News.objects.all().select_related("category")
    serializer_class = NewsListSerializer
    pagination_class = NewsPagination


@custom_response
class NewsDetailView(RetrieveAPIView):
    queryset = News.objects.all().select_related("category")
    serializer_class = NewsDetailSerializer
    lookup_field = "slug"


class NewsCategoryListView(ListAPIView):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer
