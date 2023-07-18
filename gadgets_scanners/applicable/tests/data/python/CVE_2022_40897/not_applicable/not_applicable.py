from setuptools.package_index import PackageIndex
import requests

# Specify the URL of the package page on PyPI
url = "https://pypi.org/project/requests"

# Use the requests library to retrieve the HTML content of the package page
response = requests.get(url)

# Create an instance of the PackageIndex class
index = PackageIndex()

# # Use the find_external_links function to find external links for the package
# links = index.find_external_links(url, response.text)

# # Print the name and URL of each external link
# for link_name, link_url in links:
#     print(f"{link_name}: {link_url}")
