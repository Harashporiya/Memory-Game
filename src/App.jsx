import React, { useEffect, useState } from 'react';
import './index.css';
import { Navbar } from './Component/Navbar';
import { ScoreBord } from './Component/ScoreBord';

function App() {
  const [data, setData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    if(score > bestScore){
      setBestScore(score)
    }
    if(score === 10){
      setGameOver(true);
      setScore(score);
    }
    
  },[score, bestScore])

  const fetchData = async () => {
    const fetchedData = [];

    for (let i = 1; i <= 10; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const result = await response.json();
      fetchedData.push(result);
    }

    setData(fetchedData);
    setGameOver(false);
  };

  function handleImageClick(id){
    if (selectedPokemon === id) {
      setScore(0);
      setSelectedPokemon(null);
      fetchData();
    } else {
      setScore(score + 1);
      setSelectedPokemon(id);
    }

    const newData = [...data];
    shuffleArray(newData);
    setData(newData);
  };

  function handlePlayAgain(){
    setScore(0);
    setSelectedPokemon(null);
    // setData([]); 
    fetchData();
  };

  return (
    <div>
      <Navbar/>
      <ScoreBord score={score} bestScore={bestScore} />
      { gameOver ? ( <div className="win">
          <div >You Win!</div>
          <button   onClick={handlePlayAgain}>Play Again</button>
        </div> ) : ( <ul id="img">
          {data.map((pokemon) => (<li className="img1" id={`img1 ${pokemon.id}`} key={pokemon.id}
              onClick={() => handleImageClick(pokemon.id)} >
              <img src={pokemon.sprites.front_default} alt={pokemon.name} /> {pokemon.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function shuffleArray(array){
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export default App;
