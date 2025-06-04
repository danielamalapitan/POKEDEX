import React from "react";

const typeWeaknesses = {
  grass: ["Flying", "Poison", "Bug", "Steel", "Fire", "Grass", "Dragon"],
  fire: ["Water", "Ground", "Rock"],
  water: ["Electric", "Grass"],
  electric: ["Ground"],
  ground: ["Water", "Grass", "Ice"],
  rock: ["Water", "Grass", "Fighting", "Ground", "Steel"],
  psychic: ["Bug", "Ghost", "Dark"],
  dark: ["Bug", "Fairy", "Fighting"],
};

const getWeakness = (types) => {
  let weaknesses = new Set();
  types.forEach((type) => {
    const lowerCaseType = type.toLowerCase();
    if (typeWeaknesses[lowerCaseType]) {
      typeWeaknesses[lowerCaseType].forEach((w) => weaknesses.add(w));
    }
  });

  return weaknesses.size > 0 ? Array.from(weaknesses).join(", ") : "None";
};

const PokemonDetails = ({pokemon, onClose, onNext, onPrev, hasNext, hasPrev}) => {
  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96 relative">
        
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-lg"
        >
          ✖
        </button>

      

        <h2 className="text-2xl font-bold">#{pokemon.id} {pokemon.name.toUpperCase()}</h2>
        <p className="text-gray-500">Type: {pokemon.types.join(", ")}</p>
        <img src={pokemon.image} alt={pokemon.name} className="w-40 mx-auto rounded-md" />

        <div className="text-left mt-4">
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
          <p><strong>Weaknesses:</strong> {getWeakness(pokemon.types)}</p>    

          <h3 className="text-xl font-bold mt-4">Stats:</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.name} className="text-lg">{stat.name}: {stat.value}</li>
            ))}
          </ul>


<div className="flex justify-between items-center mt-6">
  <button
    onClick={onPrev}
    disabled={!hasPrev}
    className="py-2 px-4 rounded font-medium border text-gray-900 bg-white hover:border-blue-600 hover:bg-blue-400 hover:text-white disabled:opacity-50"
  >
    ⪻ Previous
  </button>
  
  <button
    onClick={onNext}
    disabled={!hasNext}
    className="py-2 px-4 rounded font-medium border text-gray-900 bg-white hover:border-blue-600 hover:bg-blue-400 hover:text-white disabled:opacity-50"
  >
    Next ⪼
  </button>
</div>



        </div>
        
      </div>
    </div>
  );
};

export default PokemonDetails;
