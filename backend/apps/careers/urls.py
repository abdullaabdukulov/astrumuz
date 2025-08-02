from django.urls import path
from .views import VacancyListView, VacancyDetailView, ApplicationCreateView

urlpatterns = [
    path("vacancies/", VacancyListView.as_view(), name="vacancy-list"),
    path("vacancies/<int:pk>/", VacancyDetailView.as_view(), name="vacancy-detail"),
    path("apply/", ApplicationCreateView.as_view(), name="vacancy-apply"),
]
