# Redux Toolkit

> ### Importent Concepts

1. **Store**: A "store" refers to the central data store or state container that holds the entire state of your application ie global context.
2. **Reducer**: The state in the store is modified using functions called "reducers". Reducers take the current state and an action as arguments and return a new state. Its an Object.
3. **Actions**: Actions are plain JavaScript objects that describe what should change in the state. They typically have a type field to indicate the action type and can carry additional data as needed.
4. **Middleware**: Middleware can be used to add additional functionality to Redux, such as logging, asynchronous operations, and more.
5. **Selectors**: Selectors are functions used to extract specific pieces of data from the store.
6. **Immutability**: In Redux, the state is immutable, which means it cannot be changed directly. Instead, when you want to update the state, you create a new copy of the state with the desired changes.

> ### Importent methods from "react-redux"

1. **useSelector**: The useSelector hook is a crucial part of the react-redux library, which is used for integrating Redux with React applications. useSelector allows you to extract or select the data from your Redux store's state and use it within your React components.
2. **useDispatch**: Used for dispatching actions to your Redux store from within React components (Add todos to the list). It provides access to the dispatch function, which allows you to trigger changes or dispatch or send some changes to the Redux state by dispatching actions.

# Redux Toolkit Setup

#### Step 1 : Configure the Store.

1. **Store** refers to the **_central data store_**, holds the entire state of your application
2. **configureStore()** is a function, used to create a Redux store.
3. It combines several Redux-related setup steps into a single function call, such as creating the Redux store, setting up Redux DevTools, and adding middleware.
4. **Create a store.js file inside store folder where we initialize the Store. It looks like this:**

```javascript
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({});
```

> src / store / store.js

5. **Note:** Store is not ready yet. We have to inform the reducers to store.

---

#### Step 2 : Create Slices.

1. **Slice** is a collection of **_Redux Reducer_** logic and **_Actions_** for **_a single feature_** in your app, typically defined together in a single file. The name comes from splitting up the root Redux state object into multiple "slices" of state.
2. **createSlice()** is a utility function that simplifies the process of **_creating Redux actions and reducers_**.
3. It generates a reducer function along with action creators for a specific slice of your application state.
4. **Create a todoSlice.js file inside a feature folder where we initialize the Store. It looks like this:**

```javascript
import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({});
```

> src / feature / todoSlice.js

5. **createSlice** accepts a single configuration object parameter, with the following options:

```javascript
function createSlice({
    // A name, used in action types
    name: string,
    // The initial state for the reducer, can be object or string )
    initialState: Any,
    reducers:{
        ADD_TODO: (state, action) => {
            const data = {
            id: random_string,
            text: action.payload.text,
            },
            state.todos.push(data);
        },
        REMOVE_TODO: (state, action) => {...}
    }})
```

6. **InitialState** : Will store all the initial data of our app.

   ```javascript
   const initialState = {
     todos: [{ id: 1, text: "hello world" }],
   };
   ```

7. **State** will indicate the initial state and **Action** will describe what should change in the state inside any reducer function.

   ```javascript
   reducers:{
       ADD_TODO: (state, action) => {
           const data = {
           id: random_string,
           text: action.payload.text,
           },
           state.todos.push(data);
       },
       REMOVE_TODO: (state, action) => {...}
   }
   ```

8. **Export**: We have to export 2 parts of this current slice.

   1. **Export all the functionalities (Action creators)** like add_todo , remove_todo etc . It will be used in indivudial components to update the state directly.

   ```javascript
   export const { ADD_TODO, REMOVE_TODO } = todoSlice.actions;
   ```

   2. **Export Reducer**. Our global store needs the information about the reducers to maintain the store. So global store must aware of all the registered reducers in the app.

   ```javascript
   export const todoReducer = todoSlice.reducer;
   ```

9. So basically the **Slice** will look like this :

```javascript
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "hello world" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    ADD_TODO: (state, action) => {},
    REMOVE_TODO: (state, action) => {},
  },
});

export const { ADD_TODO, REMOVE_TODO } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
```

---

#### Step 3 : Inform Store about the Reducers created inside Slices.

After creating the feature Slices (eg: todoSlice), we need to pass the reducer
as parameter in the store. So that our store will aware of the reducers.

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "../feature/todoSlice";

export const store = configureStore({
  reducer: todoReducer,
});
```

---

#### Step 4: Wrap our entry-point with Redux Provider.

Wraping our main entry-point with Provider component so that all the components can access the datas from the Global store directly.

```javascript
import { Provider } from "react-redux";
import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

> src / main.jsx

#### Step 5: Select and Dispatch data in UI

##### Actions: Add (Dispatch) some data to Store.

1. The **useDispatch hook** is another essential part of the react-redux library, used for **_dispatching actions to your Redux store from within React components_**.
2. It provides access to the dispatch function, which allows you to trigger changes to the Redux state by dispatching actions.
3. Dispatch will update Store using any reducer(Eg: ADD_TODO, REMOVE_TODO)

In UI:

```javascript
const dispatch = useDispatch();

const addTodoHandler = () => {
  dispatch(ADD_TODO(data));
};
```

> src / components / AddTodo.jsx

At Redux side:

```javascript
reducers: {
  ADD_TODO: (state, action) => {
    const data = {
      id: nanoid(),
      text: action.payload,
    };
    state.todos.push(data);
  };
}
```

> src / feature / todoSlice.js

**NOTE:** We cant acces state directly in the ui. For this we need **useSelecter()** method.

---

##### Actions: Access (Select) the global data (state or initialState) from Store.

1. The **useSelector hook** is a crucial part of the react-redux library, which is used for **_integrating Redux with React applications_**.
2. useSelector allows you to extract data from your Redux store's state and use it within your React components.
3. In your React component, using useSelector hook select the data you want from the Redux store. Pass in a function that takes the entire Redux state as an argument and returns the specific data you need. This function is called a "selector."

```javascript
const storeData = (state) => state.todos;
const todos = useSelector(storeData);

 {storeData.map((todo) => ( ... ))}
```

> Check - src / components / Todos.js
