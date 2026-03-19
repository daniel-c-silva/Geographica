import requests
import sys
import sqlite3

conn = sqlite3.connect("countries.db")
cursor = conn.cursor()


cursor.execute('''
  
     CREATE TABLE IF NOT EXISTS favo (
               flag TEXT,
               official_name TEXT,
               capital TEXT,
               population TEXT,
               languages TEXT,
               borders TEXT,
               currency_name TEXT,
               currency_symbol TEXT
               )
''')

conn.commit()

def fetch_country(country_name):
    response = requests.get(f'https://restcountries.com/v3.1/name/{country_name}')
    country = response.json()[0]
    currency = list(country["currencies"].values())[0]
    
    return {
        "flag": country["flag"],
        "official_name": country["name"]["official"],
        "capital": country["capital"][0],
        "population": country["population"],
        "languages": list(country["languages"].values()),
        "borders": country["borders"],
        "currency_name": currency["name"],
        "currency_symbol": currency["symbol"]
    }




def info_country(country_name):
    c = fetch_country(country_name)
    print(f"Flag: {c['flag']}")
    print(f"Official name: {c['official_name']}")
    print(f"Capital: {c['capital']}")
    print(f"Population: {c['population']}")
    print("Languages:")
    for language in c['languages']:
        print(f"- {language}")
    print("Borders:")
    for border in c['borders']:
        print(f"- {border}")
    print(f"Currency: {c['currency_name']} {c['currency_symbol']}")




def save_country_data(country):
    country = fetch_country(country)
    cursor.execute('''
     INSERT INTO favo (flag, official_name, capital, population, languages, borders, currency_name, currency_symbol) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
''', (country["flag"], country["official_name"], country["capital"], country["population"], str(country["languages"]), str(country["borders"]), country["currency_name"], country["currency_symbol"]))
    conn.commit()
    
def saved_country_data():
    cursor.execute("SELECT * FROM favo")
    saved_data = cursor.fetchall()
    for data in saved_data:
        print(data)
    
def compare_country(country_name2):
    c = fetch_country(sys.argv[2])
    c2 = fetch_country(country_name2)


    print(f"Flag: {c['flag']} / {c2['flag']} ")
    print(f"Official name: {c['official_name']} / {c2['official_name']} ")
    print(f"Capital: {c['capital']} / {c2['capital']} ")
    print(f"Population: {c['population']} / {c2['population']} ")
    print("Languages:")
    for language in c['languages']:
        print(f"- {language} / {c2['languages']} ")
    print("Borders:")
    for border in c['borders']:
        print(f"- {border} / {c2['borders']} ")
    print(f"Currency: {c['currency_name']} {c['currency_symbol']} / {c2['currency_name']} {c2['currency_symbol']} ")
    



if sys.argv[1] == "info":
    info_country(sys.argv[2])
elif sys.argv[1] == "save":
    save_country_data(sys.argv[2])
elif sys.argv[1] == "saved":
     saved_country_data()
elif sys.argv[1] == "compare": 
        compare_country(sys.argv[3])    