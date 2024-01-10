// Todo.js

import React, { useState } from "react";

const Todo = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(todo.todo);

  const handleUpdate = () => {
    // Perform any validation or additional logic before updating
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t._id === todo._id ? { ...t, todo: updatedContent } : t
      )
    );
    setIsEditing(false);
  };

  return (
    <div className="todo">
      <input type="checkbox" checked={todo.completed} onChange={() => {/* Handle checkbox change */}} />
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <>
          <div className="todo-info">
            <span>{todo.todo}</span>
            <span>{todo.shortTitle}</span>
            <span>{todo.shortDate}</span>
            <span>{todo.dueDate}</span>
            <span>{todo.description}</span> {/* Display description */}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todo._id))}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Todo;
