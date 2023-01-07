import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

type Props = {};

export const PokemonDetails: React.FC<Props> = (props) => {
  const [pokemon, setPokemon] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res: any) => {
        setPokemon(res.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError("No result found");
        } else {
          setError("Oops, an error occured. Please try again");
        }
      });
  }, [name]);

  if (error) {
    return (
      <div>
        <Link to="/">Back</Link>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>{pokemon?.name}</h1>
      <p>Type: {pokemon?.type}</p>
    </div>
  );
};

export default PokemonDetails;
