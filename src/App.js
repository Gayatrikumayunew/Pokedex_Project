import logo from './logo.svg';
import './App.css';
import Pokedex from './components/Pokedex/Pokedex';
import img1 from './components/images/image.png'




function App() {
  return (
    <>
    <div className='img'> 
   
      <img  src= {img1}/>
 </div>
    <Pokedex/>
    </>
  );
}

export default App;
