import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { sliceNames } from "@/store/constants";
//it is just an example of usage RTK

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosState = {
  list: Todo[];
};

const initialState: TodosState = {
  list: [
    {
      id: "1",
      title: "Learn React",
      completed: true
    },
    {
      id: "2",
      title: "Learn Redux",
      completed: true
    },
    {
      id: "3",
      title: "Learn Redux Toolkit",
      completed: false
    }
  ]
};

const todoSlice = createSlice({
  name: sliceNames.todo,
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.unshift({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false
      });
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    }
  }
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
