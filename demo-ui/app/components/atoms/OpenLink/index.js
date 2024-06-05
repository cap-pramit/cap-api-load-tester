import React from 'react';
import { injectIntl } from 'react-intl';
import {
  CapRow,
  CapColumn,
  CapLink,
  CapIcon,
  CapTooltip,
} from '@capillarytech/cap-ui-library';
import messages from './messages';
import { StyleDiv } from './styles';

export function OpenLink({ link, className, intl, ...rest }) {
  const { formatMessage } = intl;
  const handleRowClick = e => {
    e.stopPropagation();
  };

  const openLinkInNewTab = () => {
    window.open(link, '_blank');
  };

  return (
    <CapRow
      onClick={handleRowClick}
      {...rest}
      className={className}
    >
      <CapColumn>
        <CapTooltip title={formatMessage(messages.openLinkInNewTab)}>
          <div>
            <CapLink
              title={
                <StyleDiv>
                  <CapIcon type="open-in-new-light" size="s" />
                </StyleDiv>
              }
              onClick={openLinkInNewTab}
            />
          </div>
        </CapTooltip>
      </CapColumn>
    </CapRow>
  );
}

export default injectIntl(OpenLink);
