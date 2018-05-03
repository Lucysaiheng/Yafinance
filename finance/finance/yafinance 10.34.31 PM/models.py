from django.db import models


class Company(models.Model):


    name = models.CharField(max_length=100)
    cid = models.CharField(max_length=100)
    url = models.CharField(max_length=100, blank=True, null=True)
    region =models.CharField(max_length=100, blank=True, null=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    longtitude = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    previous_close = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)
    copen = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bid = models.CharField(unique=False, max_length=50, blank=True, null=True)
    ask = models.CharField(unique=False, max_length=50, blank=True, null=True)
    volume = models.IntegerField(blank=True, null=True)
    avgvolume = models.IntegerField(blank=True, null=True)
    market_cap = models.CharField(unique=False, max_length=50, blank=True, null=True)
    EPS = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    day_min = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    day_max = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    week_min = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    week_max = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)

    #class Meta(object):
        #ordering =('cid','name')

    def get_absolute_url(self):
        return "/company/%i/" % self.id


    def __str__(self):
        return U'%s' %(self.name)


    def to_json(self):
        return{

            "name": self.name,
            "copen":self.copen,
            "latitude":self.latitude,
            "longtitude":self.longtitude,
            "url":self.url
        }











