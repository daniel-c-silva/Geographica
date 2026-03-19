# Geographica

**Ditch Google, ask Geographica.**

## Features

* Search for any country and get detailed info
* Compare two countries side-by-side
* Save favourite countries to a local database
* Delete saved countries

## Tech Stack
```
- **Frontend:** React, JSX, CSS
- **Backend:** Python (Flask), SQLite
- **API:** REST Countries API
```

## Live Demo

[https://geographica-brown.vercel.app](https://geographica-brown.vercel.app)


## How to Run Locally

Prerequisites: Python 3.8+, Node.js, npm

### Backend Setup
```
cd geographica-backend
pip install -r requirements.txt (it will prob have one by then)

# run the flask sv:

python app.py => on Windows/Linux
python3 app.py => on macOS
```

### Frontend Setup
```
cd geographica-frontend
npm install
npm start
```

## Conclusion

After awhile without pushing any new projects, I took a step back from AI integration and decided on learning Sqlite database. I implemented it using a CRUD format (Create, Read, Update, Delete), all features present in this project. I found difficulties at start because syntax seemed unnatural to me, most likely due to sqlite being old and reading like english. I had to wire my brain in. It was also challenging to pass data into it and retrieve it at first, but it grew on me quickly.
```
cursor.execute(), conn.commit(), conn.close()
```

are all pretty intuitive. That being said, with my new found knowledge I now believe I could improve older projects such as C-neBot by implementing user favourites for example.
