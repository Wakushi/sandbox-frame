import { getFrameMessage } from "frames.js"

async function decodeFrameData(data: any) {
  const frameMessage = await getFrameMessage(data)
  const userFid = frameMessage.requesterFid
  const userData = frameMessage.requesterUserData
  return { userFid, userData, frameMessage }
}

export { decodeFrameData }
