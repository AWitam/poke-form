import Fuse from "fuse.js";
import pokemon from "../data/pokemon.json";
import { createFuseInstance } from "./fuse";

type PokemonItem = (typeof pokemon.data)[number];

let fuseInstance: Fuse<PokemonItem> | null = null;

const searchPokemon = (query: string, limit: number) => {
  if (!fuseInstance) {
    console.log("Creating fuse instance");
    fuseInstance = createFuseInstance(pokemon.data, {
      keys: ["name"],
    });
  }

  return fuseInstance
    .search(query)
    .slice(0, limit)
    .map((result) => result.item);
};

export default searchPokemon;
