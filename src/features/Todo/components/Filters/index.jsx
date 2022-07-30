import { Col, Row, Input, Typography, Radio, Select, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  prioritiesFilterChange,
  searchFilterChange,
  statusFilterChange,
} from "./filterSlice";

const { Search } = Input;

export default function Filters() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.filters.search);
  const status = useSelector((state) => state.filters.status);
  const priorities = useSelector((state) => state.filters.priorities);

  const handleSearchChange = (value) => {
    const action = searchFilterChange(value);
    dispatch(action);
  };

  const handleStatusChange = (value) => {
    dispatch(statusFilterChange(value));
  };

  const handlePrioritiesChange = (value) => {
    dispatch(prioritiesFilterChange(value));
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="input search text"
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Todo">To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          style={{ width: "100%" }}
          value={priorities}
          onChange={handlePrioritiesChange}
        >
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
      </Col>
    </Row>
  );
}
