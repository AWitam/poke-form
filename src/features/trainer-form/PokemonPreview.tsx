import { Chip } from "@/components/Chip";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface PreviewBoxProps {
  id: number;
  name: string;
  baseExperience: number;
  types: string[];
}

const Item = (props: BoxProps) => {
  return (
    <Box
      display={"flex"}
      gap={1}
      width={{ xs: "100%", md: "50%" }}
      color="grey.100"
      flexDirection={"column"}
      {...props}
    />
  );
};

const Types = ({ types }: { types: string[] }) => {
  return (
    <Stack direction={"row"} gap={1.5} alignItems={"center"}>
      <Typography variant="body2">Type:</Typography>
      {types.map((type) => (
        <Chip variant={"filled"} key={type} label={type} />
      ))}
    </Stack>
  );
};

export const PokemonPreview = ({ name, types, baseExperience, id }: PreviewBoxProps) => {
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
      }}
    >
      <Stack gap={3} direction={{ xs: "column", sm: "row" }} width={"100%"}>
        <Item alignItems={"center"}>
          <Image
            width={96}
            height={96}
            alt={"sdf"}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          />
        </Item>
        <Item>
          <Typography variant="body2">Name: {name}</Typography>
          <Types types={types} />
          <Typography variant="body2">Base experience: ${baseExperience}</Typography>
          <Typography variant="body2">Id: {id}</Typography>
        </Item>
      </Stack>
    </Box>
  );
};
