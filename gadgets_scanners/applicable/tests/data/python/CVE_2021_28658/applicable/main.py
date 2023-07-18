from django.core.files.uploadhandler import FileUploadHandler

class MyHandler(FileUploadHandler):
    def __init__(self):
        self.file1 = self.file_name