"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    .object({
      name: z.string(),
      id: z.number().optional(),
    }, {required_error: "Choose something"})
    .nullable()
    .refine(
      (val) => {
        return !!val;
      },
      { message: "Choose something" }
    ),
});

interface UseRegisterTrainerFormProps {
  onSuccessfulSubmit: () => void;
}

export const useRegisterTrainerForm = ({
  onSuccessfulSubmit,
}: UseRegisterTrainerFormProps) => {
  const { control, reset, handleSubmit, getValues, setValue, watch, formState } = useForm<
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

  const autocompleteValue = getValues("pokemon");
  const query = watch("query");

  return {
    control,
    autocompleteValue,
    query,
    setValue,
    reset,
    onSubmit,
  };
};
