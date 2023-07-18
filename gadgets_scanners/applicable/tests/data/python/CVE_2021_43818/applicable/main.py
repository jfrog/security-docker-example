from lxml.html import document_fromstring
from lxml.html.clean import Cleaner

_doc = document_fromstring(
    "<script>malignus script</script><b>bold text</b><i>italic text</i>"
)

cleaner = Cleaner(remove_unknown_tags=False)
cleaner.clean_html(_doc)

from lxml.html import clean
clean.Cleaner.clean_html(_doc)