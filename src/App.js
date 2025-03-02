import React, { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import "@fontsource/antonio"; 
import "@fontsource/antonio/700.css"; 
import "@fontsource/poppins";
import "@fontsource/poppins/700.css"; 


const POKE_API = "https://pokeapi.co/api/v2/pokemon";
const IMAGE_URL = (id) => `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [sortOption, setSortOption] = useState("id-asc"); 
  const [filterType, setFilterType] = useState(""); 

  useEffect(() => {
    fetchPokemon(0);
  }, []);

  const fetchPokemon = async (newOffset) => {
    try {
      const response = await fetch(`${POKE_API}?limit=10&offset=${newOffset}`);
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const details = await detailsResponse.json();
          return {
            id: details.id.toString().padStart(3, "0"),
            name: details.name,
            image: IMAGE_URL(details.id.toString().padStart(3, "0")),
            types: details.types.map((t) => t.type.name),
            height: details.height,
            weight: details.weight,
            stats: details.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
          };
        })
      );

      setPokemonList((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniquePokemon = pokemonDetails.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniquePokemon];
      });

      setOffset(newOffset + 10);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const handleNextPrev = (id, direction) => {
    console.log(`Navigating ${direction} from Pokémon ID: ${id}`);
    if (!pokemonList.length || !selectedPokemon) return;

    const formattedId = id.toString().padStart(3, "0");
    const currentIndex = pokemonList.findIndex((p) => p.id === formattedId);


    if (direction === "next" && currentIndex < pokemonList.length - 1) {
        console.log(`Current Index: ${currentIndex}, Next Index: ${currentIndex + 1}`);
      setSelectedPokemon(pokemonList[currentIndex + 1]); // Go to Next Pokémon
    }

    else if (direction === "prev" && currentIndex > 0) {
        console.log(`Current Index: ${currentIndex}, Previous Index: ${currentIndex - 1}`);
      setSelectedPokemon(pokemonList[currentIndex - 1]); 
    }
  };

  const currentIndex = selectedPokemon
  ? pokemonList.findIndex((p) => parseInt(p.id, 10) === parseInt(selectedPokemon.id, 10))
  : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < pokemonList.length - 1;


  const filteredList = pokemonList.filter(
    (p) =>
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search)) &&
      (filterType === "" || p.types.includes(filterType))
  );

  const handleSort = (option) => {
    setSortOption(option);
    let sortedList = [...pokemonList];

    if (option === "id-asc") {
      sortedList.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    } else if (option === "id-desc") {
      sortedList.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    } else if (option === "name-asc") {
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "name-desc") {
      sortedList.sort((a, b) => b.name.localeCompare(a.name));
    }

    setPokemonList(sortedList);
  };

  return (
    <div
    className="min-h-screen flex flex-col items-center"
    style={{
      backgroundImage: `url('bg.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}>


      <div className="w-full bg-yellow-400 p-4 flex items-center justify-between">
        <img src="/pokedex.png" alt="Pokédex Logo" className="w-40 h-15 ml-4" />
        <h1
          className="text-3xl text-black flex-grow text-right"
          style={{ fontFamily: "Antonio, sans-serif" }}
        >
          Your Ultimate Pokémon Catalogue
        </h1>
      </div>


        <div className="flex justify-start gap-6 my-6 w-full px-6">
   
        <div className="relative w-64">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 2a8 8 0 015.293 13.707l3.9 3.9a1 1 0 11-1.414 1.414l-3.9-3.9A8 8 0 1110 2z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by Name or ID"
            className="w-full bg-white border border-gray-300 rounded-lg shadow-md py-2 pl-10 pr-4 focus:ring focus:ring-blue-300 focus:border-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="w-56 bg-yellow-400 text-black border border-black-700 rounded-lg shadow-md 
                 py-2 px-4 focus:ring focus:ring-black-300 hover:bg-blue-600 cursor-pointer"
          onChange={(e) => handleSort(e.target.value)}
          value={sortOption}
        >
          <option value="id-asc">ID (Lowest to Highest)</option>
          <option value="id-desc">ID (Highest to Lowest)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>

        <select
          className="w-56 bg-yellow-400 text-black border border-black-700 rounded-lg shadow-md 
                 py-2 px-4 focus:ring focus:ring-black-300 hover:bg-blue-600 cursor-pointer"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filter by Type:</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="fairy">Fairy</option>
          <option value="fighting">Fighting</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="bug">Bug</option>
          <option value="dark">Dark</option>
          <option value="poison">Poison</option>
          <option value="flying">Flying</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
        {filteredList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onNavigate={handleNextPrev} />
        ))}
      </div>

      <button
        onClick={() => fetchPokemon(offset)}
        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md mt-6 hover:bg-yellow-400"
      >
        Load More..
      </button>

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}
