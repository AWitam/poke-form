import useSWR, { useSWRConfig } from "swr";

interface UsePokemonAutocompleteProps {
  query?: string;
  shouldFetch: boolean;
}

type PokemonItem = { name: string; id: number };

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
    { fallbackData: [] }
  );

  return {
    data: data ?? [],
    isLoading: isLoading || isValidating,
    mutate,
  };
};
