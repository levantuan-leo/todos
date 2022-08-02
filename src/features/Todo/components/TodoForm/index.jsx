import React from "react";
import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";

TodoForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function TodoForm(props) {
  const { editMode, initialValues, onSubmit } = props;

  return (
    <Formik>
      <Form></Form>
    </Formik>
  );
}

export default TodoForm;
