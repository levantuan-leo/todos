import React from "react";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input } from "antd";

function SignIn() {
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={() => {}}
      size={"large"}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email address"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
        style={{ marginBottom: 10 }}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link
          className="login-form-forgot"
          style={{ float: "right" }}
          to="/forgot-password"
        >
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button
          type="default"
          htmlType="submit"
          block
          className="login-form-button"
        >
          Log in
        </Button>
        <Divider></Divider>
        <div style={{ textAlign: "center" }}>
          Don't have an account? <Link to="/user/sign-up">register now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
}

export default SignIn;
