from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from .models import Vacancy, Application
from .serializers import VacancyListSerializer, VacancyDetailSerializer, ApplicationCreateSerializer
from common.pagination import VacancyPagination
from common.utils.custom_response_decorator import custom_response


@custom_response
class VacancyListView(ListAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancyListSerializer
    pagination_class = VacancyPagination


@custom_response
class VacancyDetailView(RetrieveAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancyDetailSerializer
    lookup_field = "slug"


@custom_response
class ApplicationCreateView(CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationCreateSerializer
