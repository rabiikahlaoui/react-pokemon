import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};
const itemsPerPage: number = 12;

export const PokemonSearch: React.FC<Props> = (props) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="search-form-wrapper">
        <form>
            <div className="search-form-container">
                <input placeholder="Search ..." type="text" value={search} onChange={handleSearchChange} />
                <Link to={`/${search}`}>Search</Link>
            </div>
        </form>
      </div>
    </>
  );
};

export default PokemonSearch;
