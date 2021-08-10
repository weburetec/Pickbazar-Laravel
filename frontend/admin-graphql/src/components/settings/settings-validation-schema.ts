import * as yup from "yup";
export const settingsValidationSchema = yup.object().shape({
  currency: yup.object().nullable().required("form:error-currency-required"),
});
