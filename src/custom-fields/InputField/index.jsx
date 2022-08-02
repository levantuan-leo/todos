import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import ErrorMessage from "../../components/ErrorMessage";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  //---------------------------
  label: PropTypes.string,
  htmlType: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  suffix: PropTypes.node,
  prefix: PropTypes.node,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputField.defaultProps = {
  label: "",
  htmlType: "text",
  disabled: false,
  placeholder: "",
  suffix: <></>,
  prefix: <></>,
  size: "default",
};

function InputField(props) {
  const {
    field,
    form,
    label,
    htmlType,
    disabled,
    placeholder,
    suffix,
    prefix,
    size,
  } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const InputType =
    htmlType !== htmlType.toLowerCase() ? Input[htmlType] : Input;

  return (
    <div style={{ flexGrow: 1 }}>
      {label && <label htmlFor={name}>|{label}</label>}
      <InputType
        {...field}
        status={showError ? "error" : ""}
        suffix={suffix || <></>}
        prefix={prefix || <></>}
        placeholder={placeholder}
        type={htmlType}
        disabled={disabled}
        size={size}
      />
      {showError && <ErrorMessage error={errors[name]} />}
    </div>
  );
}

export default InputField;
