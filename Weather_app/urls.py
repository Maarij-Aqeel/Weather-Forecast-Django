
from django.urls import path
from  . import views

urlpatterns=[

    path('',views.home,name='home'),
    path('weather/',views.weather_view,name='weather'),

]