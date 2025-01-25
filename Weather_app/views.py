from decouple import config
from django.shortcuts import render
import requests
from django.conf import settings
from weather_Forecast.settings import API_KEY


# Create your views here.
def home(request):
    return render(request,'home.html')

# Function for fetching weather data
def fetch_weather(city,country):
    base_link=f"https://api.openweathermap.org/data/2.5/weather?q={city},{country}&appid={settings.API_KEY}"

    response = requests.get(base_link)
    return response

# Function for displaying weather data
def weather_view(request):
    city=request.POST.get('city','Islamabad')#Default is islamabad
    country=request.POST.get('country','Pakistan')
    response=fetch_weather(city,country)

    if response.status_code==200:
        response=response.json()
        sky = response['weather'][0]['main']
        sky_desc = response['weather'][0]['description']
        temp = response['main']['temp']
        print(sky,temp,sky_desc)
        return render(request,"home.html",{
            'sky':sky,
            'sky_desc':sky_desc,
            'temp':temp
        })


    else:
        return render(request,'home.html',{"Error": "fetching data"})




