"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const trainerNameErrorMessage = "Required from 2 to 20 symbols";

const formSchema = z.object({
  trainerName: z
    .string({ message: trainerNameErrorMessage })
    .trim()
    .min(2, { message: trainerNameErrorMessage })
    .max(20, { message: trainerNameErrorMessage }),
  age: z.string().refine(
    (val) => {
      const num = Number(val);
      return num >= 16 && num <= 99;
    },
    {
      message: "Required range from 16-99",
    }
  ),
  pokemonName: z.object(
    {
      name: z.string().min(1, "Choose something"),
      id: z.number().optional(),
    },
    { required_error: "Choose something" }
  ),
});

export const useRegisterTrainerForm = () => {
  const { register, reset, handleSubmit, control, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainerName: "",
      age: "",
      pokemonName: { id: undefined, name: "" },
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Submitting form");
    console.log(data);
  });

  const pokemonQuery = watch("pokemonName").name

  return { register, control, reset, onSubmit, pokemonQuery, setValue };
};
