import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "../../services";
import { isObjectEmpty } from "../../utils";

const initialValues = {
  todos: [],
  loading: "idle",
  error: null,
  pagination: { page: 1, limit: 6 },
};

const todo = createSlice({
  name: "todo",
  initialState: initialValues,
  reducers: {
    getTodos(state, _) {
      state.todos = JSON.parse(sessionStorage.getItem("todos")) ?? [];
    },
    addTodo(state, action) {
      state.todos.push({ ...action.payload, status: false });

      // save to session storage
      sessionStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo(state, action) {
      const index = state.todos.indexOf(
        state.todos.find((todo) => todo.id === action.payload)
      );
      // delete a todo at index
      state.todos.splice(index, 1);

      // save to session storage
      sessionStorage.setItem("todos", JSON.stringify(state.todos));
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
        state.loading = "loading";
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
        state.loading = "idle";
      })
      // add todo
      .addCase(addTodoThunk.pending, (state, _) => {
        state.loading = "loading";
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = "idle";
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = "idle";
      })
      // delete todo
      .addCase(deleteTodoThunk.pending, (state, _) => {
        state.loading = "loading";
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = "idle";
      })
      .addCase(deleteTodoThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = "idle";
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
    dispatch(setPagination(pagination));
    const currentUser = getState().auth.user;

    if (!isObjectEmpty(currentUser)) {
      const todos = await todoService.fetchTodos(currentUser.id);
      return todos;
    } else {
      // User are not logged in
      dispatch(getTodos());
      return rejectWithValue("You are not logged in.");
    }
  }
);

const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (newTodo, { dispatch, rejectWithValue, getState }) => {
    const currentUser = getState().auth.user;

    if (!isObjectEmpty(currentUser)) {
      const res = await todoService.insertTodo(currentUser.id, newTodo);
      return res;
    } else {
      dispatch(addTodo(newTodo));
      return rejectWithValue("You are not logged in.");
    }
  }
);

const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId, { dispatch, rejectWithValue, getState }) => {
    const currentUser = getState().auth.user;

    if (!isObjectEmpty(!isObjectEmpty(currentUser))) {
      // currently not use response
      await todoService.deleteTodo(currentUser.id, todoId);

      const todos = await todoService.fetchTodos(currentUser.id);
      return todos;
    } else {
      dispatch(deleteTodo(todoId));
      return rejectWithValue("You are not logged in.");
    }
  }
);

const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (editedTodo, { dispatch, rejectWithValue, getState }) => {
    const currentUser = getState().auth.user;

    if (!isObjectEmpty(currentUser)) {
      const res = await todoService.updateTodo(currentUser.id, editedTodo);
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
