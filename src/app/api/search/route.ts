import searchPokemon from "@/lib/pokemon-search";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return new Response("Query parameter is required", { status: 400 });
  }

  const results = searchPokemon(query, 10)

  return NextResponse.json(results, { status: 200 });
}
