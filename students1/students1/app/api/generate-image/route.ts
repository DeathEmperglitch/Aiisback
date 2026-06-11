export const maxDuration = 30;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt") ?? "a beautiful landscape";
  const seed = searchParams.get("seed") ?? String(Math.floor(Math.random() * 999999));

  const encoded = encodeURIComponent(prompt);
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encoded}?width=800&height=600&seed=${seed}&nologo=true&enhance=true`;

  // Proxy the image so it's served from the same origin
  const response = await fetch(pollinationsUrl);
  if (!response.ok) {
    return new Response("Image generation failed", { status: 502 });
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
