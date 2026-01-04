function Todo({ todo = "", id, onTodoDelete, onUpdateTodo, completed }) {
  return (
    <div style={styles.todoItem}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onUpdateTodo(id, !completed)}
        style={styles.checkbox}
      />
      <p
        style={{
          ...styles.todoText,
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {todo}
      </p>
      <button onClick={() => onTodoDelete(id)} style={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
}

const styles = {
  todoItem: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  checkbox: {
    marginRight: "1rem",
  },
  todoText: {
    flex: 1,
    margin: 0,
    fontSize: "1rem",
    color: "#333",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default Todo;
