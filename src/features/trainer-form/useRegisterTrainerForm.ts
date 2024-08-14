"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "@mui/material/utils";
import { useCallback } from "react";

const trainerNameErrorMessage = "Required from 2 to 20 symbols";

const formSchema = z.object({
  trainerName: z
    .string({ message: trainerNameErrorMessage })
    .trim()
    .min(2, { message: trainerNameErrorMessage })
    .max(20, { message: trainerNameErrorMessage }),
  trainerAge: z.string().refine(
    (val) => {
      const num = Number(val);
      return num >= 16 && num <= 99;
    },
    {
      message: "Required range from 16-99",
    }
  ),
  query: z.string().optional(),
  pokemon: z
    .object(
      {
        name: z.string(),
        id: z.number().optional(),
      },
      {
        invalid_type_error: "Choose something",
      }
    )
    .optional()
    .refine((val) => {
      return val?.id !== undefined;
    }, "Choose something"),
});

interface UseRegisterTrainerFormProps {
  onSuccessfulSubmit: () => void;
}

export const useRegisterTrainerForm = ({
  onSuccessfulSubmit,
}: UseRegisterTrainerFormProps) => {
  const { control, reset, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainerName: "",
      trainerAge: "",
      pokemon: undefined,
      query: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Submitted", data);
    onSuccessfulSubmit();
  });

  const autocompleteValue = watch("pokemon");
  const query = watch("query");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQueryValue = useCallback(
    debounce((value) => {
      setValue("query", value);
    }, 400),
    [setValue]
  );

  return {
    control,
    autocompleteValue,
    query,
    debouncedSetQueryValue,
    reset,
    onSubmit,
  };
};
