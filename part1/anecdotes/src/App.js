import { useState } from 'react'

const Button = (props) => {
  const {handleClick, text} = props;
  return (
    <button onClick={handleClick}>{text}</button>
  );
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const randomGenerate = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  console.log(votes);

  const handleAnecdoteClick = () => {
    const randomNum = randomGenerate(0, anecdotes.length);
    console.log(randomNum);
    setSelected(randomNum);
  }

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    console.log(copy[selected]);
    setVotes(copy);
  }

  const indexOfMaxValue = votes.reduce(
    (iMax, x, i, arr) => x > arr[iMax] ? i: iMax,
    0
  );

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleAnecdoteClick} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexOfMaxValue]}</p>
      <p>has {votes[indexOfMaxValue]} votes</p>
    </div>
  )
}

export default App