// /* eslint-disable react/jsx-key */
import { decodeFrameData } from "@/utils"
import { Button, createFrames } from "frames.js/next"
export const dynamic = "force-dynamic"

const fightFrame = createFrames()
const handleRequest = fightFrame(async (ctx) => {
  const data = await ctx.request.json()
  const { frameMessage } = await decodeFrameData(data)
  const inputValue = frameMessage.inputText
  const randomIndex = Math.floor(Math.random() * 100)

  return {
    image: `http://localhost:3000/api/generate-image?username=${inputValue}&randomIndex=${randomIndex}`,
    buttons: [
      <Button action="post" target="/landing">
        Go to landing
      </Button>,
    ],
  }
})

export const GET = handleRequest
export const POST = handleRequest
