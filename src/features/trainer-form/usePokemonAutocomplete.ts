import useSWR from "swr";

interface UsePokemonAutocompleteProps {
  query?: string;
}

type PokemonItem = { name: string; id: number };

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
