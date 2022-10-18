from django.shortcuts import render
from rest_framework import viewsets, routers
from .serializers import InputFilesSerializer
from .models import InputFiles, OutputFiles
from django.urls import path, include
from pathlib import Path, os
import csv
import requests
from datetime import datetime
from django.http import HttpResponse

BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


# Create your views here.
class InputFilesView(viewsets.ModelViewSet):
    queryset = InputFiles.objects.all()
    serializer_class = InputFilesSerializer

    def create(self, request):
        resp = super().create(request)

        # calling category recommendation API
        
        f = open(MEDIA_ROOT+'/csv_files/'+str(request.FILES.get('fileUrl')), 'r')
        # f_ = open(MEDIA_ROOT+'/out_temp_files/'+'out.csv', 'w', encoding='UTF8')

        response = HttpResponse(
            content_type='text/csv',
            headers={'Content-Disposition': 'attachment; filename="somefilename.csv"'},
        )
        # writer = csv.writer(f_)
        writer = csv.writer(response)
        reader = csv.reader(f)
        url = 'https://twinword-category-recommendation-api.p.rapidapi.com/recommend/?text='
        for row in reader:
            req = requests.get(url+row[0], headers={
                'X-RapidAPI-Key':'0b5f43f641msh8ea409c6e9b34e4p1a4b13jsn0e86ad14e593', 
                'X-RapidAPI-Host': 'twinword-category-recommendation-api.p.rapidapi.com'
                }
            )
            writer.writerow(row+req.json()['categories'])
        f.close()
        # f_.close()
        # out_file = OutputFiles(date=datetime.now(), fileUrl=MEDIA_ROOT+'/out_temp_files/'+'out.csv')
        # os.remove(MEDIA_ROOT+'/out_temp_files/'+'out.csv')

        return response

router_inp = routers.DefaultRouter()
router_inp.register(r'', InputFilesView)

api_urlpatterns = ([
    path('', include(router_inp.urls)),
], 'api')