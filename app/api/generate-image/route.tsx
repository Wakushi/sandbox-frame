export const dynamic = "force-dynamic"
import { NextRequest } from "next/server"
import sharp from "sharp"
import satori from "satori"
import XPBar from "@/lib/xp-bar"

export async function GET(req: NextRequest): Promise<Response> {
  const requestURL = req.url
  const searchParams = new URLSearchParams(requestURL.split("?")[1])
  const username = searchParams.get("username")

  let frameImage: any = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
      }}
    >
      <img
        src="https://cdn.pixabay.com/photo/2023/09/01/17/42/forest-8227410_1280.jpg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      ></img>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <p
          style={{
            zIndex: 100,
            position: "relative",
            fontFamily: "Jersey20-Regular",
            fontSize: 90,
            color: "#fff",
            textShadow: "0px 0px 12px #111",
          }}
        >
          {username}
        </p>
        <XPBar currentXp={100} currentLevel={1} />
      </div>
    </div>
  )

  const jerseyFontResponse = await fetch(
    `http://localhost:3000/fonts/Jersey20-Regular.ttf`
  )
  const jerseyFont = await jerseyFontResponse.arrayBuffer()

  const svg = await satori(frameImage, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Jersey20-Regular.ttf",
        data: jerseyFont,
        weight: 700,
        style: "normal",
      },
    ],
  })
  const svgBuffer = Buffer.from(svg)
  const png = sharp(svgBuffer).png()
  const response = await png.toBuffer()

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=0",
    },
  })
}
