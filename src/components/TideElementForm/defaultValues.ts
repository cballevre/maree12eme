import { DATE, TIME, HEIGHT } from './fieldsNames';

export default {
  [DATE]: new Date().toISOString().slice(0, 10),
  [TIME]: '',
  [HEIGHT]: 0,
};
