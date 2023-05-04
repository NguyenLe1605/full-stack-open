import { createNew } from '../requests'
import { useNotification } from '../NotifContext';
import { useMutation, useQueryClient } from 'react-query'

const AnecdoteForm = () => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
      notify(`anecdote '${newAnecdote.content}' created `)
    },
    onError: ({response}) => {
      notify(`${response.data.error}`);
    } 
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
