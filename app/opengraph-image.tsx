import { ImageResponse } from "next/og";
import { company } from "@/core";

export const runtime = "edge";
export const alt = `${company.brandName} — commercial software for companies`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(145deg, #05070d 0%, #0a0e18 45%, #12182a 100%)",
          padding: "64px",
          color: "#eef2ff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            letterSpacing: "-0.02em",
            color: "#2de2e6",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              border: "2px solid #2de2e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            V
          </div>
          Vortex Dispatch
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            {company.heroHeadline}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#9aa6c2",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Commercial software products and platforms for businesses that need
            more than a brochure site.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#6b7694",
          }}
        >
          <span>Software studio · South Africa</span>
          <span style={{ color: "#7c6cff" }}>vortexdispatch.co.za</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
