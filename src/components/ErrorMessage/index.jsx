import React from "react";
import PropTypes from "prop-types";

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

function ErrorMessage(props) {
  return (
    <div style={{ height: 0 }}>
      <span style={{ fontSize: 12, color: "red" }}>[ {props.error} ]</span>
    </div>
  );
}

export default ErrorMessage;
