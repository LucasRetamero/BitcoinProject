import requests
import json
import os
from django.conf import settings
from .models import Bitcoin
from .models import DevelopmentBitcoin
import time
import datetime

#Services
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

def getDevelopmentBtc():
  result = {}
  endpoint = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10'
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

def convertToTimeStamp(valueData):
  return int(time.mktime(datetime.datetime.strptime(valueData,"%d/%m/%Y").timetuple()))

#Get api with parameter on request
def githubUser(username):
   url = 'https://api.github.com/users/%s' % username
   response = requests.get(url)
   return response.json()
   
def savePriceBitcon(valDate, valPrice):
   b = Bitcoin(data=valDate, preco=valPrice)
   b.save()