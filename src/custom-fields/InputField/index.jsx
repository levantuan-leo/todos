import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  //---------------------------
  label: PropTypes.string,
  htmlType: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  label: "",
  htmlType: "text",
  disabled: false,
  placeholder: "",
};

function InputField(props) {
  const { field, form, label, htmlType, disabled, placeholder } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const InputType = htmlType !== "text" ? Input[htmlType] : Input;

  return (
    <div style={{ flexGrow: 1 }}>
      {label && <label htmlFor={name}>|{label}</label>}
      <InputType
        {...field}
        status={showError ? "error" : ""}
        suffix={showError ? <InfoCircleOutlined /> : null}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

export default InputField;
