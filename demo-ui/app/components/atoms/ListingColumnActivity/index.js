import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CapRow, CapIcon, CapPopover } from '@capillarytech/cap-ui-library';
import messages from './messages';

import CreateAndUpdate from './CreateAndUpdate';

export default function index({ record, formatMessage }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <CapRow onClick={handleClick} type="flex" justify="center">
      {/* <CapPopover
        content={<CreateAndUpdate {...record} formatMessage={formatMessage} />}
        title={<FormattedMessage {...messages.creationAndUpdateDetails} />}
      >
        <CapIcon type="note" size="s" />
      </CapPopover> */}
      <CreateAndUpdate {...record} formatMessage={formatMessage} />
    </CapRow>
  );
}
