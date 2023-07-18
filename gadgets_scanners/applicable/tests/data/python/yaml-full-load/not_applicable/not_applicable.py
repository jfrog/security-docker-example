import yaml

with open('example.yaml') as f:
    data = yaml.load(f, Loader=yaml.SafeLoader)
    print(data)