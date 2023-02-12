import { useState } from "react";

const Header = () => <h1>give feedback</h1>;

const Button = (props) => {
  const {handleClick, text} = props;
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const total = good + bad + neutral;

  if (total === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  const score = good - bad;
  const avg = total === 0 ? 0 : score / total;
  const pos = total === 0 ? 0 : (good / total) * 100; 
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={avg} />
          <StatisticLine text='positive' value={`${pos} %`} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // save click of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    console.log("good");
    setGood(good + 1);
  }

  const handleBadClick = () => {
    console.log("bad");
    setBad(bad + 1);
  }

  const handleNeutralClick = () => {
    console.log("neutral");
    setNeutral(neutral + 1);
  }

  return (
    <div>
      <Header />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
