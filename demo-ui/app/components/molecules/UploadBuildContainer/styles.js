import { css } from 'styled-components';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
const { CAP_SPACE_04, CAP_SPACE_08, CAP_SPACE_12, CAP_G02 } = styledVars;
export default css`
  .file-size-info-text {
    padding: ${CAP_SPACE_04} 0;
    color: ${CAP_G02};
  }
  .ant-upload-list-item-info .anticon-loading {
    display: none;
  }
  .selected-file {
    margin: ${CAP_SPACE_12} 0;
    background-color: rgb(255, 244, 214);
    margin-top: ${CAP_SPACE_08};
    padding: ${CAP_SPACE_12};
    border-radius: ${CAP_SPACE_04};
    .remove-selection-icon {
      margin-top: -${CAP_SPACE_04};
    }
  }
  .confirm-upload-button {
    height: 100%;
    margin-top: 20%;
  }

  .attach-icon {
    margin-top: -6px;
  }
`;
