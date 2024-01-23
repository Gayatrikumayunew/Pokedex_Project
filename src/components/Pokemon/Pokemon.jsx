import './Pokemon.css'

function Pokemon({name,images}){
return(
    <div className='pokemon'>
        <div className='pokemon-name'>{name}</div>
        <div><img className='pokemon-image' src={images}></img></div>
    </div>
)
}
export default Pokemon;