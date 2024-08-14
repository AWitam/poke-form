import useSWR from "swr";

interface UsePokemonAutocompleteProps {
  query?: string;
}

type PokemonItem = { name: string; id: number };

export const usePokemonAutocomplete = ({
  query,
}: UsePokemonAutocompleteProps) => {
  const queryKey = query?.trim().toLowerCase();
  const key = `/api/search?query=${queryKey}`;

  const { data, isLoading, isValidating, error } = useSWR<PokemonItem[]>(
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
    suggestions: data || [],
    isLoadingSuggestions: isLoading || isValidating,
    autocompleteError: error,
  };
};
