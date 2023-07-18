import yaml

with open("test.yaml") as f:
    data = yaml.load(f, Loader=yaml.FullLoader)
    data = yaml.load(f, Loader=yaml.SafeLoader)
    print(data)