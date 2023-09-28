import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <>
      <section className="h-screen bg-black text-white p-16 text-center">
        <h1 className="text-2xl font-bold">Redux Toolkit Todo</h1>

        <AddTodo />
        <Todos />
      </section>
    </>
  );
}

export default App;
