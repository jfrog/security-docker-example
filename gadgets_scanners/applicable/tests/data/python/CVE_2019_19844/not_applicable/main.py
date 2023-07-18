from django.urls import include, path

urlpatterns = [
  path("community/", include("accounts.urls.garbage")),
]