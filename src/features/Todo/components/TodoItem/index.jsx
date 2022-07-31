import { Row, Tag, Checkbox, Popover, Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { updateTodoThunk } from "../../todoSlice";
import Tooltip from "../../../../custom-antd/Tooltip";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function TodoItem(props) {
  const { todo } = props;
  const { name, status, priority } = todo;
  const dispatch = useDispatch();
  // change hover's style
  const [hover, setHover] = useState(false);

  const toggleCheckbox = () => {
    const action = updateTodoThunk({ ...todo, status: !status });
    dispatch(action);
  };

  return (
    <Popover
      content={
        <div>
          <Tooltip title={"Edit"} placement="bottom">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title={"Delete"} placement="bottom">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </div>
      }
      showArrow={false}
      onVisibleChange={(visible) => setHover(visible)}
      placement="right"
      overlayInnerStyle={{ borderRadius: 5 }}
    >
      <Row
        justify="space-between"
        style={{
          marginBottom: 3,
          paddingLeft: 3,
          ...(status ? { opacity: 0.5, textDecoration: "line-through" } : {}),
          ...(hover && {
            boxShadow: "rgba(0, 0, 0, 0.15) 1px 1px 3px 1px",
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
