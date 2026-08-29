import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { restaurant } from "@/config/restaurant";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = restaurant.name;

export default async function OgImage() {
  // satori (next/og) cannot decode WebP for embedded <img>, so the OG card
  // uses the PNG. It is read at build time and inlined — never shipped to the client.
  const logo = await readFile(
    join(process.cwd(), "public/images/brand/logo-square.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #2a0f0e 0%, #5c1715 55%, #1c1512 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={restaurant.name} width={440} height={440} />
        <div style={{ fontSize: 30, color: "#d8cbbd", marginTop: 16 }}>
          Kharadi, Pune
        </div>
      </div>
    ),
    { ...size }
  );
}
