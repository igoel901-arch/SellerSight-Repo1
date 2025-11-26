import { NextResponse } from "next/server";

const EXA_API_KEY = process.env.EXA_API_KEY;

/**
 * POST /api/competitors
 * Body: { keyword: string }
 *
 * Uses Exa web search to find relevant competitor pages.
 */
export async function POST(req: Request) {
  try {
    if (!EXA_API_KEY) {
      return NextResponse.json(
        { error: "EXA_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const keyword = (body?.keyword || "").trim();

    if (!keyword) {
      return NextResponse.json(
        { error: "Missing 'keyword' in request body." },
        { status: 400 }
      );
    }

    // Call Exa search API
    const response = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": EXA_API_KEY,
      },
      body: JSON.stringify({
        query: keyword,
        numResults: 5,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Exa error:", text);
      return NextResponse.json(
        {
          error: "Exa search failed",
          details: text,
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    const results =
      data?.results?.map((r: any) => ({
        title: r.title ?? r.url ?? "Untitled result",
        url: r.url,
        snippet:
          r.snippet ??
          r.text?.slice(0, 200) ??
          "No snippet available.",
      })) ?? [];

    return NextResponse.json(
      {
        keyword,
        results,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in /api/competitors:", err);
    return NextResponse.json(
      {
        error: "Failed to search competitors",
        details: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

