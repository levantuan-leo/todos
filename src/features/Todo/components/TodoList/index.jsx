import { Col, Row, Input, Button, Select, Tag, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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

export default function TodoList() {
  const dispatch = useDispatch();
  // ------------------------
  const navigate = useNavigate();
  const { todoId } = useParams();
  const editMode = !!todoId;
  // ------------------------------------------------
  const { todos, pagination } = useSelector(todoRemainingSelector);
  const loading = useSelector((state) => state.todos.loading);
  const { totalPage, page, limit } = pagination;
  // --------------------------------------
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (editMode) {
      const currentTodo = todos.find((todo) => todo.id === todoId);
      setTodo(currentTodo.name);
      setPriority(currentTodo.priority);
    }
  }, [todoId, editMode, todos]);

  const handleAddTodo = () => {
    const action = addTodoThunk({ id: uuid(), name: todo, priority });
    dispatch(action);
    // ----------------- reset form------------------
    setTodo("");
    setPriority("Medium");
  };
  const handleEditTodo = () => {
    const currentTodo = todos.find((todo) => todo.id === todoId);
    const action = updateTodoThunk({
      ...currentTodo,
      name: todo,
      priority: priority,
    });
    dispatch(action);
    navigate("/");
    // ----------------- reset form------------------
    setTodo("");
    setPriority("Medium");
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
        <Input.Group style={{ display: "flex" }} compact>
          <Input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter your todo ..."
          />
          <Select value={priority} onChange={(value) => setPriority(value)}>
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button
            type={editMode ? "danger" : "primary"}
            onClick={editMode ? handleEditTodo : handleAddTodo}
          >
            {editMode ? "Update" : "Add"}
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
