import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonSearch from './components/PokemonSearch/PokemonSearch';

function App() {
  return (
    <div className="App">
      <PokemonSearch />
      <Routes>
        <Route path="/:name" element={<PokemonDetails />} />
        <Route path="/" element={<PokemonList />} />
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;
