import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const RickAndMortyComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const fetchCharacters = async (_url) => {
    try {
      const response = await axios.get(_url);

      setCharacters(response.data.results);
      setInfo(response.data.info);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCharacters = characters.filter((character) => {
    // Filtrar por término de búsqueda
    const matchSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtrar por filtro seleccionado
    const matchFilter = selectedFilter === '' || character.species === selectedFilter;

    return matchSearch && matchFilter;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handlePreviousPage = () => {
    if (info.prev) {
      fetchCharacters(info.prev);
    }
  };

  const handleNextPage = () => {
    if (info.next) {
      fetchCharacters(info.next);
    }
  };

  useEffect(() => {
    fetchCharacters("http://localhost:5000/rick-and-morty/characters");
  }, []);

  return (
    <div className="TotalPage">
      <nav>
        <h1>Rick and Morty</h1>
      </nav>

      <div className="search-container">
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Buscar..." />
      </div>

      <div className="filter-container">
        <label htmlFor="filter">Filtrar Por Especie:</label>
        <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          

        </select>
      </div>
      


      <div className="Pages">
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevios={handlePreviousPage}
          OnNetx={handleNextPage}
        />
      </div>

      <div className="GridContainer">
        {filteredCharacters.map((character) => (
          <div key={character.id} className="Card">
            <img src={character.image} alt={character.name} />
            <div>
              <p>Name: {character.name}</p>
              <p>Species: {character.species}</p>
              <p>Gender: {character.gender}</p>
              <p>Status: {character.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="Pages">
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevios={handlePreviousPage}
          OnNetx={handleNextPage}
        />
      </div>
    </div>
  );
};

export default RickAndMortyComponent;
