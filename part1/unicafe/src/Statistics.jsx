import StatisticsLine from "./StatisticsLine"

const Statistics = (props) => {
  return (
    <>
      <h2>statistics</h2>
      {props.total ? 
      <>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={props.total} />
      <StatisticsLine text="average" value={props.average} />
      <StatisticsLine text="positive" value={props.positive * 100} /> </>
      : <p>No feedback given</p>}
    </>
  )
}

export default Statistics
