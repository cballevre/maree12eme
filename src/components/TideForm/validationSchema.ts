import * as yup from 'yup';
import tideElementValidationSchema from '../TideElementForm/validationSchema';
import { START, END } from './fieldsNames';

export default yup.object({
  [START]: tideElementValidationSchema,
  [END]: tideElementValidationSchema,
});
