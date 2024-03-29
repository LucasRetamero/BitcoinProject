from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='Home'),
    path('priceBitcoin', views.priceBitcoin, name='Price'),
    path('priceBitcoin/allData', views.priceBitcoinAllData, name='PriceAllData'),
    path('priceBitcoin/removeData/', views.priceBitcoinRemove, name='PriceRemoveData'),
    path('priceBitcoin/saveData/', views.priceBitcoinSave, name='PriceSaveData'),
    path('priceBitcoin/updateData/', views.priceBitcoinUpdate, name='PriceUpdateData'),
    path('priceBitcoin/searchPriceBitcoin/', views.priceBitcoinSearchPrice, name='PriceSearchData'),
    path('priceBitcoin/GetAllDataGraph/', views.priceBitcoinDateAllPrice, name='PriceAllDataGraph'),
    path('saveDevBtc/<str:date>/<str:close>/<str:volume>', views.saveOneDevBtc, name='savedevelopmentbtc'),
    path('developmentBitcoin', views.developmentBtc, name='Development'),
    path('developmentBitcoin/allData/', views.developmentBtcAllData, name='DevelopmentAllData'),
    path('developmentBitcoin/allDataToGraphic/', views.developmentBtcAllDataToGraphic, name='DevelopmentAllDataToGraphic'),
    path('developmentBitcoin/searchDevelopment/', views.developmentBtcSearchApi, name='DevelopmentSearchApi'),
    path('developmentBitcoin/savelAllDevelopment/', views.developmentBtcSaveAll, name='DevelopmentSaveAll'),
    path('developmentBitcoin/savelDevelopment/', views.developmentBtcSave, name='DevelopmentSave'),
    path('developmentBitcoin/removeDevelopment/', views.developmentBtcRemove, name='DevelopmentRemove'),
    ]