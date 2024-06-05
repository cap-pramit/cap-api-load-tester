import { css } from 'styled-components';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
const { CAP_SPACE_04, CAP_SPACE_08, CAP_PALE_GREY } = styledVars;

export default css`
  .deployment-version-text {
    padding-right: ${CAP_SPACE_04};
    /* Use ::before pseudo-element to insert version(v) before the element */
    &::before {
      content: 'v';
    }
  }

  .upload-duration-text {
    /* Use ::before pseudo-element to insert seconds(s) before the element */
    &::after {
      content: 's';
    }
  }
  .refresh-deployments {
    background-color: ${CAP_PALE_GREY};
    padding: ${CAP_SPACE_04};
    margin: ${CAP_SPACE_08};
    border-radius: 50%;
    &:hover {
      filter: brightness(0.9);
    }

    .top-row{
      padding-right: 1rem;
    }
  }

  /* height: 50vh; */
  /* overflow-y: scroll; Enable vertical scrolling */
`;
