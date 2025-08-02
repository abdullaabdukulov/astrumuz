from django.urls import path
from .views import CorporateListView, ApplyCorporateRequestCreateView

urlpatterns = [
    path("", CorporateListView.as_view(), name="corporate-list"),
    path("apply/", ApplyCorporateRequestCreateView.as_view(), name="corporate-apply"),
]
