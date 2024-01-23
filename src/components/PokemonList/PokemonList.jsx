import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
   
    const [pokemonlist,setpokemonlist]=useState([]);
    const[isloading,setisloading]=useState(true)
    const [nextUrl,setnextUrl]=useState('')
    const [PreviousUrl,setPreviousUrl]=useState('')
const [PokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
async function downloadPokemones(){
  setisloading(true)
    const response =await axios.get(PokedexUrl)

    
    const pokemonResults=response.data.results
   const pokemonResultpromise= pokemonResults.map((pokemon)=> axios.get(pokemon.url))
   const pokemonData=await axios.all(pokemonResultpromise)
   console.log(pokemonData)
   setnextUrl(response.data.next)
   setPreviousUrl(response.data.previous)
   // iterating over the array of pokeamons and using there url to create an array of promises
   //that will download those 20 pokemons
   //passing the promise aray to axios.all 
   const res=pokemonData.map((pokeData)=>{// aray of 20 pokemon,iterate data of each pokemon and extraing id name image
    const pokemon=pokeData.data;//76.2,86.36 
    return{
        id:pokemon.id,
        name:pokemon.name,
        images: (pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
        types:pokemon.types}
   })
   console.log(res)
   setpokemonlist(res)
    setisloading(false)

}


    useEffect(()=>{
        downloadPokemones();
       },[PokedexUrl])

  return(
    <div className="pokemon-list-wrapper">
    
    <div className="pokemon-wrapper">
    {(isloading)?'Loading...' : 
      pokemonlist.map((p)=>(
        <Pokemon name={p.name} images={p.images} key={p.id}/>
      ))
    }
    
    
    </div>
    <div className="controls">
      <button disabled ={PreviousUrl==null} onClick={()=> setPokedexUrl(PreviousUrl)}>Previous</button>
      <button disabled ={nextUrl==null} onClick={()=> setPokedexUrl(nextUrl)}>Next</button>
    </div>
   
    </div>
   )
}

 export default PokemonList;

