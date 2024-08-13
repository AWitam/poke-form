import Fuse from "fuse.js";
import pokemon from "../data/pokemon.json";
import { createFuseInstance } from "./fuse";

type PokemonItem = (typeof pokemon.data)[number];

const searchPokemon =
  (fuseInstance: Fuse<PokemonItem>) => (query: string, limit: number) => {
    return fuseInstance
      .search(query)
      .slice(0, limit)
      .map((result) => result.item);
  };

const fuseInstance = createFuseInstance(pokemon.data, {
  keys: ["name"],
  threshold: 0.3,
});

export default searchPokemon(fuseInstance);
