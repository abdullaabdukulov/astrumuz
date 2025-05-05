from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class CompanyPagination(CustomPagination):
    pass


class CoursePagination(CustomPagination):
    pass


class MentorPagination(CustomPagination):
    pass


class RegistrationPagination(CustomPagination):
    pass


class TestimonialsPagination(CustomPagination):
    pass
