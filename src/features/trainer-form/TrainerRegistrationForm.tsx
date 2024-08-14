"use client";

import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Autocomplete } from "@/components/Autocomplete";
import { Box, capitalize, CircularProgress, Grid } from "@mui/material";
import { Button } from "@/components/Button";
import { PokemonPreview } from "@/components/pokemon-preview/PokemonPreview";
import { Controller } from "react-hook-form";
import { useRegisterTrainerForm } from "./useRegisterTrainerForm";
import { usePokemonAutocomplete } from "./usePokemonAutocomplete";
import { SuccessModal } from "./SuccessModal";
import { useState } from "react";

export const TrainerRegistrationForm = () => {
  const [isOpen, setOpen] = useState(false);

  const {
    control,
    query,
    autocompleteValue,
    onSubmit,
    reset,
    debouncedSetQueryValue,
  } = useRegisterTrainerForm({
    onSuccessfulSubmit: () => setOpen(true),
  });

  const { suggestions, autocompleteError, isLoadingSuggestions } =
    usePokemonAutocomplete({
      query,
    });

  return (
    <>
      <SuccessModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onReset={() => {
          reset();
          setOpen(false);
        }}
      />
      <form onSubmit={onSubmit}>
        <Grid spacing={3} container columns={2}>
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
              name="trainerAge"
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
              name="pokemon"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  id="pokemon-name"
                  loading={isLoadingSuggestions}
                  renderInput={(props) => (
                    <Input
                      {...props}
                      error={!!fieldState.error || !!autocompleteError}
                      placeholder="Choose"
                      helperText={fieldState.error?.message}
                      InputProps={{
                        ...props.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingSuggestions && (
                              <CircularProgress size={20} />
                            )}
                            {props.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  // filterOptions={(x) => x}
                  getOptionLabel={(option) =>
                    typeof option === "string"
                      ? option
                      : capitalize(option?.name ?? "")
                  }
                  isOptionEqualToValue={(option, value) => option?.id === value?.id}
                  value={field.value ?? null}
                  onChange={(_, value) => {
                    if (value) {
                      field.onChange(value);
                    }
                  }}
                  onInputChange={(_, value, reason) => {
                    if (reason === "clear") {
                      field.onChange(null);
                    }
                    if (value) {
                      debouncedSetQueryValue(value);
                    }
                  }}
                  options={suggestions}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <PokemonPreview pokemonId={autocompleteValue?.id} />
          </Grid>
          <Grid item xs={2}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-end" }}
              gap={2}
            >
              <Button variant="soft" type="reset" onClick={() => reset()}>
                Reset
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
