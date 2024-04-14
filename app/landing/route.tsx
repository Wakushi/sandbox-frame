/* eslint-disable react/jsx-key */
import { Button, createFrames } from "frames.js/next"

const landingFrame = createFrames({
  basePath: "/landing",
})

const handleRequest = landingFrame(async (ctx) => {
  return {
    image: <span>Landing</span>,
    buttons: [
      <Button action="post" target="/fight">
        Go to fight
      </Button>,
    ],
    textInput: "Enter your name",
  }
})

export const GET = handleRequest
export const POST = handleRequest
