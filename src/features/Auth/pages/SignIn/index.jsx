import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import SignInForm from "../../components/SignInForm";

function SignIn() {
  const initialValues = { email: "", password: "", remember: false };

  const handleSubmit = (values, _) => {
    console.log(values);
  };

  return (
    <>
      <SignInForm initialValues={initialValues} onSubmit={handleSubmit} />
      <Divider />
      <div style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/auth/sign-up">register now!</Link>
      </div>
    </>
  );
}

export default SignIn;
