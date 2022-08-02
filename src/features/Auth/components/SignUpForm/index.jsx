import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import { Button, Space } from "antd";
import InputField from "../../../../custom-fields/InputField";
import CheckboxField from "../../../../custom-fields/CheckboxField";
import RandomCaptchaField from "../../../../custom-fields/RandomCaptchaField";

SignUpForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function SignUpForm(props) {
  const { initialValues, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("This field is required."),
    password: Yup.string()
      .matches(/^\S.*[^.\s]$/g, "Password must not contain spaces")
      .min(8)
      .required("This field is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("This field is required."),
    captcha: Yup.string().required(),
    agreement: Yup.boolean().oneOf([true], "[Agreement] must be accepted."),
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
            placeholder="E-mail"
            size="large"
          />
          <FastField
            name="password"
            component={InputField}
            //--------------------------
            htmlType="Password"
            placeholder="Password"
            size="large"
          />
          <FastField
            name="confirmPassword"
            component={InputField}
            //--------------------------
            htmlType="Password"
            placeholder="Confirm Password"
            size="large"
          />
          <FastField
            name="captcha"
            component={RandomCaptchaField}
            //--------------------------
            label="Captcha"
          />
          <FastField
            name="agreement"
            component={CheckboxField}
            //------------------------------
            title={
              <>
                I have read the{" "}
                <a
                  href="/privacy-and-policy/end-user-agreement"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  agreement
                </a>
              </>
            }
          />
          <Button type="primary" size="large" htmlType="submit" block>
            Register
          </Button>
        </Space>
      </Form>
    </Formik>
  );
}

export default SignUpForm;
