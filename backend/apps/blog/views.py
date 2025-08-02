from rest_framework.generics import ListAPIView, RetrieveAPIView
from common.pagination import BlogPagination
from common.utils.custom_response_decorator import custom_response

from .models import Blog, BlogCategory
from .serializers import (
    BlogListSerializer,
    BlogDetailSerializer,
    BlogCategorySerializer,
)


@custom_response
class BlogListView(ListAPIView):
    queryset = Blog.objects.all().select_related("category")
    serializer_class = BlogListSerializer
    pagination_class = BlogPagination


@custom_response
class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.all().select_related("category")
    serializer_class = BlogDetailSerializer
    lookup_field = "slug"


class BlogCategoryListView(ListAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
