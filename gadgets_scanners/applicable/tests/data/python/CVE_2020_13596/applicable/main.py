from django.contrib.admin.widgets import ForeignKeyRawIdWidget

products = forms.ModelMultipleChoiceField(Product.objects, widget=ForeignKeyRawIdWidget(GroupProduct._meta.get_field('products').rel))