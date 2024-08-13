import searchPokemon from "@/lib/pokemon-search";
import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return new Response("Query parameter is required", { status: 400 });
  }

  const getResults = unstable_cache(
    async (query) => searchPokemon(query, 10),
    [query]
  );

  const results = await getResults(query);

  return NextResponse.json(results, {
    status: 200,
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
