import * as yup from "yup";
export const typeValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
});
