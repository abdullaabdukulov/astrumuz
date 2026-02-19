from django.urls import path

from .views import (
    BlogCategoryListView,
    BlogDetailView,
    BlogListView,
)

urlpatterns = [
    path("posts/", BlogListView.as_view(), name="blog-list"),
    path("posts/<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
    path(
        "categories/",
        BlogCategoryListView.as_view(),
        name="blog-category-list",
    ),
]
