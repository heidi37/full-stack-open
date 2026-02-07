import React from 'react'
import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

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
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App
