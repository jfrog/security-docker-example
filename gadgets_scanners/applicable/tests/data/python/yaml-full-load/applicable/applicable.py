import yaml

with open("test.yaml") as f:
    data = yaml.full_load(f)
    print(data)