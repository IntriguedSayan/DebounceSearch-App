import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchBar from './Components/SearchBar'
import countries from './Utilis/country'
import "./App.css"


function App() {
  const[query,setQuery]=useState("")
  const[suggesttions,setSuggestions]=useState([])
  const queryHandler=useCallback((val)=>{

      setQuery(val)

  },[])
  useEffect(()=>{
    if(query===""){
      setSuggestions([])
    }else{
    let newCountrySuggestions=countries.filter(item=>(
      item.country.toLowerCase().indexOf(query)
      !==-1?true:false
    )).map(item=>item.country)
    setSuggestions(newCountrySuggestions)
    }
  },[query]);

  return (
    <div>
      <h2 className='header'>Search Bar</h2>
      <h4>The Search Query is "{query}"</h4>
        <SearchBar inputQueryHadler={queryHandler}
         suggesttions={suggesttions}/>
    </div>
  )
}

export default App
