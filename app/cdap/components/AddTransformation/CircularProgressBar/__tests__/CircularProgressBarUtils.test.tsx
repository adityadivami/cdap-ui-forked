import { prepareDataQualtiy } from '../utils';
import { columnList, statistics } from '../mock/mock';

describe('Should mock prepareDataQualtiy function', () => {
  it('should mock prepareDataQualtiy function', () => {
    prepareDataQualtiy(statistics, columnList);
  });
});
