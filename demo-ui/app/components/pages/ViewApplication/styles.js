import { css } from 'styled-components';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
const { CAP_SPACE_20, CAP_SPACE_08 } = styledVars;

export default css`
  .view-app-accordion {
    width: 95%;
    margin-left: 3.142rem;
  }
  .back-btn {
    width: 5%;
    padding-top: ${CAP_SPACE_08};
  }
  .create-application-header {
    margin-left: ${CAP_SPACE_20};
    font-size: ${CAP_SPACE_20};
  }
`;
