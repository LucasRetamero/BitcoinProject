from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='Home'),
    path('priceBitcoin', views.priceBitcoin, name='Price'),
    path('priceBitcoin/allData', views.priceBitcoinAllData, name='PriceAllData'),
    path('priceBitcoin/removeData/<str:date>', views.priceBitcoinRemove, name='PriceRemoveData'),
    path('saveDevBtc/<str:date>/<str:close>/<str:volume>', views.saveOneDevBtc, name='savedevelopmentbtc'),

    path('developmentBitcoin', views.developmentBtc, name='Development'),
    ]