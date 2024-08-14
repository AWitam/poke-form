import { Chip } from "@/components/Chip";
import type { BoxProps } from "@mui/material";
import { Box, capitalize, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { usePokemonPreview } from "./usePokemonPreview";

interface PokemonPreviewProps {
  pokemonId?: number;
}

export const PokemonPreview = ({ pokemonId }: PokemonPreviewProps) => {
  const { pokemonData, isLoadingPokemonData } = usePokemonPreview({
    id: pokemonId,
  });

  const isEmptyState = !pokemonData && !isLoadingPokemonData;

  return (
    <Box
      sx={{
        border: 1,
        display: "flex",
        borderColor: "grey.400",
        borderRadius: 1,
        minHeight: 254,
        p: { xs: 2, md: 0 },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isEmptyState ? (
        <Box>Your pokemon</Box>
      ) : (
        <Stack gap={3} direction={{ xs: "column", sm: "row" }} width={"100%"}>
          <StackItem>
            {isLoadingPokemonData && (
              <Skeleton variant="rectangular" width={96} height={96} />
            )}
            {pokemonData && (
              <Image
                src={pokemonData.img}
                alt={pokemonData.name}
                width={96}
                height={96}
              />
            )}
          </StackItem>
          <StackItem>
            {isLoadingPokemonData && (
              <>
                <Skeleton variant="text" width={150} height={16} />
                <Skeleton variant="text" width={170} height={16} />
                <Skeleton variant="text" width={120} height={16} />
              </>
            )}
            {pokemonData && (
              <>
                <Typography variant="body2">
                  Name: {capitalize(pokemonData.name)}
                </Typography>
                <Stack direction={"row"} gap={1.5} alignItems={"center"}>
                  <Typography variant="body2">Type:</Typography>
                  {pokemonData.types.map((type) => (
                    <Chip variant={"filled"} key={type} label={type} />
                  ))}
                </Stack>
                <Typography variant="body2">
                  Base experience: {pokemonData.baseExperience}
                </Typography>
                <Typography variant="body2">Id: {pokemonData.id}</Typography>
              </>
            )}
          </StackItem>
        </Stack>
      )}
    </Box>
  );
};

const StackItem = (props: BoxProps) => {
  return (
    <Box
      display={"flex"}
      gap={1}
      width={{ xs: "100%", md: "50%" }}
      color="grey.100"
      flexDirection={"column"}
      justifyContent={"center"}
      alignContent={"center"}
      flexWrap={"wrap"}
      {...props}
    />
  );
};
