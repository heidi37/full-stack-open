import { useState } from "react"
import History from "./History"
import Button from "./Button"

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  })
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)


  function handleLeftClick() {
    setAll(allClicks.concat("L"))
    setClicks({
      ...clicks,
      left: clicks.left + 1,
    })
    setTotal((prev) => prev + 1)
  }

  function handleRightClick() {
    setAll(allClicks.concat('R'))
    setClicks({
      ...clicks,
      right: clicks.right + 1,
    })
    setTotal((prev) => prev + 1)
  }

  return (
    <div>
      {clicks.left}&nbsp;
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      &nbsp;{clicks.right}
      <History allClicks={allClicks}/>
      <p><strong>Total: {total}</strong></p>
    </div>
  )
}

export default App
