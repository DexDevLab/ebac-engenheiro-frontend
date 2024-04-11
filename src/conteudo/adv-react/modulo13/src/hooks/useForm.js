import { useState } from "react";

const useForm = (formFields = {}) => {
  const formErrorFromFields = {};
  const formDataFromFields = {};

  Object.keys(formFields).forEach((key) => {
    Object.assign(formErrorFromFields, { [key]: false });
    Object.assign(formDataFromFields, {
      [key]: {
        label: "",
        value: "",
      },
    });
  });

  const [formError, setFormError] = useState({ ...formErrorFromFields });
  const [formData, setFormData] = useState({ ...formDataFromFields });
  const [submitData, setSubmitData] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const resetFormData = () => {
    setFormData({ ...formDataFromFields });
  };

  const validate = (label, value) => {
    if (formFields[label].dependant.length > 0) {
      setFormError({
        ...formError,
        [label]: !formFields[label].isValid(
          value,
          formData[formFields[label].dependant]
        ),
      });
    } else {
      setFormError({
        ...formError,
        [label]: !formFields[label].isValid(value, null),
      });
    }
  };

  const onChange = (label, target) => {
    validate(label, target.value);
    if (formFields[label].clears.length > 0) {
      if (formFields[label].clears[0].includes("all")) {
        resetFormData();
      } else {
        formFields[label].clears.forEach((item) => {
          setFormData({
            ...formData,
            [item]: { label: "", value: "" },
          });
        });
      }
    }
    setFormData({
      ...formData,
      [label]: {
        label: target.id,
        value: target.value,
      },
    });
    setFormStatus("");
    setSubmitData("");
  };

  const isValid = () => {
    const isValid = {};
    Object.keys(formFields).forEach((key) => {
      if (formFields[key].dependant.length > 0) {
        Object.assign(isValid, {
          [key]: !formFields[key].isValid(
            formData[key].value,
            formData[formFields[key].dependant]
          ),
        });
      } else {
        Object.assign(isValid, {
          [key]: !formFields[key].isValid(formData[key].value, null),
        });
      }
    });
    setFormError({ ...isValid });
    return !(Object.values(isValid).indexOf(true) >= 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      setSubmitData({
        ...formData,
      });
      setFormStatus("success");
      resetFormData();
    } else {
      setFormStatus("error");
    }
  };

  return [onChange, onSubmit, formData, formError, formStatus, submitData];
};

export default useForm;
