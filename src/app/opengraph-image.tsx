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
          background: "#08080a",
          backgroundImage:
            "radial-gradient(60% 70% at 15% 0%, rgba(220,38,38,0.22) 0%, rgba(8,8,10,0) 60%)",
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
            color: "#e4e4e7",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 999,
              background: "#dc2626",
              display: "flex",
            }}
          />
          <div style={{ display: "flex" }}>Peter Conley</div>
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
            Sales Rep → GTM Engineer
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#a1a1aa" }}>
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
              borderRadius: 999,
              background: "rgba(220,38,38,0.15)",
              border: "1px solid rgba(220,38,38,0.4)",
              color: "#fca5a5",
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
