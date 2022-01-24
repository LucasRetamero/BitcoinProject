from django.shortcuts import render
from .services import getPriceAndDatBitcoin
from .services import get_info
from .services import getValuesDbBitcoin
from .services import convertToTimeStamp
from .services import savePriceBitcon
from .services import getDevelopmentBtc
from .services import getDateCloseVolumeBitcoin
from django.http import JsonResponse
from django.http import HttpResponse
from .models import Bitcoin
import json
import requests
import datetime
from django.conf import settings


#View
def home(request):
  context  = {
  'dates':  json.dumps(getPriceAndDatBitcoin("date")),
  'prices': json.dumps(getPriceAndDatBitcoin("price")),
  'datesDev': json.dumps(getDateCloseVolumeBitcoin("date")),
  'closesDev': json.dumps(getDateCloseVolumeBitcoin("ultimo")),
  'volumesDev': json.dumps(getDateCloseVolumeBitcoin("volume")),
  }
  #return HttpResponse(json.dumps(endpoint), content_type="application/json")
  return render(request, 'index.html', context)


def priceBitcoin(request):
 if 'txtYear' in request.GET:
  my_datetime = request.GET['txtDay']+"/"+request.GET['txtMonth']+"/"+request.GET['txtYear']
  valueBitcoin = get_info(my_datetime)
  dates = getPriceAndDatBitcoin("date")
  prices = getPriceAndDatBitcoin("price")
  if 'cbSaveDB' in request.GET:
   savePriceBitcon(request.GET['txtYear']+"-"+request.GET['txtMonth']+"-"+request.GET['txtDay'], valueBitcoin['BTC']['USD'])
  context = {
   'dates':  json.dumps(dates),
   'prices': json.dumps(prices),
   'values': getValuesDbBitcoin(),
   'valueByDate': valueBitcoin,
   "dateValue": my_datetime,
  }
  return render(request, 'priceBitcoin.html', context)
 else: 
  dates = getPriceAndDatBitcoin("date")
  prices = getPriceAndDatBitcoin("price")
  context = {
   'dates':  json.dumps(dates),
   'prices': json.dumps(prices),
   'values': getValuesDbBitcoin(),
  }
  return render(request, 'priceBitcoin.html', context)
 
  #return HttpResponse(json.dumps(get_info()), content_type="application/json")

def developmentBtc(request):
 if 'valTime' in request.POST:
  return HttpResponse(json.dumps(request.POST['valTime']), content_type="application/json")
 else:
  context = {
     'dates' : json.dumps(getDateCloseVolumeBitcoin("date")),
     'closes' : json.dumps(getDateCloseVolumeBitcoin("ultimo")),
     'volumes' : json.dumps(getDateCloseVolumeBitcoin("volumes")),
     'valueDev' : getDevelopmentBtc(),
    }
  return render(request, 'developmentBitcoin.html',context)
 
def gitHubPage(request):
 if 'username' in request.GET:
  user = githubUser(request.GET['username'])
  return render(request, 'index.html', {
        'user': user
    })
 else: 
   return render(request, 'index.html', {
        'msgValidation': 'Write a name up to seach the username'
    })

def saveOneDevBtc(request, date, close, volume):
  context = {
   'date': date,
   'close': close,
   'volume': volume,
  }
  return HttpResponse(json.dumps(context), content_type="application/json")  




