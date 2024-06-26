import { defaultAction } from '../actions';
import { actionTypes } from '../constants';

describe('ViewApplication actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: actionTypes.DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
