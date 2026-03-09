import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Standing History — Football Standings Archive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0f2744 60%, #0a1628 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Green gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            "linear-gradient(90deg, transparent, #16a34a, transparent)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "#16a34a",
            borderRadius: "14px",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            fontWeight: "900",
            color: "white",
            letterSpacing: "-1px",
          }}
        >
          SH
        </div>
        <span
          style={{
            color: "#e2e8f0",
            fontSize: "30px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
          }}
        >
          Standing
          <span style={{ color: "#16a34a" }}>History</span>
        </span>
      </div>

      {/* Headline */}
      <h1
        style={{
          color: "white",
          fontSize: "68px",
          fontWeight: "800",
          lineHeight: "1.05",
          margin: "0 0 28px",
          letterSpacing: "-2px",
        }}
      >
        Football Standings <span style={{ color: "#16a34a" }}>Archive</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          color: "#94a3b8",
          fontSize: "28px",
          margin: "0 0 48px",
          lineHeight: "1.4",
        }}
      >
        Replay any matchweek across Europe&apos;s top leagues
      </p>

      {/* League pills */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {[
          "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League",
          "🇪🇸 La Liga",
          "🇮🇹 Serie A",
          "🇩🇪 Bundesliga",
          "🇫🇷 Ligue 1",
        ].map((league) => (
          <div
            key={league}
            style={{
              background: "rgba(22, 163, 74, 0.12)",
              border: "1px solid rgba(22, 163, 74, 0.35)",
              borderRadius: "100px",
              padding: "10px 20px",
              color: "#4ade80",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {league}
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}
