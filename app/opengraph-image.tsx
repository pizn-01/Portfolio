import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "M. Airaf Adil — Lead Full Stack Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Generated at the edge so the social card never drifts from the site's
 * palette, and so shipping it doesn't depend on someone exporting a PNG.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1224",
          padding: 80,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* The Spine, flattened into a static rule */}
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 0,
            bottom: 0,
            width: 1,
            background: "rgba(220,190,159,0.35)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 1, background: "#DCBE9F" }} />
          <div
            style={{
              color: "#DCBE9F",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Lead Full Stack Engineer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#F1E7D7", fontSize: 128, lineHeight: 1 }}>
            M. Airaf
          </div>
          <div
            style={{
              color: "#DCBE9F",
              fontSize: 128,
              lineHeight: 1,
              fontStyle: "italic",
            }}
          >
            Adil
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 48,
            color: "#8FA0C4",
            fontSize: 24,
            fontFamily: "monospace",
          }}
        >
          <span>Karachi, PK</span>
          <span>Building since 2019</span>
          <span>github.com/pizn-01</span>
        </div>
      </div>
    ),
    size,
  )
}
