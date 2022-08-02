import { Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";

const SignUp = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  };

  const handleSubmit = (values, _) => {
    console.log(values);
  };

  return (
    <>
      <SignUpForm initialValues={initialValues} onSubmit={handleSubmit} />
      <Divider />
      <div style={{ textAlign: "center" }}>
        Have an account? <Link to="/user/sign-in">Sign in</Link>.
      </div>
    </>
  );
};

export default SignUp;
