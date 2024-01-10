import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState(""); // New state for description

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setTodos(todos);
    }
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3 && dueDate) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content, dueDate, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setDueDate("");
      setDescription("");
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <main className="container">
      <h1 className="title">TODO APPLICATION</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input 
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          className="form__input"
          required 
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="form__input"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description..."
          className="form__input"
        />
        <button className="form__button" type="submit">Create Todo</button>
      </form>
      <div className="todos">
        {(todos.length > 0) &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))
        }
      </div>
    </main>
  );
}
