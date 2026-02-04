import { useState } from "react"
import Display from "./Display"
import Button from "./Button"

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter((prevState) => prevState + 1)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter((prevState) => prevState - 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <>
    <Display counter={counter} />
    <Button text="+1" onclick={increaseByOne} />
    <Button text="-1" onclick={decreaseByOne} />
    <Button text="Reset" onclick={setToZero} />
    </>
  )
}

export default App
