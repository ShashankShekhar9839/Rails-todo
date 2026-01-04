import { memo, useEffect, useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    let fetchTodos = async () => {
      let response = await fetch("http://localhost:3000/todos", {
        headers: getAuthHeaders(),
      });
      let data = await response.json();

      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!todoTitle.trim()) return;

    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        todo: {
          title: todoTitle,
          completed: false,
        },
      }),
    });
    const newTodo = await response.json();
    setTodos((prev) => [...prev, newTodo]);
    setTodoTitle("");
  };

  const handleDeleteTodo = async (id) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = async (id, completed) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        todo: { completed },
      }),
    });
    let updatedTodo = await response.json();
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.addTodo}>
        <input
          type="text"
          placeholder="Add a new task"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>
          Add Task
        </button>
      </div>

      <div style={styles.todoList}>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo.title}
            id={todo.id}
            onTodoDelete={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
            completed={todo.completed}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
  },
  addTodo: {
    display: "flex",
    marginBottom: "2rem",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px 0 0 4px",
    fontSize: "1rem",
  },
  addButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "0 4px 4px 0",
    cursor: "pointer",
    fontSize: "1rem",
  },
  todoList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};

export default memo(TodoList);
