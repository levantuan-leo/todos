import React from "react";
import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import * as Yup from "yup";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import InputField from "../../../../custom-fields/InputField";
import CheckboxField from "../../../../custom-fields/CheckboxField";

SignInForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function SignInForm(props) {
  const { initialValues, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("This field is required."),
    password: Yup.string()
      //   .matches(/^\S.*[^.\s]$/g, "Password must not contain spaces")
      //   .min(8)
      .required("This field is required."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
          <FastField
            name="email"
            component={InputField}
            //--------------------------
            placeholder="Email address"
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
          <FastField
            name="password"
            component={InputField}
            //--------------------------
            htmlType="password"
            placeholder="Password"
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          <div>
            <FastField
              name="remember"
              component={CheckboxField}
              //------------------------
              title={"Remember me"}
            />
            <Link style={{ float: "right" }} to="/forgot-password">
              Forgot password
            </Link>
          </div>
          <Button type="default" htmlType="submit" size="large" block>
            Log in
          </Button>
        </Space>
      </Form>
    </Formik>
  );
}

export default SignInForm;
