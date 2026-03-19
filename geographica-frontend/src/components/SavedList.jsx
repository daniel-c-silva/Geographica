import { useState, useEffect } from "react"
import CountryCard from "./CountryCard"

function SavedList (){
    const[savedCountries, setSavedCountries] = useState([])

     useEffect(() => {
        fetch(`http://127.0.0.1:5000/saved`)
            .then(response => response.json()) 
            .then(data => setSavedCountries(data))
          }) // ! no [] means runs on every render — its fine, small proj. [] would mean run once on load. [props] would mean run when value changes. 
    
    return(
        <div>
          {savedCountries.map((country, index) => (
          <CountryCard key={index} data={country} />
        ))}
        </div> )

}
export default SavedList