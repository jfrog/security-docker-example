import requests

session = requests.Session()
session.get("https://google.com", verify=False)
