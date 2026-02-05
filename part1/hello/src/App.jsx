import { useState } from "react"
import Button from "./Button"

const App = () => {
  const [value, setValue] = useState(10)


const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
}

  return (
    <div>
      {value}&nbsp;
      <Button onClick={() => setToValue(1000)} text="thousand"/>
      <Button onClick={() => setToValue(0)} text="reset"/>
      <Button onClick={() => setToValue(prev => prev + 1)} text="increment"/>
    </div>
  )
}

export default App
