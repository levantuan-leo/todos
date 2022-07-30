import React from "react";
import PropTypes from "prop-types";
import { Avatar, Space, Typography } from "antd";

Popover.propTypes = {
  user: PropTypes.object.isRequired,
};

const { Text, Title } = Typography;

function Popover({ user }) {
  return (
    <Space
      direction="vertical"
      size={0}
      align={"center"}
      style={{ minWidth: 200 }}
    >
      <Avatar src={user.photoURL} size="large" alt="User" />
      <Title level={5} style={{ marginBottom: 0, marginTop: 15 }}>
        {user.displayName}
      </Title>
      <Text type="secondary">{user.email}</Text>
    </Space>
  );
}

export default Popover;
