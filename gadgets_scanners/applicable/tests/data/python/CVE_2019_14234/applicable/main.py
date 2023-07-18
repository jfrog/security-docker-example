from django.db.models import Q

your_filters = {
'field_1': 1,
'field_2': 2,
}

data = Model.objects.filter(**your_filters)