import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/Todo/todoSlice";
import filterReducer from "../features/Todo/components/Filters/filterSlice";
import authReducer from "../features/Auth/authSlice";

const rootReducer = {
  todos: todoReducer,
  filters: filterReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
