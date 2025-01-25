from decouple import config
from django.shortcuts import render
import requests
from django.conf import settings


# Create your views here.
def home(request):
    context = {'api_key':settings.API_KEY}
    return render(request,'home.html',context)




