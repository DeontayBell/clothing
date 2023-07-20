from django.urls import path

from .views import api_hat, api_show_hat


urlpatterns = [
    path("hats/", api_hat, name="api_hat"),
    path("hats/<int:id>/", api_show_hat, name="api_show_hat")
]
