import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateVote (state, action) {
      const id = action.payload
      const anecdote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote);
    },

    appendAnecdote (state, action) {
      state.push(action.payload);
    },

    setAnecdotes (state, action) {
      return action.payload
    }
  }
})


export const { appendAnecdote, updateVote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newObj = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newObj));
  }
}

export default anecdoteSlice.reducer;