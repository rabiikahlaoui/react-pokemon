import React from "react";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  image: string;
};

export const PokemonItem: React.FC<Props> = ({ name, image }) => {

  return (
    <div className="pokemon-item">
        <Link to={name}>
        <img src={image} alt="Pokemon default front sprite" />
        <span>{name}</span>
        </Link>
    </div>
  );
};

export default PokemonItem;
