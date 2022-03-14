import requests
import json
import os
from django.conf import settings
from .models import Bitcoin
from .models import DevelopmentBitcoin
import time
import datetime

# --------- API Call ---------------
def get_info(valueData):
  result = {}
  endpoint = 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=%s' % convertToTimeStamp(valueData)
  headers = {'authorization': settings.CRYPTOCOMPATE_APP_KEY}
  response = requests.get(endpoint, headers=headers)
  if response.status_code == 200:  # SUCCESS
    result = response.json()
    result['success'] = True
  else:
    result['success'] = False
    if response.status_code == 404:  # NOT FOUND
     result['message'] = 'NoT found'
    else:
     result['message'] = 'The CryptoCompate API is not available at the moment.'
  return result

def getDevelopmentBtc(toLimit, toTs):
  result = {}
  endpoint = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=%s&toTs=%s' % (toLimit,convertToTimeStamp(toTs))
  headers = {'authorization': settings.CRYPTOCOMPATE_APP_KEY}
  response = requests.get(endpoint, headers=headers)
  if response.status_code == 200:  # SUCCESS
    result = response.json()
    result['success'] = True
  else:
    result['success'] = False
    if response.status_code == 404:  # NOT FOUND
     result['message'] = 'NoT found'
    else:
     result['message'] = 'The CryptoCompate API is not available at the moment.'
  return result

# --------- DATABASE Call ---------------  
def getPriceAndDatBitcoin(option):
   queryset = Bitcoin.objects.all()
   if option == "date":
    return [str(obj.data) for obj in queryset]
   else:
    return [int(obj.preco) for obj in queryset]

def getDateCloseVolumeBitcoin(option):
  queryset = DevelopmentBitcoin.objects.all()
  if option == "date":
   return [str(obj.data) for obj in queryset]
  elif option == "ultimo":
   return [int(obj.ultimo) for obj in queryset]
  else:
   return [int(obj.volume) for obj in queryset]
   
def getValuesDbBitcoin():
  return Bitcoin.objects.all()

def savePriceBitcon(valDate, valPrice):
   b = Bitcoin(data=valDate, preco=valPrice)
   b.save()
 
def updatePriceBitcon(valueDate, valuePrice):
   updateBitcoin = Bitcoin.objects.get(data=valueDate)
   updateBitcoin.preco = valuePrice
   updateBitcoin.save()

def saveOrUpdatePriceBitcoin(valueDate, valuePrice):
 if not Bitcoin.objects.all().filter(data=valueDate).count():
   return savePriceBitcon(valueDate, valuePrice)
 else:
   return updatePriceBitcon(valueDate, valuePrice) 
 
def saveDevelopmentBitcoin(valDate, valClose, valVolume):
 s = DevelopmentBitcoin(data=valDate, ultimo=valClose, volume=valVolume)
 s.save()

def updateDevelopmentBitcoin(valDate, valClose, valVolume):
  updateValue = DevelopmentBitcoin.objects.get(data=valDate)
  updateValue.ultimo = valClose
  updateValue.volume = valVolume
  updateValue.save()
  
# -------- Convert input ----------
  
def convertToTimeStamp(valueData):
  return int(time.mktime(datetime.datetime.strptime(valueData,"%d/%m/%Y").timetuple()))
   