import React from "react";
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../feature/todoSlice";

function AddTodo() {
  const [input, setInput] = React.useState("");

  const dispatch = useDispatch();
  // Dispatch will update Store using any reducer(Add_todo)

  const addTodoHandler = (e) => {
    e.preventDefault();
    // console.log("Want to add todo: " + input);
    if (input.length > 0) {
      dispatch(ADD_TODO(input));
      setInput("");
    } else {
      alert("Field is empty!");
    }
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
