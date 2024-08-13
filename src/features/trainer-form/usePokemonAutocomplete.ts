import useSWR from "swr";
import data from "../../data/pokemon.json";

interface UsePokemonAutocompleteProps {
  query?: string;
}

type PokemonItem = { name: string; id: number };

const initialData = data.data.slice(0, 10);

export const usePokemonAutocomplete = ({
  query,
}: UsePokemonAutocompleteProps) => {
  const key = `/api/search?query=${query}`;
  const { data, isLoading, isValidating, mutate } = useSWR<PokemonItem[]>(
    () => (query ? key : null),
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
    data: data ?? [],
    isLoading: isLoading || isValidating,
    mutate,
  };
};
