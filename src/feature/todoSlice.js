import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: nanoid(), text: "Add Todos" }],
};

// 2nd way to create reducers. Create a seperate function and pass its reference
const removeTodo = (state, action) => {
  // console.log("Calling REMOVE_TODO:");

  // console.log("Action is:");
  // console.log(action);
  state.todos = state.todos.filter((todo) => todo.id !== action.payload);
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // 1st way to create reducers. Directly create the function here.
    ADD_TODO: (state, action) => {
      // console.log("Calling ADD_TODO:");

      // console.log("Action is:");
      // console.log(action);

      const data = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(data);
    },

    // 2nd way to create reducers. Pass the function ref here..
    REMOVE_TODO: removeTodo,
  },
});

// NOTE: We have to export 2 parts of this current slice.
// 1. Export all the functionalities like add_todo , remove_todo etc (Action creators).
// Will used in indivudial components.
/* Reason: We will use them to update the state directly. 
So we need them indivudially. */
export const { ADD_TODO, REMOVE_TODO } = todoSlice.actions;

// 2. Export Reducer
/* Reason: Our global store needs the information about the reducers 
to maintain the store. So global store must aware of all the registered 
reducers in the app. */
export const todoReducer = todoSlice.reducer;
