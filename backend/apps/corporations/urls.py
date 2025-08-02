from django.urls import path

from .views import ApplyCorporateRequestCreateView, CorporateListView

urlpatterns = [
    path("", CorporateListView.as_view(), name="corporate-list"),
    path(
        "apply/",
        ApplyCorporateRequestCreateView.as_view(),
        name="corporate-apply",
    ),
]
