import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils'

const scope = "/Components/pages/Listing/"

export const actionTypes = defineActionTypes(
  {
    CLEAR_DATA: 'CLEAR_DATA',
    GET_LISTING_DATA_REQUEST: 'GET_LISTING_DATA_REQUEST',
    GET_LISTING_DATA_SUCCESS: 'GET_LISTING_DATA_SUCCESS',
    GET_LISTING_DATA_FAILURE: 'GET_LISTING_DATA_FAILURE',
  },
  { prefix: CURRENT_APP_NAME, scope: scope },
);


export const AVATAR_ICON_COLORS = [
  { text: '#E51FA3', background: '#FAD2ED' },
  { text: '#8517E5', background: '#E7D1FA' },
  { text: '#2466EA', background: '#D7E0FF' },
  { text: '#23CCCC', background: '#D3F5F5' },
  { text: '#46AF45', background: '#D9EFDA' },
  { text: '#F87D22', background: '#FEE5D3' },
  { text: '#EA223A', background: '#FBD3D8' },
];

export const TABLE_SCROLL_CONFIG = {
  y: window.innerHeight - 300 > 400 ? window.innerHeight - 300 : 400, //Note: this is same config as other products campaigns, adiona
}
export const SEARCH_DEBOUNCE_TIME_MS = 1000;