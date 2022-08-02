import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  GithubOutlined,
  AntDesignOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Popover, Space } from "antd";
import { useSelector } from "react-redux";
import { authService } from "../../services";
import { useRef } from "react";
import PopoverHeader from "./Popover";
import CustomTooltip from "../../custom-antd/Tooltip";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const avatarRef = useRef();

  const handleLogOut = async () => {
    try {
      await authService.logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: -60,
        padding: "5px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 50,
          height: 50,
          fontSize: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          backgroundColor: "white",
          boxShadow: "0 0 5px 1px #bfbfbf",
        }}
      >
        {!user ? (
          <CustomTooltip title="Log in">
            <Link to="/user">
              <LoginOutlined />
            </Link>
          </CustomTooltip>
        ) : (
          <div style={{ position: "absolute", top: 0, left: 0, fontSize: 0 }}>
            <Space direction="vertical" style={{ fontSize: 25 }} size="middle">
              <Popover
                content={<PopoverHeader user={user} />}
                showArrow={false}
                placement={"bottomRight"}
                overlayInnerStyle={{ borderRadius: 5 }}
              >
                <div style={{ cursor: "pointer" }}>
                  <Avatar
                    ref={avatarRef}
                    size={50}
                    src={user.photoURL}
                    // referrerPolicy="no-referrer"
                    onError={() => {
                      const avatar = avatarRef.current.querySelector("img");
                      avatar.referrerPolicy = "no-referrer";
                      return false;
                    }}
                  />
                </div>
              </Popover>
              <Space
                direction="vertical"
                align="center"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  transition: "all 500ms ease",
                }}
              >
                <CustomTooltip title="User's profile">
                  <Link to={"/"}>
                    <UserOutlined />
                  </Link>
                </CustomTooltip>

                <CustomTooltip title="Settings">
                  <Link to={"/"}>
                    <SettingOutlined />
                  </Link>
                </CustomTooltip>

                <Divider
                  style={{
                    width: 30,
                    margin: 0,
                    backgroundColor: "lightgray",
                  }}
                />

                <CustomTooltip title="Log out">
                  <Button
                    onClick={handleLogOut}
                    type="link"
                    style={{ padding: 0, fontSize: "inherit" }}
                  >
                    <LogoutOutlined />
                  </Button>
                </CustomTooltip>
              </Space>
            </Space>
          </div>
        )}
      </div>

      <div style={{ fontSize: 20 }}>
        <Space direction="vertical" size={4}>
          <a
            href="https://github.com/lvt-512/todos"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <GithubOutlined />
          </a>
          <a
            href="https://ant.design/"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <AntDesignOutlined />
          </a>
          <Link to="/feedback">
            <QuestionCircleOutlined />
          </Link>
        </Space>
      </div>
    </div>
  );
}

export default Header;
