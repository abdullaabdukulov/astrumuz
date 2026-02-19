from common.pagination import BlogPagination
from common.utils.custom_response_decorator import custom_response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Blog, BlogCategory
from .serializers import (
    BlogCategorySerializer,
    BlogDetailSerializer,
    BlogListSerializer,
)


@custom_response
class BlogListView(ListAPIView):
    queryset = Blog.objects.all().select_related("category")
    serializer_class = BlogListSerializer
    pagination_class = BlogPagination

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category"]


@custom_response
class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.all().select_related("category")
    serializer_class = BlogDetailSerializer
    lookup_field = "slug"


class BlogCategoryListView(ListAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
