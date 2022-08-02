import React from "react";
import PropTypes from "prop-types";
import { Select, Tag } from "antd";

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  //-------------------
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

SelectField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
  options: [],
};

function SelectField(props) {
  const { field, label, placeholder, options, disabled } = props;
  const { name } = field;

  const handleSelectOptionChange = (selectedOption) => {
    const changeEvent = {
      target: {
        name: name,
        value: selectedOption,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        {...field}
        onChange={handleSelectOptionChange}
        //------------------------
        placeholder={placeholder}
        disabled={disabled}
      >
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
            label={option.value}
          >
            <Tag color={option.color}>{option.value}</Tag>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectField;
