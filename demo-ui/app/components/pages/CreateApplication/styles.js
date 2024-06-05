import styled from 'styled-components';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import { CAP_SPACE_04, CAP_SPACE_12} from '@capillarytech/cap-ui-library/styled/variables'

export const StepAccordianHeader = styled(CapHeader)`
  display: block;
  width: 100%;
  padding: ${CAP_SPACE_04} ${CAP_SPACE_12};
  .cap-header-v2-title {
    display: flex;
    .step-value {
      margin-left: auto;
    }
  }
`;