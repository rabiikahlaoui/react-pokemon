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
        <Link to="/" className="back-button">
          &lt; Back
        </Link>
        <p>{error}</p>
      </div>
    );
  }

  if (!pokemon) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Link to="/" className="back-button">
        &lt; Back
      </Link>
      <div className="pokemon-detail">
        <div className="pokemon-image">
          <img
            src={pokemon.sprites.front_default}
            alt="Pokemon default front sprite"
          />
        </div>
        <div className="pokemon-data">
          <h1>{pokemon.name}</h1>

          <table>
            <tbody>
              <tr>
                <th>Height: </th>
                <td>{pokemon.height}</td>
              </tr>
              <tr>
                <th>Weight: </th>
                <td>{pokemon.weight}</td>
              </tr>
              <tr>
                <th>Base experience: </th>
                <td>{pokemon.base_experience}</td>
              </tr>
            </tbody>
          </table>

          <h2>Forms:</h2>
          <ul>
            {pokemon.forms.map((item: ApiData) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>

          <h2>Types:</h2>
          <ul>
            {pokemon.types.map((item: PokemonType) => (
              <li key={item.slot}>{item.type.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
