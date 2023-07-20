from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200)
    closet_name = models.CharField(max_length=100)


class Hat(models.Model):
    name = models.CharField(max_length=100)
    fabric = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    url = models.URLField(max_length=500)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("show_hat")
