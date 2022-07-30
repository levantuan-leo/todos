import { Button, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="register"
      size="large"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input placeholder="E-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input the captcha you got!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement!")),
          },
        ]}
      >
        <Checkbox>
          I have read the{" "}
          <a
            href="/end-user-agreement"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            agreement
          </a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button ghost type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form.Item>

      <Divider />
      <div style={{ textAlign: "center" }}>
        Have an account? <Link to="/user/sign-in">Sign in</Link>.
      </div>
    </Form>
  );
};

export default SignUp;
