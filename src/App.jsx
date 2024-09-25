import { useState, useEffect } from 'react';
import './App.css';

function Modal({ isOpen, onClose, pokemon }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <button onClick={onClose} className="text-red-500 float-right">
          &times;
        </button>
        {pokemon && (
          <div className="text-center">
            <div className="h-40 mb-4 flex items-center justify-center">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <h1 className="text-2xl font-bold capitalize mb-4">{pokemon.name}</h1>
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">Abilities:</h2>
              <ul>
                {pokemon.abilities.map((ability, index) => (
                  <li key={index} className="capitalize">
                    - {ability.ability.name}
                  </li>
                ))}
              </ul>
              <h2 className="text-xl font-semibold mt-4 mb-2">Stats:</h2>
              <ul>
                {pokemon.stats.map((stat, index) => (
                  <li key={index} className="capitalize">
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokeIndx, setPokeIndx] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPoke = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeIndx}`);
        const data = await response.json();
        setPokemon(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPoke();
  }, [pokeIndx]);

  const nextPoke = () => {
    setPokeIndx((pokeIndx) => pokeIndx + 1);
  };

  const prevPoke = () => {
    setPokeIndx((pokeIndx) => pokeIndx - 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {pokemon && (
        <div className="text-center">
          {/* Fixed height container for the image */}
          <div className="h-40 mb-4 flex items-center justify-center">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <h1 className="text-2xl font-bold capitalize mb-4">{pokemon.name}</h1>
        </div>
      )}
      <div className="space-x-4 mt-4">
        <button 
          onClick={prevPoke} 
          disabled={pokeIndx <= 1 || loading}
          className={`px-4 py-2 rounded-lg transition duration-300 
                      ${pokeIndx <= 1 || loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} 
                      text-white`}
        >
          Previous
        </button>
        <button 
          onClick={openModal} 
          disabled={!pokemon}
          className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg transition duration-300"
        >
          View
        </button>
        <button 
          onClick={nextPoke} 
          disabled={loading}
          className={`px-4 py-2 rounded-lg transition duration-300 
                      ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} 
                      text-white`}
        >
          Next
        </button>
      </div>


      <Modal isOpen={isModalOpen} onClose={closeModal} pokemon={pokemon} />

      
    </div>
  );
}

export default App;
