import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "../../services";
import { authService } from "../../services";

const initialValues = {
  todos: [],
  loading: "idle",
  error: null,
  pagination: { totalPage: null, page: 1, limit: 6 },
};

const todo = createSlice({
  name: "todo",
  initialState: initialValues,
  reducers: {
    getTodos(state, action) {
      const pagination = action.payload;

      const todos = JSON.parse(sessionStorage.getItem("todos")) ?? [];
      const totalTodos = todos.length;
      state.pagination = {
        ...pagination,
        totalPage: Math.ceil(totalTodos / pagination.limit),
      };

      const newTodos = todos.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.limit * pagination.page
      );
      state.todos = newTodos;
    },
    addTodo(state, action) {
      const todos = JSON.parse(sessionStorage.getItem("todos")) ?? [];
      todos.push({ ...action.payload, status: false });
      if (state.todos.length < state.pagination.limit)
        state.todos = todos.slice(
          (state.pagination.page - 1) * state.pagination.limit,
          state.pagination.limit * state.pagination.page
        );

      const totalTodos = todos.length;
      state.pagination.totalPage = Math.ceil(
        totalTodos / state.pagination.limit
      );

      // save to session storage
      sessionStorage.setItem("todos", JSON.stringify(todos));
    },
    deleteTodo(state, action) {
      const todos = JSON.parse(sessionStorage.getItem("todos"));
      const index = todos.indexOf(
        todos.find((todo) => todo.id === action.payload)
      );

      todos.splice(index, 1);
      state.todos = todos.slice(
        (state.pagination.page - 1) * state.pagination.limit,
        state.pagination.limit * state.pagination.page
      );

      const totalTodos = todos.length;
      state.pagination.totalPage = Math.ceil(
        totalTodos / state.pagination.limit
      );

      // save to session storage
      sessionStorage.setItem("todos", JSON.stringify(todos));
    },
    updateTodo(state, action) {
      const payload = action.payload;
      let index = state.todos.indexOf(
        state.todos.find((todo) => todo.id === payload.id)
      );
      state.todos[index] = payload;
      state.loading = "idle";

      // save to session storage
      sessionStorage.setItem("todos", JSON.stringify(state.todos));
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch todos
      .addCase(fetchTodosThunk.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = "idle";
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        console.log(
          "[todos/fetchTodos/rejected]:\n",
          "[state]: ",
          state,
          "\n[action]: ",
          action
        );
      })
      // add todo
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        if (state.todos.length < state.pagination.limit)
          state.todos.push(action.payload);
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      // delete todo
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.todos.splice(
          state.todos.indexOf(
            state.todos.find((todo) => todo.id === action.payload)
          )
        );
      })
      .addCase(deleteTodoThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      // update todo
      .addCase(updateTodoThunk.pending, (state, _) => {
        state.loading = "loading";
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        let index = state.todos.indexOf(
          state.todos.find((todo) => todo.id === payload.id)
        );
        state.todos[index] = payload;
        state.loading = "idle";
      });
  },
});

//-----------------REDUX-THUNK-----------------
// action (object) & action creators () => { return action }
// thunk action (function) & thunk action creators () => { return thunk action }

// Parameters: type, payloadCreator , [options]
// - type: string
// - payloadCreator: 2 params -> data, thunkAPI (dispatch, rejectWithValue, fulfillWithValue,...)

// createAsyncThunk()
// return value: 3 actions (pending, fulfilled, rejected) & 1 thunk action creator
//----------------------------
const fetchTodosThunk = createAsyncThunk(
  "todos/fetchTodos",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    const pagination = payload || getState().todos.pagination;

    if (authService.auth.currentUser) {
      const todos = await todoService.fetchTodos();
      const totalTodos = todos.length;

      dispatch(
        setPagination({
          ...pagination,
          totalPage: Math.ceil(totalTodos / pagination.limit),
        })
      );

      const res = await todoService.fetchTodos(pagination);
      return res;
    } else {
      // User are not logged in
      dispatch(getTodos(pagination));
      return rejectWithValue("You are not logged in.");
    }
  }
);

const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (newTodo, { dispatch, rejectWithValue }) => {
    if (authService.auth.currentUser) {
      const res = await todoService.insertTodo(newTodo);
      return res;
    } else {
      dispatch(addTodo(newTodo));
      return rejectWithValue("You are not logged in.");
    }
  }
);

const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId, { dispatch, rejectWithValue }) => {
    if (authService.auth.currentUser) {
      const res = todoService.deleteTodo(todoId);
      return res;
    } else {
      dispatch(deleteTodo(todoId));
      return rejectWithValue("You are not logged in.");
    }
  }
);

const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (editedTodo, { dispatch, rejectWithValue }) => {
    if (authService.auth.currentUser) {
      const res = await todoService.updateTodo(editedTodo);
      return res;
    } else {
      dispatch(updateTodo(editedTodo));
      return rejectWithValue("You are not logged in.");
    }
  }
);

const { actions, reducer } = todo;
export { fetchTodosThunk, addTodoThunk, deleteTodoThunk, updateTodoThunk };
export const { setPagination, getTodos, addTodo, deleteTodo, updateTodo } =
  actions;
export default reducer;
