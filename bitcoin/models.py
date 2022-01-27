from django.db import models

# Create your models here

class Bitcoin(models.Model):
    data = models.DateField()
    preco = models.DecimalField(max_digits=9, decimal_places=2)
    
    def __str__(self):
     return "{}-{}".format(self.data.strftime("%d-%m-%Y"), self.preco) 

class DevelopmentBitcoin(models.Model):
    data = models.DateField()
    ultimo = models.DecimalField(max_digits=9, decimal_places=2)
    volume = models.DecimalField(max_digits=9, decimal_places=2)
    
    def __str__(self):
     return "{}-{}-{}".format(self.data, self.ultimo, self.volume)
    