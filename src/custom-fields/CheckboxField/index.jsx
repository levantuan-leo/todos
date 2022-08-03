import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import ErrorMessage from "../../components/ErrorMessage";

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  //----------------------------
  title: PropTypes.node,
  disabled: PropTypes.bool,
};

CheckboxField.defaultProps = {
  title: "",
  disabled: false,
};

function CheckboxField(props) {
  const { field, form, disabled, title } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  field.checked = field.value;

  return (
    <span>
      <Checkbox {...field} disabled={disabled}>
        {title}
      </Checkbox>
      <span></span>
      {showError && <ErrorMessage error={errors[name]} />}
    </span>
  );
}

export default CheckboxField;
