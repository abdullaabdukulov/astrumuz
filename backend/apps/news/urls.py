from django.urls import path
from news.views import NewsDetailView, NewsListView

urlpatterns = [
    path("news/", NewsListView.as_view(), name="news-list"),
    path("news/<slug:slug>/", NewsDetailView.as_view(), name="news-detail"),
]
