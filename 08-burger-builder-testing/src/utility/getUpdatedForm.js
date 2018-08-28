// Don't need to create complete deep clone; only to level we need to modify
export const getUpdatedForm = (form, name, value, checkValidity) => ({
  ...form,
  [name]: {
    ...form[name],
    value,
    valid: checkValidity(value, form[name].validation),
    touched: true,
  },
});
