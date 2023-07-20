from django.shortcuts import render
from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
import json
# Create your views here.


class LocationVoEncoder(ModelEncoder):
    model = LocationVO
    properties = ["id", "closet_name", "import_href"]


class hatListEncoder(ModelEncoder):
    model = Hat
    properties = ["id", "name", "fabric", "color", "url", "location"]

    encoders = {
        "location": LocationVoEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_hat(request):
    if request.method == "GET":
        hat = Hat.objects.all()
        return JsonResponse(
            {"hats": hat},
            encoder=hatListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location = LocationVO.objects.get(import_href=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "invalid location"}
            )
        hats = Hat.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=hatListEncoder,
            safe=False
        )


@require_http_methods(["GET", "DELETE"])
def api_show_hat(request, id):

    try:
        hat = Hat.objects.get(id=id)
    except Hat.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid id"},
            status=404
            )

    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=hatListEncoder,
            safe=False
        )
    else:
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
