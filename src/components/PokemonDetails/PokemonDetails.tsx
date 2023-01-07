import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pokemon, { ApiData, PokemonType } from "../../typeDefs/Pokemon";

type Props = {};

export const PokemonDetails: React.FC<Props> = (props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
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

  if (!pokemon) {
    return (
      <div>
        Loading
      </div>
    );
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt="Pokemon default front sprite" />
      base_experience:
      { pokemon.base_experience }
      <br />
      height:
      { pokemon.height }
      <br />
      Weight:
      { pokemon.weight }
      <br />
      Forms:
      <ul>
        {pokemon.forms.map((item: ApiData) => (
            <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      Types:
      <ul>
        {pokemon.types.map((item: PokemonType) => (
            <li key={item.slot}>{item.type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
