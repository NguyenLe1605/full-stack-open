import { useSelector, useDispatch } from 'react-redux'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'

const App = () => {

  return (
    <div>
      <Anecdotes/>
      <NewAnecdote/>
    </div>
  )
}

export default App