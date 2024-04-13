export default function XPBar({
  currentXp,
  currentLevel,
}: {
  currentXp: number
  currentLevel: number
}) {
  const nextLevelXp = 200
  const xpPercentage = (currentXp / nextLevelXp) * 100
  return (
    <div tw="flex flex-col">
      <div
        style={{
          display: "flex",
          width: "500px",
          height: "30px",
          backgroundColor: "#fff",
          border: "1px solid #fff",
          borderRadius: "1rem",
          boxShadow: "0 0 5px #333",
          position: "relative",
          overflow: "hidden",
          margin: "1rem 0 0 0",
        }}
      >
        <div
          style={{
            width: `${xpPercentage}%`,
            height: "100%",
            background: "linear-gradient(to right, #0074D9, #7FDBFF)",
          }}
        ></div>
      </div>
      <div tw="flex" style={{ justifyContent: "space-between", color: "#fff" }}>
        <p
          tw="p-0 m-0"
          style={{
            fontSize: "2rem",
          }}
        >
          lvl{currentLevel}
        </p>
        <p
          tw="p-0 m-0"
          style={{
            fontSize: "1.8rem",
          }}
        >
          {currentXp}/{nextLevelXp}xp
        </p>
        <p
          tw="p-0 m-0"
          style={{
            fontSize: "2rem",
          }}
        >
          lvl{currentLevel + 1}
        </p>
      </div>
    </div>
  )
}
