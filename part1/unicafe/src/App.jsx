import React from 'react'
import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [scores, setScores] = useState([])

  const total = good + neutral + bad
  const average = scores.length > 0 ? scores.reduce((total, value) => total + value, 0) / scores.length : 0
  const positive = scores.length > 0 ? good / total : 0

  const handleGoodClick = () => {
    setGood(prev => prev + 1)
    addScoreValue(1)
  }
  const handleNeutralClick = () => {
    setNeutral(prev => prev + 1)
    addScoreValue(0)
  }
  const handleBadClick = () => {
    setBad(prev => prev + 1)
    addScoreValue(-1)
  }

  const addScoreValue = (scoreValue) => setScores(scores.concat(scoreValue))

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleGoodClick()}>good</button>
      <button onClick={() => handleNeutralClick()}>neutral</button>
      <button onClick={() => handleBadClick()}>bad</button>
      <h2>statistics</h2>
      <p>good: {good}<br/>neutral: {neutral}<br/>bad: {bad}<br/>
      all: {total} <br/>
      average: {average} <br/>
      positive: {positive * 100}% <br/>
      </p>
    </div>
  )
}

export default App
