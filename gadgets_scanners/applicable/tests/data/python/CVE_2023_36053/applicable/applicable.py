from django import forms


class CommentForm(forms.Form):
    name = forms.CharField(label="Your name")
    email = forms.EmailField()
    url = forms.URLField(label="Your website", required=False)
    comment = forms.CharField()


f = CommentForm(auto_id=False)
