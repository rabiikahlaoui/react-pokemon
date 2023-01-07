import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pokemon, { ApiData } from "../../typeDefs/Pokemon";
import PokemonItem from "./PokemonItem";

type Props = {};
const itemsPerPage: number = 12;

export const PokemonList: React.FC<Props> = (props) => {
  const [pokemon, setPokemon] = useState<ApiData[]>([]);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (page - 1) * itemsPerPage
        }&limit=${itemsPerPage}`
      )
      .then((res) => {
        setPokemon(res.data.results);
        setTotalPages(Math.ceil(res.data.count / itemsPerPage));
      });
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = pokemon.map((p: any) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
      );
      const results = await Promise.all(promises);
      let data = results.map((res) => res.data);
      setPokemonData(data);
    };

    fetchData();
  }, [pokemon]);

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="pokemon-list">
        {pokemonData.map((p: Pokemon) => (
          <PokemonItem
            key={p.name}
            name={p.name}
            image={p.sprites.front_default}
          />
        ))}
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevClick} disabled={page === 1}>
          Prev
        </button>
        {page} / {totalPages}
        <button onClick={handleNextClick} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default PokemonList;
