import { createSelector } from "@reduxjs/toolkit";

const todoRemainingSelector = createSelector(
  (state) => state.todos.todos,
  (state) => state.filters,
  (todos, filters) =>
    todos.filter((todo) => {
      return (
        todo.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.status === "All" ||
          (filters.status === "Completed"
            ? todo.isCompleted
            : !todo.isCompleted)) &&
        (filters.priorities.length > 0
          ? filters.priorities.includes(todo.priority)
          : true)
      );
    })
);

export { todoRemainingSelector };
