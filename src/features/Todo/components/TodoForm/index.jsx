import React from "react";
import PropTypes from "prop-types";

import { FastField, Form, Formik } from "formik";
import { Button, Input } from "antd";
import * as Yup from "yup";
import InputField from "../../../../custom-fields/InputField";
import SelectField from "../../../../custom-fields/SelectField";
import { TODO_PRIORITIES } from "../../../../constant/global";

TodoForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function TodoForm(props) {
  const { editMode, initialValues, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required."),
    priority: Yup.string().required(),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(_) => {
        return (
          <Form>
            <Input.Group style={{ display: "flex" }} compact>
              <FastField
                name="name"
                component={InputField}
                //---------------------
                placeholder="Enter your todo..."
              />
              <FastField
                name="priority"
                component={SelectField}
                //------------------------
                options={TODO_PRIORITIES}
              />
              <Button type={editMode ? "danger" : "primary"} htmlType="submit">
                {editMode ? "Update" : "Add"}
              </Button>
            </Input.Group>
          </Form>
        );
      }}
    </Formik>
  );
}

export default TodoForm;
