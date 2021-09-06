import { useState } from "react";
import Header from "./components/Header";

export default function App() {

const [userInput, setUserInput] = useState()

const [breweriesData, setBreweriesData] = useState([]); 

const [selectStateInput, setSelectStateInput] = useState([]);
 
const [cities, setCities] = useState([]);
 
const [filter, setFilter] = useState({filter: "", city: [], search: "" })
 
console.log("Inside state: ", userInput, breweriesData, selectStateInput, cities, filter)

 function fetchBreweries () {
  fetch(
        `https://api.openbrewerydb.org/breweries?by_state=${userInput}&per_page=50`
      )
        .then((res) => res.json())
        .then((breweriesData) => {
          console.log("Inside breweriesData: ", breweriesData);
    
          setBreweriesData(breweriesData);
          setCities(breweriesData)
  });
 }

 const handleUserInput = (event) => { 
  setUserInput(event.target.value)
}

 const handleSubmit = (event) => {
  event.preventDefault()
  fetchBreweries()
 }

 function handleFilterByTypeValue (event) {  
  console.log(event.target.value)
 }


  return (
    <>
      <Header
      userInput={userInput}
      handleSubmit={handleSubmit}
      handleUserInput={handleUserInput}
       />
      <main>

      <aside className="filters-section">  
          <h2>Filter By:</h2>  
          <form id="filter-by-type-form" autocompete="off">
            <label for="filter-by-type"><h3>Type of Brewery</h3></label>
            <select onChange={handleFilterByTypeValue} name="filter-by-type" id="filter-by-type">
              <option value="">Select a type...</option>
              <option value="micro">Micro</option>
              <option value="regional">Regional</option>
              <option value="brewpub">Brewpub</option>
            </select>
          </form>
          <div className="filter-by-city-heading">
          <h3>Cities</h3>
          <button className="clear-all-btn">clear all</button>
          </div>                    
          {cities.map(item => {
            return(
          <form id="filter-by-city-form">         
          <input type="checkbox" name= {item.city} value= {item.city}/>
          <label htmlFor= {item.city} > {item.city} </label> 
          </form>       
            )
          })
          }                  
      </aside>

      <h1>List of Breweries</h1>
      <header className="search-bar">
        <form id="search-breweries-form" autocomplete="off">
          <label for="search-breweries"><h2>Search breweries:</h2></label>
          <input id="search-breweries" name="search-breweries" type="text" />
        </form>
      </header>
      <article>
        <ul className="breweries-list">
          {breweriesData.map(brewery => {
            console.log("Inside Brewery: ", brewery)
           return(
              <li>
              <h2>{brewery.name}</h2>
              <div className="type">{brewery.brewery_type}</div>
              <section className="address">
                <h3>Address:</h3>
                <p>{brewery.street}</p>
                <p>
                  <strong>
                    {brewery.city}, {brewery.postal_Code}
                  </strong>
                </p>
              </section>
              <section className="phone">
                <h3>Phone:</h3>
                <p>{brewery.phone}</p>
              </section>
              <section className="link">
                <a href={brewery.website_url} target="_blank">
                  Visit Website
                </a>
            </section>
          </li>
           )
         })
         }         
        </ul>
      </article>         
      </main>
    </>
  );
}
