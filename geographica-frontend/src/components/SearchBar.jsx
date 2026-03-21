import { useState } from 'react';
import CountryCard from "./CountryCard.jsx";
import SavedList from "./SavedList.jsx";
 
function SearchBar() {
    // * use state to stor the query the user is typing in searchbar, set query - function that updates the query.
    const[query, setQuery] = useState("") 
    // * same use but used to compare countries
    const[query2, setQuery2] = useState("") 
    const[deleteCountry, setDeleteCountry] = useState("")
    // * use state to store the country data that we get back from the backend, setCountryData - function that updates the country data.
    const[countryData, setCountryData] = useState(null) 
    // * same shit
    const[compareCountry, setCompareCountry] = useState(null) 
    // * bollean kind starts showsavedlist as false
    const[showSavedList, setShowSavedList] = useState(false) 
 
    function handleSearch() { // ! call when user clicks search button
      setCompareCountry(null)
      // ! Fetch the country with (query) as input for name in the app.py route @("/country/<name>") then send the response down.
      fetch(`${process.env.REACT_APP_API_URL}/country/${query}`) 
         .then(response => response.json()) // * wait for it to happen, recieve it, THEN name it response and convert it to json
         .then(data => setCountryData(data) ) // * THEN recieve the json and name it data, then set the country data (it being null) to the data we got back from the backend.
      }

 
    function handleCompare() { // ! call when clicks compare button
      // ! Fetch the response return from app.py's route @(/country/<name>/<name2>) then send the rsponse down
      fetch(`${process.env.REACT_APP_API_URL}/country/${query}/${query2}`) 
         .then(response => response.json()) // * wait for it to happen, get it, HTEN name it response and convert it to json like in the previous function send it down 
         .then(data => setCompareCountry(data)) // * recieve it and name it data THEN take its value and give it to the country compare.
     }

 
     function handleSave() { // ! call when clicks save button
      // ! send a signal to app.py's route @(/country/save/<name>) with the countries name
      fetch(`${process.env.REACT_APP_API_URL}/country/save/${query}`) 
     }
 
    function handleDeleteList() { // ! call when clicks delete save button
         fetch(`${process.env.REACT_APP_API_URL}/delete`)
     }
 
     function handleDeleteCountry() {
         fetch(`${process.env.REACT_APP_API_URL}/delete/${deleteCountry}`)
     }
 
  return(
      <div className="container">
         {/* ? Top controls row */}
         <div className="controls">
           {/* ? Left group - search and compare on SAME ROW */}
           <div className="left-group">
             
             {/* * Input and button for search function*/}
             <div className="input-row">
               <input 
                 className='Input'
                 id='search_input'
                 type="text"
                 value={query}
                 onChange={(userTyped) => setQuery(userTyped.target.value)} //! on change means when something is happening/changing,
                 placeholder="Search for a country!"
               />
               <button className="Button" id="search-button" onClick={handleSearch}>Search</button>   {/* ! call the function handleSearch on click */}
             </div>
 
             {/* * Input and button for compare function*/}
             <div className="input-row">
               <input 
                 id='compare_input'
                 className='Input'
                 type="text"
                 value={query2}
                 onChange={(userTyped) => setQuery2(userTyped.target.value)} //! on change means when something is happening/changing,
                 placeholder="Compare with:"
               />
               <button className="Button" id="compare-button" onClick={handleCompare}>Compare</button> {/* ! call the function handleCompare on click */}
             </div>
 
             {/* * Input and button for delete country function*/}
             <div className="input-row">
               <input type="text" 
               id='delete_country_input'
               className='Input'
               value={deleteCountry}
               onChange={(userTyped) => setDeleteCountry(userTyped.target.value)} // ! update the query's value
               placeholder="Delete country from save:"
               />
               <button className="Button" id="delete-country-button" onClick={handleDeleteCountry}>Delete Country</button> {/* ! on click delete country using handledeletecountry function*/ }
             </div>
           </div>
 
           {/* ? Right group - save, saved list, delete all */}
           <div className="right-group">
             {/* * button for save function */}
             <button className="Button" id="save-button" onClick={handleSave}>Save info</button> 
             
             <div className="utility-buttons">
                {/* * button that shows save list using if */}
                <button className="Button" id="saved-button" onClick={() => setShowSavedList(!showSavedList)}>Saved list</button> {/* ! on click flick the current state of show saved to not show saved (it started as false)*/}
                
                {/* * button for delete all function */}
                <button className="Button" id='delete-all-button' onClick={handleDeleteList}>Delete Save</button>
             </div>
           </div>
         </div>
 
         {/* ? Output section - displays BELOW controls */}
         <div className="output-section">
            
           {/* * if showed list true show saved list */}
           {showSavedList && <SavedList/>}
 
           {/* ? and not compare country because if we got compare country we will priorize showing that instead of a single country's data */}
           {countryData && !compareCountry && !showSavedList && (
             <CountryCard data={countryData}/>
           )}
 
           {compareCountry && !showSavedList && (
             <div className="compare-results">
               <div>
                 <CountryCard data={compareCountry.country1}/> 
               </div>
               <div>
                 <CountryCard data={compareCountry.country2}/>
               </div>
             </div>
           )}
         </div>
      </div>
      )
}
 
export default SearchBar