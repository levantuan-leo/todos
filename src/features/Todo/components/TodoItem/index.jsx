import { Row, Tag, Checkbox, Popover, Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteTodoThunk, updateTodoThunk } from "../../todoSlice";
import Tooltip from "../../../../custom-antd/Tooltip";
import { Link, useParams } from "react-router-dom";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function TodoItem(props) {
  const { todo } = props;
  const { id, name, status, priority } = todo;
  const dispatch = useDispatch();
  const { todoId } = useParams();
  // change hover's style
  const [hover, setHover] = useState(false);

  const toggleCheckbox = () => {
    const action = updateTodoThunk({ ...todo, status: !status });
    dispatch(action);
  };

  const handleDeleteTodo = () => {
    const action = deleteTodoThunk(id);
    dispatch(action);
  };

  return (
    <Popover
      content={
        <div>
          {!status && (
            <Tooltip title={"Edit"} placement="bottom">
              <Link to={`/${id}`}>
                <Button type="text" icon={<EditOutlined />} />
              </Link>
            </Tooltip>
          )}

          <Tooltip title={"Delete"} placement="bottom">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={handleDeleteTodo}
            />
          </Tooltip>
        </div>
      }
      showArrow={false}
      onVisibleChange={(visible) => setHover(visible)}
      placement="right"
      overlayInnerStyle={{
        borderRadius: 5,
        ...(todoId === id && { display: "none" }),
      }}
    >
      <Row
        justify="space-between"
        style={{
          marginBottom: 3,
          borderRadius: 2,
          padding: "1px 1px 1px 4px",
          ...(status ? { opacity: 0.5, textDecoration: "line-through" } : {}),
          ...((hover || todoId === id) && {
            boxShadow:
              "rgba(0, 0, 0, 0.15) 0.5px 0.5px 3px 1px, rgba(0, 0, 0, 0.25) 1px 1px 2px 1px",
          }),
        }}
      >
        <Checkbox checked={status} onChange={toggleCheckbox}>
          {name}
        </Checkbox>
        <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
          {priority}
        </Tag>
      </Row>
    </Popover>
  );
}
