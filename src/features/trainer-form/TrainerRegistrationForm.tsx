"use client";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Autocomplete } from "@/components/Autocomplete";
import { Box, capitalize, Grid, Typography } from "@mui/material";
import { Button } from "@/components/Button";
import { PokemonPreview } from "./PokemonPreview";
import { formatDate } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { useRegisterTrainerForm } from "./useRegisterTrainerForm";
import { usePokemonAutocomplete } from "./usePokemonAutocomplete";

type DateInfo = {
  dayOfWeek: string;
  day: number;
  month: number;
  year: number;
};

interface TrainerRegistrationFormProps {
  date: { error: string } | DateInfo;
}

const options = [];

export const TrainerRegistrationForm = ({
  date,
}: TrainerRegistrationFormProps) => {
  const isDateError = "error" in date;
  const { control, onSubmit, pokemonQuery, setValue } =
    useRegisterTrainerForm();

  const { data } = usePokemonAutocomplete({
    query: pokemonQuery,
  });

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
      <form onSubmit={onSubmit}>
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
            <Controller
              name="trainerName"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  fullWidth
                  id="trainer-name"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder="Trainer's name"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <Label htmlFor="trainer-age">Trainer&apos;s age</Label>
            <Controller
              name="age"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  fullWidth
                  id="trainer-age"
                  type="number"
                  placeholder="Trainer's age"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Label htmlFor="pokemon-name">Pokémon&apos;s name</Label>
            <Controller
              name="pokemonName"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  freeSolo
                  inputProps={{
                    id: "pokemon-name",
                    placeholder: "Pokémon's name",
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  }}
                  getOptionLabel={(option) =>
                    capitalize(
                      typeof option === "string" ? option : option.name
                    )
                  }
                  onChange={(_, value) => {
                    field.onChange(value ? value : { id: undefined, name: "" });
                  }}
                  onInputChange={(_, value) => {
                    setValue("pokemonName", { name: value });
                  }}
                  options={data}
                />
              )}
            />
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
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
