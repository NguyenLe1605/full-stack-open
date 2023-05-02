import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAll, update } from './requests'

const App = () => {

  const result = useQuery(
    "anecdotes", getAll,
    {
      retry: 1,
      refetchOnWindowFocus: false,
    } 
  );

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote);
      queryClient.setQueryData("anecdotes", updatedAnecdotes);
    }
  })

  if (result.isLoading) {
    return <div>...Please wait for a moment</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log(`vote ${anecdote.id}`)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1});
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
