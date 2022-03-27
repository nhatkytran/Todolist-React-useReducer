import {
  SET_TODO,
  SET_TODOS,
  DELETE_TODO,
  CHECK_UPDATE,
  CONFIRM_TODO,
} from "./constants.js";

export const initState = localStorage.getItem("todosLocalState")
  ? JSON.parse(localStorage.getItem("todosLocalState"))
  : {
      todo: "",
      todos: [],
      update: false,
      isUpdated: null,
    };

function reducer(state, action) {
  try {
    switch (action.type) {
      case SET_TODO:
        return {
          ...state,
          todo: action.payload,
        };
      case SET_TODOS:
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
      case DELETE_TODO:
        return {
          ...state,
          todos: state.todos.filter((_, index) => index !== action.payload),
        };
      case CHECK_UPDATE:
        if (action.payload === null) {
          return {
            ...state,
            update: false,
            isUpdated: null,
          };
        }
        return {
          ...state,
          update: true,
          isUpdated: action.payload,
        };
      case CONFIRM_TODO:
        const { index, value } = action.payload;
        const newTodos = [...state.todos];

        newTodos.splice(index, 1);
        newTodos.splice(index, 0, value);

        return {
          ...state,
          todos: newTodos,
        };
      default:
        throw new Error("Invalid action!");
    }
  } catch (error) {
    console.error(error);
  }
}

export default reducer;
