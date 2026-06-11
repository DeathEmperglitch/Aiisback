"use client";

import { useState } from "react";
import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { ImageIcon, DownloadIcon, ZoomInIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type GenerateImageResult = {
  imageUrl: string;
  prompt: string;
  title: string;
};

export const GenerateImageTool: ToolCallMessagePartComponent = ({ part }) => {
  const [lightbox, setLightbox] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const status = part.status?.type;
  const result = part.result as GenerateImageResult | undefined;

  // While the tool is running
  if (status === "running" || (!result && status !== "complete")) {
    return (
      <div className="my-2 flex items-center gap-3 rounded-xl border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        <ImageIcon className="size-4 animate-pulse" />
        <span>Generating image…</span>
      </div>
    );
  }

  if (!result?.imageUrl) return null;

  const { imageUrl, title, prompt } = result;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    a.target = "_blank";
    a.click();
  };

  return (
    <>
      <div className="my-3 overflow-hidden rounded-xl border bg-background shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ImageIcon className="size-4 text-primary" />
            <span>{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLightbox(true)}
              className="rounded p-1 hover:bg-muted transition-colors"
              title="View full size"
            >
              <ZoomInIcon className="size-3.5 text-muted-foreground" />
            </button>
            <button
              onClick={handleDownload}
              className="rounded p-1 hover:bg-muted transition-colors"
              title="Download image"
            >
              <DownloadIcon className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative bg-muted/20">
          {!loaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
          {error ? (
            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
              Failed to load image
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={prompt}
              className={cn(
                "w-full cursor-zoom-in object-contain transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0"
              )}
              style={{ maxHeight: "480px" }}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              onClick={() => setLightbox(true)}
            />
          )}
        </div>

        {/* Prompt caption */}
        <div className="px-3 py-2 text-xs text-muted-foreground italic border-t bg-muted/10">
          {prompt}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightbox(false)}
          >
            <XIcon className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={prompt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
