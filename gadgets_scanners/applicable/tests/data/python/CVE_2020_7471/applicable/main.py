from django.contrib.postgres.aggregates import StringAgg

TestModel.objects.aggregate(result=StringAgg('field1', delimiter=';'))