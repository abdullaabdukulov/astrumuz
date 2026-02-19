from django.urls import path
from news.views import NewsCategoryListView, NewsDetailView, NewsListView

urlpatterns = [
    path("all/", NewsListView.as_view(), name="news-list"),
    path(
        "news-categories/",
        NewsCategoryListView.as_view(),
        name="news-category-list",
    ),
    path("detail/<slug:slug>/", NewsDetailView.as_view(), name="news-detail"),
]
