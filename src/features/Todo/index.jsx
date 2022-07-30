import { Typography, Divider } from "antd";
import React from "react";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import Header from "../../components/Header";

const { Title } = Typography;

function Todo() {
  return (
    <div style={{ padding: "5vh 0" }}>
      <div
        style={{
          position: "relative",
          width: 500,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: 20,
          boxShadow: "0 0 10px 4px #bfbfbf",
          borderRadius: 5,
          height: "90vh",
        }}
      >
        <Header />
        <Title style={{ textAlign: "center" }}>TODO APP with REDUX</Title>
        <Filters />
        <Divider />
        <TodoList />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -110,
          }}
        >
          <img
            width={100}
            height={100}
            src={require("../../assets/images/todos_logo.png")}
            alt={"logo"}
          />
        </div>
      </div>
    </div>
  );
}

export default Todo;
