import React, { useState } from "react";

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

const typeColors = {
  grass: "from-green-400 to-green-600 border-green-800",
  fire: "from-red-400 to-red-600 border-red-800",
  water: "from-blue-400 to-blue-600 border-blue-800",
  electric: "from-yellow-400 to-yellow-600 border-yellow-800",
  psychic: "from-purple-400 to-purple-600 border-purple-800",
  fairy: "from-pink-400 to-pink-600 border-pink-800",
  fighting: "from-orange-400 to-orange-600 border-orange-800",
  ghost: "from-indigo-400 to-indigo-600 border-indigo-800",
  normal: "from-gray-400 to-gray-600 border-gray-800",
  dragon: "from-green-600 to-green-800 border-green-800",
};

  const PokemonCard = ({ pokemon, onNavigate, hasPrev, hasNext }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const mainType = pokemon.types[0];
  const gradientClass = typeColors[mainType] || "from-gray-300 to-gray-500 border-gray-800";

  return (
    <>

      <div
        className={`bg-gradient-to-b ${gradientClass} border-4 rounded-lg p-4 shadow-lg text-center text-white cursor-pointer`}
        onClick={() => setIsOpen(true)} 
      >
        
        <h3 className="text-xs font-bold opacity-80" style={{color: "black"}}>#{pokemon.id}</h3>
        <img src={pokemon.image} alt={pokemon.name} className="w-28 mx-auto rounded-md" />
        <h2 className="text-xl font-bold mt-2" style={{fontFamily: "Luckiest Guy, sans-serif", color: "black", 
         textShadow: "2px 2px 0 white, -2px -2px 0 white, -2px 2px 0 white, 2px -2px 0 white", }}>{pokemon.name.toUpperCase()}</h2>
        <p className="text-sm">{pokemon.types.join(", ").toUpperCase()}</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
         
            <button 
              className="absolute top-2 right-2 text-red-600 hover:text-red-900 text-lg"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-center mt-4">#{pokemon.id.toString().padStart(3, "0")} {pokemon.name.toUpperCase()}</h2>
            <img src={pokemon.image} alt={pokemon.name} className="w-32 mx-auto my-4" />
            <p className="text-center text-gray-700">Type: {pokemon.types.join(", ").toUpperCase()}</p>
            <p className="text-center text-gray-700">Height: {pokemon.height}</p>
            <p className="text-center text-gray-700">Weight: {pokemon.weight}</p>
            <p className="text-center text-gray-700">Weaknesses: {getWeakness(pokemon.types)}</p>
              
            <h3 className="text-lg font-semibold mt-4">Stats:</h3>
            <ul className="text-gray-700">
              {pokemon.stats.map((stat) => (
                <li key={stat.name} className="text-sm">{stat.name}: {stat.value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
