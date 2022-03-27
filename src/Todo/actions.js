import {
  SET_TODO,
  SET_TODOS,
  DELETE_TODO,
  CHECK_UPDATE,
  CONFIRM_TODO,
} from "./constants";

export const setTodo = function (payload) {
  return {
    payload,
    type: SET_TODO,
  };
};

export const setTodos = function (payload) {
  return {
    payload,
    type: SET_TODOS,
  };
};

export const deleteTodo = function (payload) {
  return {
    payload,
    type: DELETE_TODO,
  };
};

export const checkUpdate = function (payload) {
  return {
    payload,
    type: CHECK_UPDATE,
  };
};

export const confirmTodo = function (payload) {
  return {
    payload,
    type: CONFIRM_TODO,
  };
};
