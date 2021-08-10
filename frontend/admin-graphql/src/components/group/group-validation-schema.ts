import * as yup from "yup";
export const groupValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
});
