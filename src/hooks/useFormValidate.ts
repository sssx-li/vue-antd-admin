import { Form } from 'ant-design-vue';

export function useFormValidate(data?: any, rules?: any) {
  const useForm = Form.useForm;
  const { resetFields, validate, validateInfos } = useForm(data, rules);
  return {
    resetFields,
    validate,
    validateInfos
  };
}
