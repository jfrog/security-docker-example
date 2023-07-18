import subprocess

domain = "google.com"

subprocess.run('nslookup {}'.format(domain), shell=True)
