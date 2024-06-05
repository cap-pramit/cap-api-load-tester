import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import '../../pages/CreateApplication/styles.scss';
import { CapHeading, CapRow, CapRadioGroup, CapRadio, CapTooltipWithInfo } from '@capillarytech/cap-ui-library';
import messages from '../../pages/CreateApplication/messages';
import { CONFIG_TYPE_AUTH, IDENTIFIER_TYPE_EMAIL, IDENTIFIER_TYPE_MOBILE, LOGIN_TYPE_DUAL, LOGIN_TYPE_OTP, LOGIN_TYPE_PASSWORD } from '../../pages/CreateApplication/constants';

const CreateApplicationAuthDetails = ({
  intl: { formatMessage },
  authConfig: {
    externalAppAuthType,
    otpIdentifier,
  },
  updateState,
  editMode,
}) => {
  const handleExternalAppAuthTypeChange = e => updateState({
    type: CONFIG_TYPE_AUTH, updatedConfig: { externalAppAuthType: e.target.value }
  });
  const handleOtpIdentifierChange = e => updateState({
    type: CONFIG_TYPE_AUTH, updatedConfig: { otpIdentifier: e.target.value }
  });
  return (
    <CapRow className="accordian-content">
      <CapRow className="application-detail-row">
        <CapHeading type="h3">
          {formatMessage(messages.appAuthType)}
        </CapHeading>
        <CapRadioGroup
          disabled={editMode}
          className="radio-group-app-auth-type"
          onChange={handleExternalAppAuthTypeChange}
          value={externalAppAuthType}
        >
          <CapRadio value={LOGIN_TYPE_OTP}>
            {formatMessage(messages.otpAuthType)}
          </CapRadio>
          <CapRadio value={LOGIN_TYPE_PASSWORD}>
            {formatMessage(messages.passwordAuthType)}
          </CapRadio>
          <CapRadio
            value={LOGIN_TYPE_DUAL}
            disabled
            suffix={
              <CapTooltipWithInfo
                title={formatMessage(messages.comingSoon)}
                className="app-type-info"
              />
            }
          >
            {formatMessage(messages.dualScreenAuthType)}
          </CapRadio>
        </CapRadioGroup>
      </CapRow>
      {externalAppAuthType !== LOGIN_TYPE_DUAL &&
        <CapRow className="application-detail-row">
          <CapHeading type="h3">
            {formatMessage(messages.otpIdentifier)}
          </CapHeading>
          <CapRadioGroup
            className="radio-group-app-otp-identifier"
            onChange={handleOtpIdentifierChange}
            value={otpIdentifier}
            disabled={editMode}
          >
            <CapRadio value={IDENTIFIER_TYPE_MOBILE}>
              {formatMessage(messages.mobileIdentifier)}
            </CapRadio>
            <CapRadio value={IDENTIFIER_TYPE_EMAIL}>
              {formatMessage(messages.emailIdentifier)}
            </CapRadio>
          </CapRadioGroup>
        </CapRow>
      }
    </CapRow>
  );
}

CreateApplicationAuthDetails.propTypes = {
  intl: intlShape.isRequired,
  editMode: PropTypes.bool,
  authConfig: PropTypes.object,
  updateState: PropTypes.func,
};

CreateApplicationAuthDetails.defaultProps = {
  intl: {},
  editMode: false,
  authConfig: {},
  updateState: () => { },
};

export default injectIntl(CreateApplicationAuthDetails);
