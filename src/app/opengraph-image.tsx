import { ImageResponse } from "next/og";

export const alt = "Peter Conley — GTM Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0e",
          backgroundImage:
            "linear-gradient(#1c2028 1px, transparent 1px), linear-gradient(90deg, #1c2028 1px, transparent 1px), radial-gradient(60% 70% at 15% 0%, rgba(74,143,224,0.16) 0%, rgba(10,11,14,0) 60%)",
          backgroundSize: "28px 28px, 28px 28px, 100% 100%",
          padding: 80,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            color: "#e4e5e8",
            fontFamily: "monospace",
            letterSpacing: 4,
          }}
        >
          <div style={{ display: "flex" }}>GTME</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Sales Rep turned GTM Engineer
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#8a8d94" }}>
            Top-performing SDR &amp; AE, now a GTM Engineer.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 27,
            color: "#d4d4d8",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 2,
              background: "rgba(74,143,224,0.12)",
              border: "1px solid rgba(74,143,224,0.4)",
              color: "#8fb8ea",
              fontFamily: "monospace",
            }}
          >
            205% quota
          </div>
          <div style={{ display: "flex" }}>127% peak · $50K–$300K deals</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
