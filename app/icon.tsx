import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/** Tan "A" on the ink ground — the Spine's palette at favicon scale. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1224",
          color: "#DCBE9F",
          fontSize: 22,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
        }}
      >
        A
      </div>
    ),
    size,
  )
}
