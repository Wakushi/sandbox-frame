export const dynamic = "force-dynamic"
import { NextRequest } from "next/server"
import XPBar from "@/lib/xp-bar"
import { getOptimizedFrame } from "@/utils"

export async function GET(req: NextRequest): Promise<Response> {
  const requestURL = req.url
  const searchParams = new URLSearchParams(requestURL.split("?")[1])
  const username = searchParams.get("username")

  const frameImage = (
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
        <div
          style={{
            display: "flex",
          }}
        >
          <Monster />
          <Monster />
          <Monster />
          <Monster />
        </div>
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
        <div
          style={{
            display: "flex",
          }}
        >
          <Monster />
          <Monster />
          <Monster />
          <Monster />
        </div>
      </div>
    </div>
  )

  const response = await getOptimizedFrame(frameImage)

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=0",
    },
  })
}

function Monster() {
  return (
    <div
      style={{
        display: "flex",
        width: "200px",
        height: "200px",
      }}
    >
      <img
        src="https://global.discourse-cdn.com/bubble/original/3X/b/8/b8766ed95f283df29e94fc8304b9c2d93dd2add8.png"
        alt="monster"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  )
}
