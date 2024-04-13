// /* eslint-disable react/jsx-key */
import { Button, createFrames } from "frames.js/next"
export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"

// const fightFrame = createFrames()
// const handleRequest = fightFrame(async (ctx) => {
//   const imageResponse = await fetch("http://localhost:3000/api/generate-image")

//   console.log(imageResponse)
//   return {
//     image: <>sup</>,
//     buttons: [
//       <Button action="post" target="/landing">
//         Go to landing
//       </Button>,
//     ],
//   }
// })

// export const GET = handleRequest
// export const POST = handleRequest
export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<Response> {
  return new Response(
    `
  <!DOCTYPE html>
  <html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="http://localhost:3000/api/generate-image" />
    <meta property="fc:frame:button:1" content="⬅️ Previous" />
    <meta property="fc:frame:button:2" content="➡️ Next" />
    <meta property="fc:frame:button:3" content="🎲 Random" />
    <meta property="fc:frame:button:4" content="🎨 2D/PFP/Pixel" />
    <meta property="fc:frame:post_url" content="http://localhost:3000/landing" />
  </head>
  </html>
`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=0",
      },
    }
  )
}
