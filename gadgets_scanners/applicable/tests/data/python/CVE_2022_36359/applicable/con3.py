from django.http import FileResponse

# 
# CASE 3
# 

def get_file_response(filepath):
    response = FileResponse(as_attachment=True)
    response.set_headers(filelike=open(filepath, "rb"))
    return response
