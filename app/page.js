// app/page.js or app/todo/page.js
"use client";

import { useContext, useState } from "react";
import { TODO_CONTEXT } from "./context/todoContext";

const Page = () => {
  // use uppercase for React component
  let [currentTodo, setCurrentTodo] = useState("");
  let [buttonText, setButtonText] = useState("ADD");
  let [currentEditId, setCurrentEditId] = useState(0);
  let { addTodos, todos, deleteTodos, editTodos, toggleCheckbox } =
    useContext(TODO_CONTEXT);

  let submitForm = (e) => {
    e.preventDefault();
    if (!currentTodo.length) return;
    buttonText === "ADD" && addTodos(currentTodo);
    buttonText === "SUBMIT" && editTodos(currentEditId, currentTodo);
    setCurrentTodo("");
  };

  let editFunctionality = (id, title) => {
    setButtonText("SUBMIT");
    setCurrentEditId(id);
    setCurrentTodo(title);
  };

  return (
    <>
      <h1>TO-DO List</h1>
      <form onSubmit={submitForm}>
        <input
          type="text"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
        />
        <input type="submit" value={buttonText} />
      </form>
      {todos.map((todo) => {
        return (
          <div key={todo?.id}>
            <input
              type="checkbox"
              checked={todo?.isCompleted}
              onClick={() => {
                toggleCheckbox(todo?.id);
              }}
            />
            <span
              style={
                todo?.isCompleted ? { textDecoration: "line-through" } : {}
              }
            >
              {todo?.title}
            </span>
            <span>
              {`   ----- ---- --- -- - `}
              <span
                onClick={() => {
                  editFunctionality(todo?.id, todo?.title);
                }}
              >{`edit`}</span>{" "}
              | <span onClick={() => deleteTodos(todo?.id)}>{` delete`}</span>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Page;
