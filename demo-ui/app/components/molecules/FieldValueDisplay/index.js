import React from 'react';
import { CapRow, CapColumn, CapLabel } from '@capillarytech/cap-ui-library';
import OpenLink from '../../atoms/OpenLink';
import styles, { StyledCapRow } from './styles';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
const renderValue = (value, type) => {
  if (type === 'link') {
    return (
      <CapRow type="flex">
        {value}
        {value && value !== '-' && <OpenLink link={value} />}
      </CapRow>
    );
  }
  if (type === 'bool') {
    return <FormattedMessage {...(value ? messages.yes : messages.no)} />;
  }
  if (value === '' || !value) return '-';
  return value;
};

const FieldValueDisplay = ({className, label, value, type, ...rest }) => {
  return (
    <StyledCapRow className={className} type="flex">
      <CapColumn span={4}>
        <CapLabel className='app-details-field-label'>{label}</CapLabel>
      </CapColumn>
      <CapColumn>
        <CapRow type="flex" gutter={4} className={className}>
          {renderValue(value, type)}
        </CapRow>
      </CapColumn>
    </StyledCapRow>
  );
};

export default withStyles(FieldValueDisplay, styles);
