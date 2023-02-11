import { useState } from "react";

const Header = () => <h1>give feedback</h1>;

const Button = (props) => {
  const {handleClick, text} = props;
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const Statistics = () => <h2>statistics</h2>;

const StatLine = (props) => (
  <div>
    {props.text} {props.count}
  </div>
);

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
      <Statistics />
      <StatLine text='good' count={good} />
      <StatLine text='neutral' count={neutral} />
      <StatLine text='bad' count={bad} />
    </div>
  )
}

export default App
