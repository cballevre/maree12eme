import * as yup from 'yup';
import { DATE, TIME, HEIGHT } from './fieldsNames';

const REQUIRED_MESSAGE = 'This field is required';

export default yup.object({
  [DATE]: yup.string().required(REQUIRED_MESSAGE),
  [TIME]: yup.string().required(REQUIRED_MESSAGE),
  [HEIGHT]: yup.number().required(REQUIRED_MESSAGE),
});
