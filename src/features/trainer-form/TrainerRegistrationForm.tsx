import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Autocomplete } from "@/components/Autocomplete";
import { Box, Grid, Typography } from "@mui/material";
import { Button } from "@/components/Button";
import { PokemonPreview } from "./PokemonPreview";
import { formatDate } from "@/lib/utils";

type DateInfo = {
  dayOfWeek: string;
  day: number;
  month: number;
  year: number;
};

interface TrainerRegistrationFormProps {
  date: { error: string } | DateInfo;
}

export const TrainerRegistrationForm = ({
  date,
}: TrainerRegistrationFormProps) => {
  const isDateError = "error" in date;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.400",
        borderRadius: 1,
        maxWidth: 544,
      }}
      p={{ xs: 2, sm: 4 }}
    >
      <form>
        <Grid spacing={3} container columns={2}>
          <Grid item xs={2}>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Typography
                variant="body2"
                color={isDateError ? "error.main" : ""}
              >
                {isDateError ? date.error : formatDate({ ...date })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Label htmlFor="trainer-name">Trainer&apos;s name</Label>
            <Input id="trainer-name" fullWidth={true} />
          </Grid>
          <Grid item xs={2} sm={1}>
            <Label htmlFor="trainer-age">Trainer&apos;s age</Label>
            <Input id="trainer-age" fullWidth={true} />
          </Grid>
          <Grid item xs={2}>
            <Label htmlFor="pokemon-name">Pokémon&apos;s name</Label>
            <Autocomplete inputProps={{ id: "pokemon-name" }} options={[]} />
          </Grid>
          <Grid item xs={2}>
            <PokemonPreview
              id={1}
              name={"Bulbasaur"}
              baseExperience={65}
              types={["Grass", "Poison"]}
            />
          </Grid>
          <Grid item xs={2}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-end" }}
              gap={2}
            >
              <Button variant="soft">Reset</Button>
              <Button variant="contained">Submit</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
