import React from 'react';
import { FormattedMessage } from 'react-intl';

import emptyStateIllustration from '../../../assets/no_applications.svg';
import {
  CapImage,
  CapRow,
  CapColumn,
  CapHeading,
} from '@capillarytech/cap-ui-library';

function EmptyStateIllustration({ className, emptyIllustrationText = '' }) {
  return (
    <div className={className}>
      <CapRow type="flex" align="middle" justify="center" className="fade-in">
        <CapColumn>
          <CapImage src={emptyStateIllustration} />
        </CapColumn>
      </CapRow>
      <br />
      <CapRow type="flex" align="middle" justify="center">
        <CapColumn>
          <CapHeading type="h3">{emptyIllustrationText}</CapHeading>
        </CapColumn>
      </CapRow>
    </div>
  );
}

export default EmptyStateIllustration;
