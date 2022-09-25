import * as yup from 'yup';
import tideElementValidationSchema from '../TideElementForm/validationSchema';
import { START, END, IS_RISING } from './fieldsNames';

const REQUIRED_MESSAGE = 'This field is required';

export default yup.object({
  [IS_RISING]: yup.number().required(REQUIRED_MESSAGE),
  [START]: tideElementValidationSchema,
  [END]: tideElementValidationSchema,
});
