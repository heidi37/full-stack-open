import { useState } from "react"

const App = () => {
  const [value, setValue] = useState(10)


const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
}

  return (
    <div>
      {value}&nbsp;
      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue((prev) => prev + 1)}>increment</button>
    </div>
  )
}

export default App
