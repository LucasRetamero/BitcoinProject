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
from .services import saveDevelopmentBitcoin
from .services import updateDevelopmentBitcoin
from .services import getDevelopmentBtc
from .services import getDateCloseVolumeBitcoin
from .models import Bitcoin
from .models import DevelopmentBitcoin
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
  if 'cbSaveDB' in request.GET:
   savePriceBitcon(request.GET['txtYear']+"-"+request.GET['txtMonth']+"-"+request.GET['txtDay'], valueBitcoin['BTC']['USD'])
  context = {
   'dates':  json.dumps(getPriceAndDatBitcoin("date")),
   'prices': json.dumps(getPriceAndDatBitcoin("price")),
   'values': getValuesDbBitcoin(),
   'valueByDate': get_info(request.GET['txtDay']+"/"+request.GET['txtMonth']+"/"+request.GET['txtYear']),
   'dateValue': cr_date.strftime("%d/%m/%Y"),
   'dateToSave': request.GET['txtYear']+"-"+request.GET['txtMonth']+"-"+request.GET['txtDay']
  }
  return render(request, 'priceBitcoin.html', context)

def priceBitcoinAllData(request):
 data = {
   'dataBtc' : serializers.serialize('json', Bitcoin.objects.all()),
   }
 return HttpResponse(json.dumps(data), content_type="application/json")

def priceBitcoinRemove(request):
 valueDate = request.GET.get("date", None)
 Bitcoin.objects.filter(data=valueDate).delete() 
 data = {
   'deleted': True
 }
 return JsonResponse(data)

def priceBitcoinSave(request):
 dataTosave = request.GET.get("year", None)+"-"+request.GET.get("month", None)+"-"+request.GET.get("day", None)
 if not Bitcoin.objects.all().filter(data=dataTosave).count():
  savePriceBitcon(dataTosave, request.GET.get("price", None))
  data = {
   'dayValue': request.GET.get("day", None),
   'monthValue': request.GET.get("month", None),
   'yearValue': request.GET.get("year", None),
   'saved': True
  }
  return JsonResponse(data)
 else:
  data = {
   'dayValue': request.GET.get("day", None),
   'monthValue': request.GET.get("month", None),
   'yearValue': request.GET.get("year", None),
   'priceValue': request.GET.get("price", None)
  }
  return JsonResponse(data)

def priceBitcoinUpdate(request):
  updateValue = Bitcoin.objects.get(data=request.GET.get("year", None)+"-"+request.GET.get("month", None)+"-"+request.GET.get("day", None))
  updateValue.preco = request.GET.get("price", None)
  updateValue.save()
  data = { 
   'dayValue': request.GET.get("day", None),
   'monthValue': request.GET.get("month", None),
   'yearValue': request.GET.get("year", None),
   'updated': True
  }
  return JsonResponse(data)
    
def priceBitcoinSearchPrice(request):
 data = {
  'dayPrice': request.GET.get('txtDay', None),
  'monthPrice': request.GET.get('txtMonth', None),
  'yearPrice': request.GET.get('txtYear', None),
  'valuePrice': get_info(request.GET.get('txtDay', None)+"/"+request.GET.get('txtMonth', None)+"/"+request.GET.get('txtYear', None))
 }
 return JsonResponse(data)

def priceBitcoinDateAllPrice(request):
 data = {
  'dates':  json.dumps(getPriceAndDatBitcoin("date")),
  'prices': json.dumps(getPriceAndDatBitcoin("price"))
 }
 return JsonResponse(data)
 
 
def developmentBtc(request):
  context = {
     'dates': json.dumps(getDateCloseVolumeBitcoin("date")),
     'closes': json.dumps(getDateCloseVolumeBitcoin("ultimo")),
     'volumes': json.dumps(getDateCloseVolumeBitcoin("volumes")),
     'allData': DevelopmentBitcoin.objects.all()
    }
  return render(request, 'developmentBitcoin.html',context)

def developmentBtcSearchApi(request):
 data = {
  'devPrice': getDevelopmentBtc(request.GET.get('toLimit'), request.GET.get('toTs'))
 }
 return JsonResponse(data)

def developmentBtcSaveAll(request):
 queryApi = getDevelopmentBtc(request.GET.get('toLimit'), request.GET.get('toTs'))
 for valuesDev in queryApi['Data']['Data']:
  if not DevelopmentBitcoin.objects.all().filter(data=datetime.date.fromtimestamp( int( valuesDev['time']) ) ).count():
   saveDevelopmentBitcoin(datetime.date.fromtimestamp( int( valuesDev['time'] ) ), valuesDev['close'], valuesDev['volumefrom'])
  else:
   updateDevelopmentBitcoin(datetime.date.fromtimestamp( int( valuesDev['time'] ) ), valuesDev['close'], valuesDev['volumefrom'])
 data = {
  'saved': True
 }
 return JsonResponse(data)  

def developmentBtcSave(request):
 if not DevelopmentBitcoin.objects.all().filter(data=request.GET.get('date')).count():
  saveDevelopmentBitcoin(request.GET.get('date'), request.GET.get('close'), request.GET.get('volume'))
 else:
  updateDevelopmentBitcoin(request.GET.get('date'), request.GET.get('close'), request.GET.get('volume'))
 data = {
  'saved': True
 }
 return JsonResponse(data)
 
def developmentBtcAllData(request):
 data = {
   'dataBtc' : serializers.serialize('json', DevelopmentBitcoin.objects.all()),
   }
 return HttpResponse(json.dumps(data), content_type="application/json")

def developmentBtcAllDataToGraphic(request):
 data = {
  'date': json.dumps(getDateCloseVolumeBitcoin("date")),
  'close': json.dumps(getDateCloseVolumeBitcoin("ultimo")),
  'volume': json.dumps(getDateCloseVolumeBitcoin("volume")),
  }
 return HttpResponse(json.dumps(data), content_type="application/json")

def developmentBtcRemove(request):
 DevelopmentBitcoin.objects.filter(data=request.GET.get("date", None)).delete() 
 data = {
   'deleted': True
 }
 return HttpResponse(json.dumps(data), content_type="application/json")
 
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




