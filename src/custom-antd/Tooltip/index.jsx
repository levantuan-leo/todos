import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";

CustomTooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CustomTooltip.defaultProps = {
  title: "",
  children: null,
};

function CustomTooltip(props) {
  const { title, children, ...restProps } = props;
  return (
    <Tooltip
      title={title}
      placement="bottomLeft"
      color={"blue"}
      overlayInnerStyle={{ borderRadius: 5 }}
      destroyTooltipOnHide={true}
      arrowPointAtCenter
      {...restProps}
    >
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
