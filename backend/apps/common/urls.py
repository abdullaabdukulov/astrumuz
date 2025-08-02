from common.views import (
    PageDetailAPIView,
    PageListAPIView,
    SettingRetrieveAPIView,
)
from django.urls import path

urlpatterns = [
    path("settings/", SettingRetrieveAPIView.as_view(), name="setting-get"),
    path("pages/", PageListAPIView.as_view(), name="page-list"),
    path(
        "pages/<slug:slug>/", PageDetailAPIView.as_view(), name="page-detail"
    ),
]
