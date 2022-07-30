import { Row, Tag, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { updateTodoThunk } from "../../todoSlice";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function TodoItem(props) {
  const { isUser, todo } = props;
  const { name, isCompleted, priority } = todo;
  const dispatch = useDispatch();

  const toggleCheckbox = () => {
    const action = updateTodoThunk({
      isUser: isUser,
      editedTodo: { ...todo, isCompleted: !isCompleted },
    });
    dispatch(action);
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(isCompleted
          ? { opacity: 0.5, textDecoration: "line-through" }
          : {}),
      }}
    >
      <Checkbox checked={isCompleted} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
    </Row>
  );
}
