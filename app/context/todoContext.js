"use client";
import { createContext, useEffect, useState } from "react";
let TODO_CONTEXT = createContext();
let TODO_PROVIDER = ({ children }) => {
  let [todos, setTodos] = useState(() => {
    let localTodos =
      typeof window !== "undefined" ? localStorage.getItem("todos") : false;
    return localTodos ? JSON.parse(localTodos) : [];
  });
  // ADD TODOS
  let addTodos = (title) => {
    let data = { title, isCompleted: false, id: Date.now() };
    setTodos([...todos, data]);
  };
  // Toggle Checkox
  let toggleCheckbox = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo?.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      })
    );
  };
  // EDIT TODOS
  let editTodos = (id, title) => {
    setTodos(
      todos.map((todo) => {
        return todo?.id === id ? { ...todo, title } : todo;
      })
    );
  };
  // DELETE TODOS
  let deleteTodos = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TODO_CONTEXT.Provider
      value={{ addTodos, todos, deleteTodos, editTodos, toggleCheckbox }}
    >
      {children}
    </TODO_CONTEXT.Provider>
  );
};
export { TODO_CONTEXT, TODO_PROVIDER };
