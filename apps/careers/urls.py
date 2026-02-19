from django.urls import path

from .views import ApplicationCreateView, VacancyDetailView, VacancyListView

urlpatterns = [
    path("vacancies/", VacancyListView.as_view(), name="vacancy-list"),
    path(
        "vacancies/<slug:slug>/",
        VacancyDetailView.as_view(),
        name="vacancy-detail",
    ),
    path("apply/", ApplicationCreateView.as_view(), name="vacancy-apply"),
]
