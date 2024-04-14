import { getFrameMessage } from "frames.js"
import sharp from "sharp"
import satori from "satori"

async function decodeFrameData(data: any) {
  const frameMessage = await getFrameMessage(data)
  const userFid = frameMessage.requesterFid
  const userData = frameMessage.requesterUserData
  return { userFid, userData, frameMessage }
}

async function getOptimizedFrame(frameImage: any): Promise<Buffer> {
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
  return response
}

export { decodeFrameData, getOptimizedFrame }
