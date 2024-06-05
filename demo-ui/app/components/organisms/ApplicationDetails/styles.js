import { css } from 'styled-components';

const ScrollableDivStyles = css`
  min-height: 30vh;
  .accessible-orgs-tooltip {
    cursor: pointer;
    color: #2466ea;
  }
  .application-actions {
    float: right;
    margin-top: -1%;
    .cap-icon-v2 {
      transform: rotate(90deg);
    }
  }
`;

export default ScrollableDivStyles;
