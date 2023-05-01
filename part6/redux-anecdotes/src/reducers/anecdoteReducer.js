import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote (state, action) {
      const { id, anecdote:updatedAnecdote } = action.payload;
      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote);
    },

    appendAnecdote (state, action) {
      state.push(action.payload);
    },

    setAnecdotes (state, action) {
      return action.payload
    }
  }
})


export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions;

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

export const updateVote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdote = state.anecdotes.find(anecdote => anecdote.id === id)
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.update(id, votedAnecdote);
    dispatch(updateAnecdote({
      id,
      anecdote: votedAnecdote
    }))
  }
}

export default anecdoteSlice.reducer;