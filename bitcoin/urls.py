from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='Home'),
    path('priceBitcoin', views.priceBitcoin, name='Price'),
    path('priceBitcoin/allData', views.priceBitcoinAllData, name='PriceAllData'),
    path('priceBitcoin/removeData/', views.priceBitcoinRemove, name='PriceRemoveData'),
    path('priceBitcoin/saveData/', views.priceBitcoinSave, name='PriceSaveData'),
    path('saveDevBtc/<str:date>/<str:close>/<str:volume>', views.saveOneDevBtc, name='savedevelopmentbtc'),
    path('developmentBitcoin', views.developmentBtc, name='Development'),
    ]