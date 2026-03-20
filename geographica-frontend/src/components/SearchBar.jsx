import { useState } from 'react';
import CountryCard from "./CountryCard.jsx";
import SavedList from "./SavedList.jsx";



function SearchBar() {
    const[query, setQuery] = useState("") // * use state to stor the query the user is typing in searchbar, set query - function that updates the query.
    const[query2, setQuery2] = useState("") // * same use but used to compare countries
    const[deleteCountry, setDeleteCountry] = useState("")
    const[countryData, setCountryData] = useState(null) // * use state to store the country data that we get back from the backend, setCountryData - function that updates the country data.
    const[compareCountry, setCompareCountry] = useState(null) // * same shit
    const[showSavedList, setShowSavedList] = useState(false) // * bollean kind starts showsavedlist as false

    function handleSearch() { // ! call when user clicks search button
      setCompareCountry(null)
      fetch(`${process.env.REACT_APP_API_URL}/country/${query}`) // ! Fetch the country with (query) as input for name in the app.py route @("/country/<name>") then send the response down.
         .then(response => response.json()) // * wait for it to happen, recieve it, THEN name it response and convert it to json
         .then(data => setCountryData(data) ) // * THEN recieve the json and name it data, then set the country data (it being null) to the data we got back from the backend.
      }

     function handleCompare() { // ! call when clicks compare button
      fetch(`${process.env.REACT_APP_API_URL}/country/${query}/${query2}`) // ! Fetch the response return from app.py's route @(/country/<name>/<name2>) then send the rsponse down
         .then(response => response.json()) // * wait for it to happen, get it, HTEN name it response and convert it to json like in the previous function send it down 
         .then(data => setCompareCountry(data)) // * recieve it and name it data THEN take its value and give it to the country compare.

     }

     function handleSave() { // ! call when clicks save button
      fetch(`${process.env.REACT_APP_API_URL}/country/save/${query}`) //! send a signal to app.py's route @(/country/save/<name>) with the countries name
         
     }

     function handleDeleteList() { // ! call when clicks delete save button
         fetch(`${process.env.REACT_APP_API_URL}/delete`)
     }

     function handleDeleteCountry() {
         fetch(`${process.env.REACT_APP_API_URL}/delete/${deleteCountry}`)
     }




  return(
      <div>
         {/* * Input and button for search function*/}
         <input 
         className='Input'
         id='search_input'
         type="text"
         value={query}
         onChange={(userTyped) => setQuery(userTyped.target.value)} //! on change means when something is happening/changing,
         placeholder="Search for a country!"
         />

         <button className="Button" id="search-button" onClick={handleSearch}> Search </button>       {/* ! call the function handleSearch on click */}


         {/* * button for save function */}
         <button className="Button" id="save-button" onClick={handleSave}> Save info </button>    {/* ! call the function handleSave on click */}
         

         {/* * Input and button for compare function*/}
         <input 
         id='compare_input'
         className='Input'
         type="text"
         value={query2}
         onChange={(userTyped) => setQuery2(userTyped.target.value)} //! on change means when something is happening/changing,
         placeholder="Compare with:"
         />

         <button className="Button" id="compare-button" onClick={handleCompare}> Compare </button>       {/* ! call the function handleCompare on click */}
 

         { /* * button that shows save list using if */}
         <button className="Button" id="saved-button" onClick={() => setShowSavedList(!showSavedList)}> Saved list </button>  {/* ! on click flick the current state of show saved to not show saved (it started as false)*/}
         {showSavedList && <SavedList/>} {/* * if showed list true show saved list */}

         {/* * button for delete all function */}
         <button className="Button" id='delete-all-button' onClick={handleDeleteList}> Delete Save </button>
         
         {/* * Input and button for delete country function*/}
         <input type="text" 
         id='delete_country_input'
         className='Input'
         value={deleteCountry}
         onChange={(userTyped) => setDeleteCountry(userTyped.target.value)} // ! update the query's value
         placeholder = "Delete country from save:"
         />

         <button className="Button" id="delete-country-button" onClick={handleDeleteCountry}> Delete Country </button> {/* ! on click delete country using handledeletecountry function*/ }


         {countryData && ! compareCountry && !showSavedList &&( // ? and not compare country because if we got compare country we will priorize showing that instead of a single country's data
          
             <CountryCard data={countryData}/>
         )}

        {compareCountry && !showSavedList &&(
            
            <div>
              <CountryCard data={compareCountry.country1}/> 
              <CountryCard data={compareCountry.country2}/>
            </div>
         )}

         

      </div>
      )
}

export default SearchBar 
