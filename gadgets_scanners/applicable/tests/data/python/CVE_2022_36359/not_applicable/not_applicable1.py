from deposit.declaration import get_declaration_pdf
from deposit.models import DepositRecord
from django.core.exceptions import PermissionDenied
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from django.utils.translation import ugettext as _


def get(request, pk):
    """
    We test if the user is the user that own the deposit and return a PDF file if the repository specifies this
    """
    dr = get_object_or_404(
        DepositRecord.objects.select_related("paper", "repository", "user", "license"),
        pk=pk,
    )

    if dr.user != request.user:
        raise PermissionDenied
    if dr.repository.letter_declaration is not None and dr.status == "pending":
        pdf = get_declaration_pdf(dr)
        pdf.seek(0)
        filename = _("Declaration {}.pdf").format(dr.paper.title)
        return FileResponse(pdf, filename=filename)
    else:
        raise Http404(_("No pdf found for dr {}".format(dr.pk)))
