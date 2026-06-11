export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt") ?? "educational diagram";
  const encoded = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 999999);

  const url = `https://image.pollinations.ai/prompt/${encoded}?width=800&height=600&seed=${seed}&nologo=true&enhance=true`;

  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") ?? "image/jpeg";

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
