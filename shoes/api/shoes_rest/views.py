from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Shoes, BinVO


# Create your views here.
class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href",
        "closet_name",
        "bin_number",
    ]


class ShoesEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin",
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_shoes(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse({"shoes": shoes}, encoder=ShoesEncoder)
    else:
        content = json.loads(request.body)
        try:
            bin = BinVO.objects.get(import_href=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Bin doesnt exist"},
                status=400,
            )

        shoe = Shoes.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoesEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoesEncoder,
            safe=False,
        )
