from flask import Flask, jsonify # * flask for the api
import requests # * requests for the api
import sqlite3 # * database
from flask_cors import CORS # *t his is used so the frontend can acess the backend.
import os # * used to get the port number from the environement var so it can work on render.com and locally as well.

app = Flask(__name__) # !the app using it to create routes and stuff
CORS(app) # * this is used so the frontend can acess the backend.

conn = sqlite3.connect("countries.db")
cursor = conn.cursor()


cursor.execute('''
       CREATE TABLE IF NOT EXISTS countries (
               flag TEXT,
               official_name TEXT,
               capital TEXT,
               population TEXT,
               languages TEXT,
               borders TEXT,
               name TEXT
               )
''')

conn.commit()
conn.close() 




@app.route("/")  #! when someone visits the main url run this "function"
def home():
    return "homepage"






def fetch_country_details(name): #!!!!! THIS IS THE (main) HELPER FUNCTION. IT IS USED BY EVERY OTHER FUNCTION SO THEY KNOW WHAT THE COUNTRY's VALUES ARE
    try:

        response = requests.get(f"https://restcountries.com/v3.1/name/{name}")
        data = response.json()[0]  #* [0] because the API returns a list of countries, we want the first one
     
        return  {
        "name": data["name"]["common"],
        "flag": data["flag"],
        "official_name": data["name"]["official"],
        "capital": data["capital"][0],
        "population": data["population"],
        "borders": data["borders"],
        "languages": list(data["languages"].values()),
       }

    except (KeyError, IndexError):
        return None    
    




@app.route("/country/<name>")
def country(name):
    try:
         data = fetch_country_details(name)

         if data is None: 
            return jsonify({"error": f"Country name not found!"})
     
         return jsonify(data)
    except Exception as erro:
        return jsonify({"error": str(erro)})





@app.route("/country/<name>/<name2>")
def compare_country(name, name2):
    try:
         c1 = fetch_country_details(name)
         c2 = fetch_country_details(name2)

         if c1 is None or c2 is None:
             return jsonify({"error": "At least one of two country name inputs are invalid!"})
         else:
             return jsonify({
                     "country1": c1,
                     "country2": c2
                   })
    except Exception as e:
        return jsonify({"error": str(e)})
   



@app.route("/country/save/<name>")
def save_country_data(name):
    try:
        data = fetch_country_details(name)
        
        if data is None:
            return jsonify({"error": f"Country not found"})
        else:
    #  gotta do a new connection to the database because the previous one was closed
            conn = sqlite3.connect("countries.db")
            cursor = conn.cursor()

            cursor.execute('''INSERT INTO countries (flag, official_name, capital, population, languages, borders, name)
            VALUES (?, ?, ?, ?, ?, ?, ?) ''',    
             (data["flag"], data["official_name"], data["capital"], data["population"], str(data["languages"]), str(data["borders"]), str(data["name"]))
                   )
            conn.commit()
            conn.close()

            return jsonify({"message": f"{name} saved!"})
    except Exception as erro:
        return jsonify ({"error": str(erro)})




@app.route("/saved")
def saved_country_data():
    
    #re open te connection again
    conn = sqlite3.connect("countries.db")
    cursor = conn.cursor()

    cursor.execute('''
     SELECT * FROM countries
''')
   
    saved_data = cursor.fetchall()
    conn.close()

    countries = []
    for i in saved_data:
        countries.append({
        "flag": i[0],
        "official_name": i[1],
        "capital": i[2],
        "population": i[3],
        "languages": i[4],
        "borders": i[5],
        "name": i[6]})

    return jsonify(countries)



@app.route("/delete")
def delete_data():
    conn = sqlite3.connect("countries.db")
    cursor = conn.cursor()

    cursor.execute('''DELETE FROM countries''')
  
    conn.commit()
    conn.close()
    return "Save was sucessfully deleted!"

@app.route("/delete/<name>")
def delete_country_data(name):
    conn = sqlite3.connect("countries.db")
    cursor = conn.cursor()

    cursor.execute('''DELETE FROM countries WHERE name = ?''', (name,))

    conn.commit()
    conn.close()
    return "Country save was sucessfully deleted!"
    


if __name__ == "__main__": 
   app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False) #! this is used to run the app. host


