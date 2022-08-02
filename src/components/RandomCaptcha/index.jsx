import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Input, Row } from "antd";

RandomCaptcha.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

function RandomCaptcha(props) {
  const { field, form } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <div>
      <Row gutter={8}>
        <Col span={12}>
          <Input {...field} />
        </Col>
        <Col span={12}>
          <Button>Get captcha</Button>
        </Col>
      </Row>
      <Row>
        <span style={{ color: showError ? "red" : "lightgray", fontSize: 12 }}>
          We must make sure that you are a human.
        </span>
      </Row>
    </div>
  );
}

export default RandomCaptcha;
