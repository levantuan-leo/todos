import { createSelector } from "@reduxjs/toolkit";

const todoRemainingSelector = createSelector(
  (state) => state.todos,
  (state) => state.filters,
  ({ todos, pagination }, filters) => {
    let filterTodos = todos.filter((todo) => {
      return (
        todo.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.status === "All" ||
          (filters.status === "Completed" ? todo.status : !todo.status)) &&
        (filters.priorities.length > 0
          ? filters.priorities.includes(todo.priority)
          : true)
      );
    });

    const totalPage =
      filterTodos.length === 0
        ? 1
        : Math.ceil(filterTodos.length / pagination.limit);

    pagination = {
      ...pagination,
      totalPage: totalPage,
      page: pagination.page >= totalPage ? totalPage : pagination.page,
    };

    filterTodos = filterTodos.slice(
      (pagination.page - 1) * pagination.limit,
      pagination.limit * pagination.page
    );

    return {
      todos: [...filterTodos],
      pagination: pagination,
    };
  }
);

export { todoRemainingSelector };
