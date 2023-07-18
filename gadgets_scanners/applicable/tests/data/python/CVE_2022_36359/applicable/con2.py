from django.http import FileResponse

# 
# CASE 2
# 

def get_file_response(filepath):
    response = FileResponse(open(filepath, "rb"), as_attachment=True)
    return response
