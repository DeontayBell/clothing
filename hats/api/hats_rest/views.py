from django.shortcuts import render
from .models import Hat
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

# Create your views here.


@require_http_methods(["GET", "POST"])
def api_hat(request):
    if request.method == "GET":
        hat = Hat.objects.all()
        return JsonResponse(
            {"Hats": hat},

        )
