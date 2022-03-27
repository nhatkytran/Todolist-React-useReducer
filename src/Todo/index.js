import { useReducer, useRef } from "react";

import reducer, { initState } from "./reducer.js";
import logger from "./logger.js";
import {
  setTodo,
  setTodos,
  deleteTodo,
  checkUpdate,
  confirmTodo,
} from "./actions.js";

function TodoApp() {
  const inputRef = useRef();

  const [state, dispatch] = useReducer(logger(reducer), initState);
  const { todo, todos, update, isUpdated } = state;

  function handleTodos(event) {
    event.preventDefault();

    if (!todo) {
      alert("Oops! No todo!");
      return;
    }

    // Add todo to Todo list and set local starage
    dispatch(setTodos(todo));

    localStorage.setItem(
      "todosLocalState",
      JSON.stringify({
        ...state,
        todo: "",
        todos: [...state.todos, todo],
      })
    );

    // Clear input and re-focus
    dispatch(setTodo(""));

    inputRef.current.focus();
  }

  function handleTodoList(event) {
    // Handle delete todo
    const targetDelete = event.target.closest(".delete-button");

    if (targetDelete) {
      const id = +targetDelete.dataset.id;

      dispatch(deleteTodo(id));

      localStorage.setItem(
        "todosLocalState",
        JSON.stringify({
          ...state,
          todo: "",
          todos: state.todos.filter((_, index) => index !== id),
        })
      );
    }

    // Handle update todo
    const targetUpdate = event.target.closest(".update-button");

    if (targetUpdate) {
      const id = +targetUpdate.dataset.id;

      dispatch(checkUpdate(id));

      localStorage.setItem(
        "todosLocalState",
        JSON.stringify({
          ...state,
          todo: "",
          update: true,
          isUpdated: id,
        })
      );

      dispatch(setTodo(todos[id]));
      inputRef.current.focus();
    }
  }

  function handleComfirmUpdate() {
    if (!todo) {
      dispatch(deleteTodo(isUpdated));
      dispatch(checkUpdate(null));

      localStorage.setItem(
        "todosLocalState",
        JSON.stringify({
          ...state,
          todo: "",
          todos: state.todos.filter((_, index) => index !== isUpdated),
          update: false,
          isUpdated: null,
        })
      );
    }

    if (todo) {
      dispatch(
        confirmTodo({
          index: isUpdated,
          value: todo,
        })
      );
      dispatch(checkUpdate(null));
      dispatch(setTodo(""));

      const newTodos = [...todos];

      newTodos.splice(isUpdated, 1);
      newTodos.splice(isUpdated, 0, todo);

      localStorage.setItem(
        "todosLocalState",
        JSON.stringify({
          ...state,
          todo: "",
          todos: newTodos,
          update: false,
          isUpdated: null,
        })
      );
    }
  }

  function handleCancelUpdate() {
    dispatch(setTodo(""));
    dispatch(checkUpdate(null));

    localStorage.setItem(
      "todosLocalState",
      JSON.stringify({
        ...state,
        todo: "",
        update: false,
        isUpdated: null,
      })
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>Todo</h3>

      <form onSubmit={handleTodos} style={{ display: "inline-block" }}>
        <input
          ref={inputRef}
          type="text"
          value={todo}
          onChange={(event) => {
            dispatch(setTodo(event.target.value));
          }}
        />
        {!update && <button>Add</button>}
      </form>
      {update && <button onClick={handleComfirmUpdate}>Confirm</button>}
      {update && <button onClick={handleCancelUpdate}>Cancel</button>}

      <ul onClick={handleTodoList}>
        {todos.map((item, index) => {
          if (index === isUpdated)
            return (
              <li
                key={index}
                style={{
                  color: "blue",
                }}
              >
                Updating...
              </li>
            );

          return (
            <li key={index}>
              <span style={{ marginRight: "20px" }}>{item}</span>

              {!update && (
                <button className="update-button" data-id={index}>
                  Update
                </button>
              )}
              {!update && (
                <button className="delete-button" data-id={index}>
                  X
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoApp;
