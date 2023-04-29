import { useDispatch, useSelector } from "react-redux";
import { updateVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ 
    content, 
    votes,
    handleClick
}) => {
    return (
        <div>
            <div>
                {content}
            </div>
            <div>
                has {votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = (props) => {

    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter( anecdote =>
            anecdote.content
                .toLowerCase()
                .includes(filter.toLowerCase())
        )
    })

    const dispatch = useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        dispatch(updateVote(id))
    }


    const anecdotesToShow = anecdotes.toSorted((a, b) => b.votes - a.votes)
    return (
        <div>
            {anecdotesToShow.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    content={anecdote.content}
                    votes={anecdote.votes}
                    handleClick={() => vote(anecdote.id)}
                />
            )}
        </div>
    )
}

export default AnecdoteList