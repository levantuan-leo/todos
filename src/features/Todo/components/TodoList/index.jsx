import { Col, Row, Input, Button, Select, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import uuid from "react-uuid";
import TodoItem from "../TodoItem";
import { addTodoThunk } from "../../todoSlice";
import { todoRemainingSelector } from "../../todoSelectors";
import Spinner from "../../../../components/Spinner";

export default function TodoList() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const todos = useSelector(todoRemainingSelector);
  const loading = useSelector((state) => state.todos.loading);
  const user = useSelector((state) => state.auth.user);
  const isUser = !!user;

  const handleAddTodo = () => {
    const action = addTodoThunk({
      isUser: isUser,
      newTodo: { id: uuid(), name: todo, priority },
    });
    dispatch(action);
    // ----------------- reset form------------------
    setTodo("");
    setPriority("Medium");
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        <Spinner loading={loading === "loading"}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} isUser={isUser} todo={todo} />
          ))}
        </Spinner>
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
