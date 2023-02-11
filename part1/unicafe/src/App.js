import { useState } from "react";

const Header = () => <h1>give feedback</h1>;

const Button = (props) => {
  const {handleClick, text} = props;
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const StatHeader = () => <h2>statistics</h2>;

const StatLine = (props) => (
  <div>
    {props.text} {props.value}
  </div>
);


const App = () => {
  // save click of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + bad + neutral;
  const score = good - bad;
  const avg = total === 0 ? 0 : score / total;
  const pos = total === 0 ? 0 : (good / total) * 100;

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
      <StatHeader />
      <StatLine text='good' value={good} />
      <StatLine text='neutral' value={neutral} />
      <StatLine text='bad' value={bad} />
      <StatLine text='all' value={total} />
      <StatLine text='average' value={avg} />
      <StatLine text='positive' value={`${pos} %`} />
    </div>
  )
}

export default App
