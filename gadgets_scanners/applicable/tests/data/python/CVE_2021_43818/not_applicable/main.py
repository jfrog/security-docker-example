from lxml.html import document_fromstring
from lxml.html.clean import Cleaner

_doc = document_fromstring(
    "<script>malignus script</script><b>bold text</b><i>italic text</i>"
)

from lxml.html import clean
