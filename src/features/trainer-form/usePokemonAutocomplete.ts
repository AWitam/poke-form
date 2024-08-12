import useSWR from "swr";
import { unknown } from "zod";

interface UsePokemonAutocompleteProps {
  query?: string;
}

type PokemonItem = { name: string; id: number };

export const usePokemonAutocomplete = ({
  query,
}: UsePokemonAutocompleteProps) => {
  // TODO: debounce and cache query
  const { data, isLoading, mutate } = useSWR<PokemonItem[]>(
    () => (query ? `/api/search?query=${query}` : null),
    async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    { fallbackData: [] }
  );

  return {
    data: data ?? [],
    isLoading,
    mutate,
  };
};
