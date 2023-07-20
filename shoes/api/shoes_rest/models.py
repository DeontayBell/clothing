from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()


class Shoes(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(BinVO, related_name="shoes", on_delete=models.CASCADE)

    def get_api_url(self):
        return reverse("api_show_shoe", kwargs={"pk": self.pk})
