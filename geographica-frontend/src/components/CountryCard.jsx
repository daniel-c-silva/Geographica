function CountryCard({ data }) //! MADE TO REPLACE CONSTANTLY WRITING COUNTRY DETAILS LINE BY LINE IN SEARCHBAR.JSX DISPLAY PART
{
return(
   <div>
     <p>{data.flag} {data.official_name}</p>
     <p>Capital: -{data.capital}</p>
     <p>Population: -{data.population}</p>
     
     
     <p>Languages:</p>
     {/* * if languages is a real array (list(theres more than 1 or 0)) use map, if its a string (saved countries) just display it (Asked Claude for help cuz I was Stuck) */}
     {Array.isArray(data.languages) 
         ? data.languages.map((lang) => <p>-{lang}</p>) //! if its an array map through it and display each language, if not just display the string ? means its an array
         : <p>{data.languages}</p> //! if its not an array just display it, its a string in this case so it will work fine : means its a string
     }
     <p>Borders:</p>
     {/* * same fix for borders */}
     {Array.isArray(data.borders) 
         ? data.borders.map((border) => <p>-{border}</p>)
         : <p>{data.borders}</p>
     }
     <p>Currencies:</p>

     <p>Currency name:</p>
    {Array.isArray(data.currency_name)
        ? data.currency_name.map((name) => <p>-{name}</p>)
        : <p>{data.currency_name}</p>
    }

     <p>Currency Symbol:</p>
     {Array.isArray(data.currency_symbol)
        ? data.currency_symbol.map((symbol) => <p>-{symbol}</p>)
        : <p>{data.currency_symbol}</p>
     }



   </div>)
}

export default CountryCard