import useSWR from "swr";

interface UsePokemonAutocompleteProps {
  id?: number;
}

type PokemonData = {
  name: string;
  id: number;
  baseExperience: number;
  img: string;
  types: string[];
};

export const usePokemonPreview = ({ id }: UsePokemonAutocompleteProps) => {
  const { data, isLoading } = useSWR<PokemonData>(
    () => (id ? `/api/preview?id=${id}` : null),
    async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    pokemonData: data,
    isLoadingPokemonData: isLoading,
  };
};
