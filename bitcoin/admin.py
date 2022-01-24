from django.contrib import admin
from bitcoin.models import Bitcoin
from bitcoin.models import DevelopmentBitcoin

class BitcoinAdmin(admin.ModelAdmin):
    pass
# Register your models here.
admin.site.register(Bitcoin)
admin.site.register(DevelopmentBitcoin)