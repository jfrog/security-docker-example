from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

class Publisher(models.Model):
    name = models.CharField(max_length=300)

class Book(models.Model):
    name = models.CharField(max_length=300)
    pages = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField()
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    pubdate = models.DateField()

class Store(models.Model):
    name = models.CharField(max_length=300)
    books = models.ManyToManyField(Book)


# Based on:
# https://docs.djangoproject.com/en/4.0/topics/db/aggregation/
# https://docs.djangoproject.com/en/4.0/ref/models/querysets/

from django.db.models import Count
from django.db.models import Avg

# Not applicable: case 1
Book.objects.annotate(Count('authors'), Count('store'))

# Not applicable: case 2
Book.objects.all().aggregate(Avg('price'))

# Not applicable: case 3
Store.objects.extra()
