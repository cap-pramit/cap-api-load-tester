import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  CapRow,
  CapMenu,
  CapDropdown,
  CapIcon,
} from '@capillarytech/cap-ui-library';

import messages from './messages';
import RbacTooltipWrapper from '../RbacTooltipWrapper';
import { Auth } from '@capillarytech/cap-ui-utils';
import { VULCAN_EDIT_APPLICATION, VULCAN_APP_LISTING_MODE } from '../../pages/App/constants';
import { APP_TYPE_GLOBAL } from '../../pages/CreateApplication/constants';

function ListingColumnActions({
  record,
  history,
  mode = VULCAN_APP_LISTING_MODE,
}) {
  const appId = record?._id;

  const handleRowClick = e => {
    e.domEvent.stopPropagation();
  };

  const menu = (
    <CapMenu onClick={handleRowClick}>
      {mode === VULCAN_APP_LISTING_MODE && (
        <CapMenu.Item
          onClick={() => {
            history.push(`/view/${appId}`);
          }}
        >
          <FormattedMessage {...messages.viewApplication} />
        </CapMenu.Item>
      )}
      <CapMenu.Item
        onClick={() => {
          history.push(`/edit/${appId}`);
        }}
        disabled={!Auth.hasAccess(VULCAN_EDIT_APPLICATION) || record?.type === APP_TYPE_GLOBAL}
      >
        <RbacTooltipWrapper
          permission={VULCAN_EDIT_APPLICATION}
          customTooltipMsg={record?.type === APP_TYPE_GLOBAL && <FormattedMessage {...messages.globalAppEditNotAllowed} />}
        >
          <CapRow>
          <FormattedMessage {...messages.editApplication} />
          </CapRow>
        </RbacTooltipWrapper>
      </CapMenu.Item>
    </CapMenu>
  );

  const handleDropdownClick = e => {
    e.stopPropagation();
  };

  return (
    <CapRow>
      <CapDropdown onClick={handleDropdownClick} overlay={menu}>
        <CapIcon type="more" aria-label="Action menu icon" />
      </CapDropdown>
    </CapRow>
  );
}

export default ListingColumnActions;
