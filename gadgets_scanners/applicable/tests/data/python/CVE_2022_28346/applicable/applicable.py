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

# Applicable: case 1
Publisher.objects.annotate(num_books=Count('book'))

# Applicable: case 2
Book.objects.aggregate(average_price=Avg('price'))

# Applicable: case 3
Store.objects.extra(select={'is_recent': "pub_date > '2006-01-01'"})
