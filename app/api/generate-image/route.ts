import { NextRequest } from "next/server"
import sharp from "sharp"
import satori from "satori"
import { html } from "satori-html"

export async function GET(req: NextRequest): Promise<Response> {
  const pinataImg =
    "https://peach-genuine-lamprey-766.mypinata.cloud/ipfs/QmT9CUswC8KrbHahb7KzWQ4kfr7qr8p8qvpKuHKRsRseXK"

  let backgroundHtml = `<img src="https://journalducoin-com.exactdn.com/app/uploads/2024/03/Dencun-ethereum-1.jpg?strip=all&lossy=1&quality=90&webp=90&resize=1160%2C653&ssl=1"
  			style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: -1; filter: blur(0px) brightness(80%);">
  		`

  let frameImage: any = `
      <div style="display:flex; width:100%; height:100%; background-color:#000;">
        ${backgroundHtml}
        <img src=${pinataImg}
          style="height: 100%; width: 100%; object-fit: contain">
        <div style="z-index:100; position:absolute; top:20px; right:40px; font-family:'BluuNext-Bold'; font-size: 24px; color:#F3BA14;">Zouzie</div>
        <img src=${pinataImg}
          style="z-index:100; position:absolute; top:22px; left:45px; width:5%;">
      </div>`
  frameImage = html(frameImage)

  const fontResponse = await fetch(
    `http://localhost:3000/fonts/Roboto-Regular.ttf`
  )
  if (!fontResponse.ok) {
    console.error(
      `Failed to load font: ${fontResponse.status} ${fontResponse.statusText}`
    )
    return new Response(null)
  }
  const fontData = await fontResponse.arrayBuffer()

  const svg = await satori(frameImage, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Roboto-Regular",
        data: fontData,
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
