import json
import requests

country_names = ["Portugal", "Spain", "Italy"]
countries = []


for name in country_names:
    response = requests.get(f"https://restcountries.com/v3.1/name/{name}")
    data = response.json()
    countries.append(data[0])



# write to file
with open("data.json", "w") as file:
    json.dump(countries, file)

# read from file
with open("data.json", "r") as file:
    countries = json.load(file)

for i in countries:
    print(i) 