import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Props = {};
const itemsPerPage: number = 12;

export const PokemonList: React.FC<Props> = (props) => {
  const [pokemon, setPokemon] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`)
      .then((res) => {
        setPokemon(res.data.results.map((item: any) => ({...item, loaded: false})));
        setTotalPages(Math.ceil(res.data.count / itemsPerPage));
      });
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      if (pokemon.every((item:any) => item.loaded)) {
        return;
      }

      const promises = pokemon.map((p: any) => axios.get(`https://pokeapi.co/api/v2/pokemon/${p.name}`));
      const results = await Promise.all(promises);
      let data = results.map(res => res.data);
      data = data.map((item: any) => ({...item, loaded: true}))
      setPokemon(data);
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
      <ul>
        {pokemon.map((p: any) => (
          <>
            <Link key={p.name} to={p.name}>
              {p.name}
            </Link>
            <br />
          </>
        ))}
      </ul>

      <button onClick={handlePrevClick} disabled={page === 1}>
        Prev
      </button>

      { page } / { totalPages }

      <button onClick={handleNextClick} disabled={page === totalPages}>
        Next
      </button>
    </>
  );
};

export default PokemonList;
