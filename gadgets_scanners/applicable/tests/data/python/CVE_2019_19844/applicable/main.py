from django.urls import include, path

urlpatterns = [
  path("community/", include("accounts.urls")),
  path("contact/", include("django.contrib.auth.urls")),
]