import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  search: "",
  status: "All",
  priorities: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialValues,
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    prioritiesFilterChange: (state, action) => {
      state.priorities = action.payload;
    },
  },
});

const { actions, reducer } = filterSlice;
export const {
  searchFilterChange,
  statusFilterChange,
  prioritiesFilterChange,
} = actions;
export default reducer;
