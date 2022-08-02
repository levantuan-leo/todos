import { Col, Row, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import TodoItem from "../TodoItem";
import {
  addTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
} from "../../todoSlice";
import { todoRemainingSelector } from "../../todoSelectors";
import Spinner from "../../../../components/Spinner";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import TodoForm from "../TodoForm";

export default function TodoList() {
  const dispatch = useDispatch();
  // ------------------------
  const navigate = useNavigate();
  const { todoId } = useParams();
  const editMode = !!todoId;
  // ------------------------------------------------
  const { todos, pagination } = useSelector(todoRemainingSelector);
  const loading = useSelector((state) => state.todos.loading);
  // ----------------------------------------------------------
  const currentTodo = todos.find((todo) => todo.id === todoId);
  const { totalPage, page, limit } = pagination;

  const initialValues = {
    name: "",
    priority: "Medium",
  };

  const handleSubmit = (values, actions) => {
    if (editMode) {
      dispatch(updateTodoThunk(values));
      navigate("/");
    } else {
      dispatch(addTodoThunk({ id: uuid(), ...values }));
    }

    // reset form
    actions.setSubmitting(false);
    actions.resetForm({ values: initialValues });
  };

  const handlePaginationPrev = () => {
    dispatch(fetchTodosThunk({ limit, page: page - 1 }));
  };

  const handlePaginationNext = () => {
    dispatch(fetchTodosThunk({ limit, page: page + 1 }));
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col
        span={24}
        style={{
          height: "calc(100% - 40px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginBottom: 5,
          }}
        >
          <Space size={"small"}>
            <Button
              disabled={page === 1 || editMode}
              icon={<LeftOutlined />}
              style={{ fontSize: "unset", height: "unset" }}
              onClick={handlePaginationPrev}
            />
            <Button
              disabled={page === totalPage || editMode}
              icon={<RightOutlined />}
              style={{ fontSize: "unset", height: "unset" }}
              onClick={handlePaginationNext}
            />
          </Space>
        </div>
        <div style={{ margin: "5px 0", flexGrow: "1" }}>
          <Spinner loading={loading === "loading"}>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </Spinner>
        </div>
      </Col>

      <Col span={24}>
        <TodoForm
          editMode={editMode}
          initialValues={editMode ? { ...currentTodo } : initialValues}
          onSubmit={handleSubmit}
        />
      </Col>
    </Row>
  );
}
