from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.core import serializers
from django.conf import settings
from django.utils import timezone
from django.db.models import Func, F, Value, CharField, ExpressionWrapper
from .services import getPriceAndDatBitcoin
from .services import get_info
from .services import getValuesDbBitcoin
from .services import convertToTimeStamp
from .services import savePriceBitcon
from .services import getDevelopmentBtc
from .services import getDateCloseVolumeBitcoin
from .models import Bitcoin
import json
import requests
import datetime

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
  return priceBtcRequest(request)
 else: 
  dates = getPriceAndDatBitcoin("date")
  prices = getPriceAndDatBitcoin("price")
  context = {
   'dates':  json.dumps(dates),
   'prices': json.dumps(prices),
   'values': getValuesDbBitcoin(),
  }
  return render(request, 'priceBitcoin.html', context)
 
def priceBtcRequest(request):
  cr_date = datetime.datetime(int(request.GET['txtYear']), int(request.GET['txtMonth']), int(request.GET['txtDay']))
  my_datetime = request.GET['txtDay']+"/"+request.GET['txtMonth']+"/"+request.GET['txtYear']
  my_datetimeShow = cr_date.strftime("%d/%m/%Y")
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
   "dateValue": my_datetimeShow,
  }
  return render(request, 'priceBitcoin.html', context)

def priceBitcoinAllData(request):
 data = {
   'dataBtc' : serializers.serialize('json', Bitcoin.objects.all()),
   }
 #return JsonResponse(data)
 return HttpResponse(json.dumps(data), content_type="application/json")

def priceBitcoinRemove(request):
 valueDate = request.GET.get("date", None)
 Bitcoin.objects.filter(data=valueDate).delete() 
 data = {
   'deleted': True
 }
 return JsonResponse(data)

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




