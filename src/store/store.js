import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "../feature/todoSlice";

// step 1 : Initialize the Global store.
// export const store = configureStore({});

// step 2 : Initialize the Slices for reducer and actions.
// Check src/feature/todoSlice.js

// step 3 : Introduce the reducer created in slices in the store.
/* After creating the feature Slices (eg: todoSlice), we need to pass the reducer 
as parameter in the store. So that our store will aware of the reducers. */
export const store = configureStore({
  reducer: todoReducer,
});
