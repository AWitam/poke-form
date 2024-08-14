"use client";

import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Autocomplete } from "@/components/Autocomplete";
import {
  Box,
  capitalize,
  CircularProgress,
  debounce,
  Grid,
  Typography,
} from "@mui/material";
import { Button } from "@/components/Button";
import { PokemonPreview } from "@/components/pokemon-preview/PokemonPreview";
import { formatDate } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { useRegisterTrainerForm } from "./useRegisterTrainerForm";
import { usePokemonAutocomplete } from "./usePokemonAutocomplete";
import { SuccessModal } from "./SuccessModal";
import { useCallback, useState } from "react";

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
  const [isOpen, setOpen] = useState(false);

  const { control, query, onSubmit, setValue, reset, autocompleteValue } =
    useRegisterTrainerForm({
      onSuccessfulSubmit: () => setOpen(true),
    });

  const { data, isLoading } = usePokemonAutocomplete({
    query: query?.trim().toLocaleLowerCase(),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = useCallback(
    debounce((value) => {
      setValue("query", value);
    }, 400),
    [setValue]
  );

  return (
    <>
      <SuccessModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onReset={reset}
      />
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
                    loading={isLoading}
                    renderInput={(props) => (
                      <Input
                        {...props}
                        error={!!fieldState.error}
                        placeholder="Choose"
                        helperText={fieldState.error?.message}
                        InputProps={{
                          ...props.InputProps,
                          endAdornment: (
                            <>
                              {isLoading && <CircularProgress size={20} />}
                              {props.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    filterOptions={(x) => x}
                    getOptionLabel={(option) =>
                      typeof option === "string"
                        ? option
                        : capitalize(option?.name ?? "")
                    }
                    isOptionEqualToValue={(option, value) =>
                      option?.name === value?.name
                    }
                    value={field.value ?? null}
                    onChange={(_, value) => field.onChange(value)}
                    onInputChange={(_, value, reason) => {
                      if (reason === "clear") {
                        field.onChange(null);
                      }
                      if (value) {
                        debouncedSetValue(value);
                      }
                    }}
                    options={data}
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
      </Box>
    </>
  );
};
