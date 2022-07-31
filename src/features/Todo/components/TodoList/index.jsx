import { Col, Row, Input, Button, Select, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
// import uuid from "react-uuid";
import TodoItem from "../TodoItem";
import { addTodoThunk, fetchTodosThunk } from "../../todoSlice";
import { todoRemainingSelector } from "../../todoSelectors";
import Spinner from "../../../../components/Spinner";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export default function TodoList() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const todos = useSelector(todoRemainingSelector);
  const loading = useSelector((state) => state.todos.loading);
  const { totalPage, page, limit } = useSelector(
    (state) => state.todos.pagination
  );

  const handleAddTodo = () => {
    // const action = addTodoThunk({ id: uuid(), name: todo, priority });
    const action = addTodoThunk({ name: todo, priority });
    dispatch(action);
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
        <Button
          disabled={page === 1}
          icon={<UpOutlined />}
          style={{ fontSize: "unset", height: "unset" }}
          onClick={handlePaginationPrev}
        />
        <div style={{ margin: "5px 0", flexGrow: "1" }}>
          <Spinner loading={loading === "loading"}>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </Spinner>
        </div>
        <Button
          disabled={page === totalPage}
          icon={<DownOutlined />}
          style={{ fontSize: "unset", height: "unset" }}
          onClick={handlePaginationNext}
        />
      </Col>

      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todo} onChange={(e) => setTodo(e.target.value)} />
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
          <Button type="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
