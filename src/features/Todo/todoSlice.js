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
      state.todos = action.payload;
    },
    addTodo(state, action) {
      state.todos.push({ ...action.payload, status: false });

      // save to session storage
      sessionStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodoStatus(state, action) {
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
      state.pagination.page = action.payload;
    },
    setTotalPage(state, action) {
      state.pagination.totalPage = action.payload;
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
        state.todos.push(action.payload);
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
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
  async (payload, { dispatch, getState }) => {
    const pagination = payload || getState().todos.pagination;

    const todos = await todoService.fetchTodos();
    const totalTodos = todos.length;
    dispatch(setTotalPage(Math.ceil(totalTodos / pagination.limit)));

    const res = await todoService.fetchTodos(pagination);
    dispatch(setPagination(pagination.page));
    return res;
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

const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (editedTodo, { dispatch, rejectWithValue }) => {
    if (authService.auth.currentUser) {
      const res = await todoService.updateTodo(editedTodo);
      return res;
    } else {
      dispatch(toggleTodoStatus(editedTodo));
      return rejectWithValue("You are not logged in.");
    }
  }
);

const { actions, reducer } = todo;
export { fetchTodosThunk, addTodoThunk, updateTodoThunk };
export const {
  setTotalPage,
  setPagination,
  getTodos,
  addTodo,
  toggleTodoStatus,
} = actions;
export default reducer;
