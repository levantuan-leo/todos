import React from "react";
import PropTypes from "prop-types";
import RandomCaptcha from "../../components/RandomCaptcha";

RandomCaptchaField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  //-------------------------------------
  label: PropTypes.string,
};

RandomCaptchaField.defaultProps = {
  label: "",
};

function RandomCaptchaField(props) {
  const { field, form, label } = props;
  const { name } = field;

  return (
    <div style={{ display: "flex" }}>
      {label && (
        <label htmlFor={name} style={{ marginTop: 5, marginRight: 5 }}>
          {label}:
        </label>
      )}
      <RandomCaptcha field={field} form={form} />
    </div>
  );
}

export default RandomCaptchaField;
