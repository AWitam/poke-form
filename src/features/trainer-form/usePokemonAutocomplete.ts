import useSWR from "swr";

import data from "../../data/pokemon.json";

interface UsePokemonAutocompleteProps {
  query?: string;
  shouldFetch: boolean;
}

type PokemonItem = { name: string; id: number };

const initialData = data.data.slice(0, 10);

export const usePokemonAutocomplete = ({
  query,
  shouldFetch,
}: UsePokemonAutocompleteProps) => {
  // TODO: debounce and cache query
  const cacheKey = `/api/search?query=${query}`;
  const { data, isLoading, isValidating, mutate } = useSWR<PokemonItem[]>(
    () => (shouldFetch ? cacheKey : null),
    async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    {
      fallbackData: initialData
    }
  );

  return {
    data: data ?? [],
    isLoading: isLoading || isValidating,
    mutate,
  };
};
