import requests
import sys


country_name = sys.argv[1]
response = requests.get(f'https://restcountries.com/v3.1/name/{country_name}')
#?That one line fetches whatever that URL returns. Same thing your browser does when you visit a website, but from Python.

data = response.json()
country = data[0]
region = country["region"]
population = country["population"]
languages = country["languages"]
official_name = country["name"]["official"]
currency = country["currencies"]
borders = country["borders"]
flags = country["flag"]

print(f"Region: {region}")
print(f"Population: {population}")
print(f"Official Name: {official_name}")
print(f"Flags: {flags}")

print("Languages:")
for language in languages.values():
    print(f"- {language}")

for curre in currency.values():
    print(f"Currency Name: {curre['name']}")
    print(f"Currency Symbol: {curre['symbol']}")

print("Borders:")
for border in borders:
    print(f"- {border}")

