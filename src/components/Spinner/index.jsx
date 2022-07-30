import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";

Spinner.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node,
};

Spinner.defaultProps = {
  loading: false,
  size: "middle",
  children: null,
};

function Spinner(props) {
  const { children, loading, size } = props;

  return (
    <div>
      <Spin spinning={loading} size={size} style={{ maxHeight: "unset" }}>
        {children}
      </Spin>
    </div>
  );
}

export default Spinner;
