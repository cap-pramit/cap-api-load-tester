import listingsReducer, { initialState } from '../reducer';

describe('listings Reducer', () => {
  it('it handles the reducer with default type', () => {
    expect(listingsReducer(undefined, {})).toEqual(initialState);
  });
});
