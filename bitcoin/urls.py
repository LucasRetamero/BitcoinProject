from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='Home'),
    path('priceBitcoin', views.priceBitcoin, name='Price'),
    path('developmentBitcoin', views.developmentBtc, name='Development'),
    path('saveDevBtc/<str:date>/<str:close>/<str:volume>', views.saveOneDevBtc, name='savedevelopmentbtc'),
]