from django.contrib import admin
from .models import Hat
# Register your models here.


@admin.register(Hat)
class Hats(admin.ModelAdmin):
    list_display = ["id", "name", "fabric", "color", "url", "location"]
