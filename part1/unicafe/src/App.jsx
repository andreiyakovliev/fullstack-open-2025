import { useState } from "react"

const Button = (props) => {
  const { onClick, text } = props;
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const Statistics = (props) => {
  const { feedback } = props;

  const average = ((feedback.good * 1 + feedback.neutral * 0 + feedback.bad * (-1)) / feedback.allClicks).toFixed(1);
  const positive = (feedback.good / feedback.allClicks * 100).toFixed(1) + ' %';

  if (feedback.allClicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <StatisticLine text={'good'} value={feedback.good} />
        <StatisticLine text={'neutral'} value={feedback.neutral} />
        <StatisticLine text={'bad'} value={feedback.bad} />
        <StatisticLine text={'all'} value={feedback.allClicks} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text={'positive'} value={positive} />
      </div>
    )
  }
}

const StatisticLine = (props) => {
  const { text, value } = props;

  return (
    <div>
      <div>{text}: {value}</div>
    </div>
  )

}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAllClicks] = useState(0);

  const handleGoodClick = () => {
    setAllClicks(allClicks + 1);
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setAllClicks(allClicks + 1);
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setAllClicks(allClicks + 1);
    setBad(bad + 1);
  }

  const feedback = {
    good: good,
    neutral: neutral,
    bad: bad,
    allClicks: allClicks,
  }

  return (
    <div>
      <h1 style={{ fontWeight: 'bold' }}>give feedback</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
      </div>

      <h2 style={{ fontWeight: 'bold' }}>statistics</h2>
      <Statistics feedback={feedback} />
    </div>
  )
}

export default App