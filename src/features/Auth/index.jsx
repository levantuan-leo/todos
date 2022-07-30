import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { Button, Divider, Layout, Space } from "antd";
import {
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { authService } from "../../services";

const { Header, Content, Footer } = Layout;

function Auth() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await authService.googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      await authService.facebookSignIn();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Header
        style={{
          height: "auto",
          backgroundColor: "white",
          borderBottom: "1px solid lightgray",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 50,
            fontWeight: "bold",
            padding: "10px 0",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <img
              width={60}
              height={60}
              style={{
                objectFit: "cover",
                marginRight: 5,
                verticalAlign: -10,
              }}
              src={require("../../assets/images/todos_logo.png")}
              alt="logo"
            />
            <span>
              Todos
              <sup
                style={{
                  fontSize: 15,
                  display: "inline-block",
                  transform: "translateY(-15px)",
                }}
              >
                ©
              </sup>
            </span>
          </Link>
        </div>
      </Header>

      <Content style={{ padding: "0 35%", margin: "30px 0" }}>
        <div>
          <h4
            style={{
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            To continue, log in to Todos.
          </h4>
          <div>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                size="large"
                icon={<GoogleOutlined />}
                type={"primary"}
                danger
                block
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </Button>
              <Button
                size="large"
                icon={<FacebookOutlined />}
                type={"primary"}
                block
                onClick={handleFacebookSignIn}
              >
                Sign in with Facebook
              </Button>
              <Button
                size="large"
                icon={<GithubOutlined />}
                type="default"
                block
                onClick={() => {}}
              >
                Sign in with Github
              </Button>
            </Space>
          </div>
        </div>
        <Divider>OR</Divider>
        <div>
          <Routes>
            <Route
              index
              element={
                <Navigate to="sign-in" state={{ continue: "/" }} replace />
              }
            />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </Content>

      <Footer style={{ textAlign: "right" }}>
        Todo App ©2022 Created by <strong>LEO</strong>
      </Footer>
    </div>
  );
}

export default Auth;
