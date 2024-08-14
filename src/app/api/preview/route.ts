import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const POKE_API = "https://pokeapi.co/api/v2";

const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
      }),
    })
  ),
  sprites: z.object({
    front_default: z.string(),
  }),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Id parameter is required", { status: 400 });
  }

  const result = await fetch(`${POKE_API}/pokemon/${id}`, {
    next: { revalidate: 3600 },
  });
  const data = await result.json();

  const { data: pokemon, error } = pokemonSchema.safeParse(data);

  if (error) {
    return new Response("Invalid response schema", { status: 400 });
  }

  return NextResponse.json(
    {
      name: pokemon.name,
      id: pokemon.id,
      baseExperience: pokemon.base_experience,
      img: pokemon.sprites.front_default,
      types: pokemon.types.map((type) => type.type.name),
    },
    {
      status: 200,
      headers: { "Cache-Control": "public, max-age=3600" },
    }
  );
}
