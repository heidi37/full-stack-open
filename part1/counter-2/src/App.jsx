import { useState } from "react"

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  function setClicksLeft() {
      setClicks({
        right: right,
        left: left + 1
      })
  }

  function setClicksRight(prev) {
      setClicks({
        ...prev,
        right: right + 1
      })
  }

  return (
    <div>
      {clicks.left}&nbsp;
      <button onClick={() => setClicksLeft()}>
        left
      </button>
      <button onClick={() => setClicksRight()}>
        right
      </button>
      &nbsp;{clicks.right}
    </div>
  )
}

export default App
