import { createGlobalStyle } from 'styled-components';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

const { CAP_SPACE_04, CAP_SPACE_40, FONT_COLOR_01, FONT_COLOR_04, FONT_SIZE_L } = styledVars;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 14px;
    line-height: unset;
  }

  body.fontLoaded {
    font-family: 'Roboto', Arial, sans-serif;
  }

  #vulcanWebapp-container {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Roboto', Arial, sans-serif;
    line-height: 1.5em;
  }

  .vulcanWebapp-body {
    .ant-popover,
    .ant-select-dropdown,
    .ant-select-dropdown.ant-select-dropdown--single,
    .ant-calendar-picker-container,
    .ant-notification,
    .ant-tooltip,
    .ant-modal-mask,
    .ant-modal-wrap {
      z-index: 10003; /* setting z-index, to be able to show the contect on top of slidebox */
    }
  }
  
  
  ul, ol {
    list-style: none;
    padding: 0;
  }

  .pointer-cursor {
    cursor: pointer;
  }

  .truncate-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .align-items-center, div.align-items-center {
    display: flex;
    align-items: center;
  }

  .slide-box-size-medium{
    width: 660px;
  }

  // For Loadable Spin
  &.ant-spin.ant-spin-spinning {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  // temp fix
  // Need to handle in cap-react-ui-library
  .ant-input-affix-wrapper .ant-input {
    height: ${CAP_SPACE_40};
    border: 1px solid ${FONT_COLOR_04} ;
    border-radius: ${CAP_SPACE_04} ;
    &:focus, &:hover {
      border-color: ${FONT_COLOR_01};
    }
  }

  .capitalize-text {
    text-transform: capitalize;
  }

  .overflow-wrap {
    overflow-wrap: break-word;
  }

  /* Define keyframes for fade-in and fade-out */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  /* Apply the fade-in animation */
  .fade-in {
    animation-delay: 0.1s;
    animation: fadeIn 0.3s ease-in forwards;
  }

  /* Apply the fade-out animation */
  .fade-out {
    animation-delay: 0.1s;
    animation: fadeOut 0.3s ease-out forwards;
  }

  .accessible-orgs-tooltip-overlay {
    .ant-tooltip-inner {
      width: 120%;
    }
  }

  .cap-multi-select-v2-popover {
    .ant-popover-content {
      .options {
        padding: 0.825rem !important;
      }
    }
  }

  .rotate-full {
    transform: rotate(0deg);
    animation-delay: 0.25s;
    animation: rotateAnimation 0.5s ease-in;
  }

  @keyframes rotateAnimation {
      from {
          opacity: 0;
      }
      to {
          transform: rotate(360deg);
          opacity: 1;
      }
  }

  .rotate-continuous {
    animation: rotateContinuous 2s linear infinite; /* Adjust the duration and timing function as needed */
  }

  .progress-icon {
    font-size: 20px;
  }

  @keyframes rotateContinuous {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  /* Disable animations for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .fade-in, .fade-out, .rotate-full, .rotate-continuous {
      transition: none;
      animation: none;
    }
  }

  .ant-notification-notice-icon-info > svg{
    height: ${FONT_SIZE_L};
  }

  .ant-notification-notice-message{
    margin-bottom: 0px;
  }

  .ant-pagination-item-link .anticon{
    vertical-align: unset;
  }
`;

export default GlobalStyle;
