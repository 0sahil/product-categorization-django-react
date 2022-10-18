from django.db import models

# Create your models here.
class InputFiles(models.Model):
    fileUrl = models.FileField(blank=False, null=False, upload_to='csv_files/')

class OutputFiles(models.Model):
    date = models.DateField()
    fileUrl = models.URLField(blank=False, null=False)