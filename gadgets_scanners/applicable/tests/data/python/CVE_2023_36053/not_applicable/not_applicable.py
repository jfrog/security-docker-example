from django import forms


class CommentForm(forms.Form):
    name = forms.CharField(label="Your name")
    comment = forms.CharField()


f = CommentForm(auto_id=False)
