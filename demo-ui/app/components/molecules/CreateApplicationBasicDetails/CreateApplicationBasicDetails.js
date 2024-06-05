import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import '../../pages/CreateApplication/styles.scss';
import {
  CapHeading,
  CapRow,
  CapRadioGroup,
  CapRadio,
  CapTooltipWithInfo,
  CapAlert,
  CapMultiSelect,
} from '@capillarytech/cap-ui-library';
import isEmpty from 'lodash/isEmpty';
import messages from '../../pages/CreateApplication/messages';
import CreateEditAppInputRow from '../../atoms/CreateEditAppInputRow';
import { FAILURE } from '../../pages/App/constants';
import {
  APP_TYPE_EXTERNAL,
  APP_TYPE_NATIVE,
  APP_TYPE_GLOBAL,
  CONFIG_TYPE_AUTH,
  CONFIG_TYPE_BASIC,
  CONFIG_TYPE_ERRORFIELDS,
  CONFIG_TYPE_TRANSLATION,
  I18N_TYPES_CUSTOM,
  I18N_TYPES_INTOUCH,
  REGEX_ATLEAST_ONE_ALPHABET,
  REGEX_VALID_APP_NAME,
  REGEX_VALID_DOMAINS,
  REGEX_VALID_PREFIX_PATH,
  REGEX_VALID_URL,
  CAPILLARY_ORG,
} from '../../pages/CreateApplication/constants';
import CreateEditAppInputRowWithValidate from '../../atoms/CreateEditAppInputRowWithValidate';

const CreateApplicationBasicDetails = ({
  intl: { formatMessage },
  basicConfig: {
    appName,
    appDescription,
    appReadme,
    appPrefixPath,
    appType,
    appCustomDomain,
    accessibleOrgs = [],
  },
  updateState,
  validateAppNameAction,
  validatePrefixPathAction,
  editMode,
  validateAppNameStatus,
  errorFields,
  validAppId,
  validPrefixPath,
  applicationData,
  validateAppPrefixPathStatus,
  validateAppPrefixPathError,
  currentOrgDetails,
  globalAppsAllowed,
  accessibleOrgsData,
}) => {
  const handleNameChange = e => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_BASIC,
      updatedConfig: { appName: val, needNameValidation: true },
    });
    if (
      !REGEX_VALID_APP_NAME.test(val) ||
      !REGEX_ATLEAST_ONE_ALPHABET.test(val)
    ) {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { appName: true },
      });
    } else {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { appName: null },
      });
    }
  };

  const handleValidateAppName = () => {
    updateState({
      type: CONFIG_TYPE_BASIC,
      updatedConfig: { needNameValidation: false },
    });
    validateAppNameAction(appName, formatMessage);
  };

  const handleDescriptionChange = e =>
    updateState({
      type: CONFIG_TYPE_BASIC,
      updatedConfig: { appDescription: e.target.value },
    });

  const handleAppPrefixPathChange = e => {
    const val = e.target.value || '';
    updateState({
      type: CONFIG_TYPE_BASIC,
      updatedConfig: { appPrefixPath: val },
    });
    if (isEmpty(val) || !REGEX_VALID_PREFIX_PATH.test(val)) {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { appPrefixPath: true },
      });
    } else {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { appPrefixPath: null },
      });
    }
  };

  const handleAppReadmeChange = e => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_BASIC,
      updatedConfig: { appReadme: val },
    });
    if (!REGEX_VALID_URL.test(val)) {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { appReadme: true },
      });
    } else {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { appReadme: null },
      });
    }
  };

  const handleAppCustomDomainChange = e => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_BASIC,
      updatedConfig: { appCustomDomain: val },
    });
    if (!REGEX_VALID_DOMAINS.test(val)) {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { appCustomDomain: true },
      });
    } else {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { appCustomDomain: null },
      });
    }
  };

  const handleAppTypeChange = e => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_TRANSLATION,
      updatedConfig: {
        appTranslationType:
          val === APP_TYPE_EXTERNAL ? I18N_TYPES_CUSTOM : I18N_TYPES_INTOUCH,
        locizeProjectName: '',
        locizeProjectId: '',
        locizeProjectKey: '',
      },
    });
    updateState({
      type: CONFIG_TYPE_AUTH,
      updatedConfig: { appEnableAuth: val === APP_TYPE_EXTERNAL },
    });
    updateState({
      type: CONFIG_TYPE_BASIC,
      updatedConfig: { appType: val, appCustomDomain: '' },
    });
  };

  const validateAppPrefixPath = e =>
    validatePrefixPathAction(e.target.value, formatMessage);

  const handleAccessibleOrgsListChange = selectedOrgs => {
    updateState({
      type: CONFIG_TYPE_BASIC,
      updatedConfig: {
        accessibleOrgs: selectedOrgs.map(orgID => Number(orgID)),
      },
    });
  };

  return (
    <CapRow className="accordian-content">
      <CreateEditAppInputRowWithValidate
        value={appName}
        changeHandler={handleNameChange}
        disabled={editMode}
        placeholder={formatMessage(messages.namePlaceholder)}
        label={formatMessage(messages.name)}
        errorMessage={
          errorFields.appName
            ? formatMessage(messages.invalidAppName)
            : validateAppNameStatus === FAILURE
              ? formatMessage(messages.appNameDuplicateError)
              : ''
        }
        validateStatus={validateAppNameStatus}
        validValue={validAppId}
        btnType="secondary"
        btnDisabled={!appName || errorFields.appName || editMode}
        btnOnClick={handleValidateAppName}
        btnClassName="validate-app-name-btn"
        btnLabel={formatMessage(messages.validate)}
        editMode={editMode}
      />
      <CreateEditAppInputRow
        value={validAppId || applicationData?._id || ''}
        placeholder={formatMessage(messages.applicationIdPlaceholder)}
        label={formatMessage(messages.applicationId)}
        disabled
      />
      <CreateEditAppInputRow
        value={appDescription}
        changeHandler={handleDescriptionChange}
        placeholder={formatMessage(messages.descriptionPlaceholder)}
        label={formatMessage(messages.description)}
      />
      <CreateEditAppInputRow
        value={appReadme}
        changeHandler={handleAppReadmeChange}
        placeholder={formatMessage(messages.readmePlaceholder)}
        label={formatMessage(messages.readme)}
        errorMessage={
          errorFields.appReadme && formatMessage(messages.invalidReadmeLink)
        }
      />
      <CreateEditAppInputRowWithValidate
        value={appPrefixPath}
        disabled={editMode}
        focusOutHandler={validateAppPrefixPath}
        changeHandler={handleAppPrefixPathChange}
        placeholder={formatMessage(messages.prefixPathPlaceholder)}
        label={formatMessage(messages.prefixPath)}
        errorMessage={
          errorFields.appPrefixPath
            ? formatMessage(messages.invalidPrefixPath)
            : validateAppPrefixPathStatus === FAILURE &&
            validateAppPrefixPathError
        }
        validateStatus={validateAppPrefixPathStatus}
        validValue={validPrefixPath}
        showValidateButton={false}
        editMode={editMode}
      />
      <CapRow className="application-detail-row">
        <CapHeading type="h3">{formatMessage(messages.appType)}</CapHeading>
        <CapRadioGroup
          className="radio-group-app-type"
          onChange={handleAppTypeChange}
          value={appType}
          disabled={editMode}
        >
          <CapRadio
            value={APP_TYPE_GLOBAL}
            name={formatMessage(messages.globalAppType)}
            disabled={
              currentOrgDetails?.basic_details?.org_id !== CAPILLARY_ORG || !globalAppsAllowed
            }
            suffix={
              <CapTooltipWithInfo
                title={formatMessage(messages[!globalAppsAllowed ? 'globalAppTypeInfoGlobalConfig' : 'globalAppTypeInfo'])}
                className="app-type-info"
              />
            }
          >
            {formatMessage(messages.globalAppType)}
          </CapRadio>
          <CapRadio
            value={APP_TYPE_NATIVE}
            name={formatMessage(messages.nativeAppType)}
            suffix={
              <CapTooltipWithInfo
                title={formatMessage(messages.nativeAppTypeInfo)}
                className="app-type-info"
              />
            }
          >
            {formatMessage(messages.nativeAppType)}
          </CapRadio>
          <CapRadio
            value={APP_TYPE_EXTERNAL}
            name={formatMessage(messages.externalAppType)}
            disabled //disabled for demo, Need to remove this
            suffix={
              <CapTooltipWithInfo
                title={formatMessage(messages.comingSoon)} //disabled for demo, need to remove this
                // title={formatMessage(messages.externalAppTypeInfo)}
                className="app-type-info"
              />
            }
          >
            {formatMessage(messages.externalAppType)}
          </CapRadio>
        </CapRadioGroup>
      </CapRow>
      <CapRow>
        {appType === APP_TYPE_GLOBAL && (
          <CapAlert message={formatMessage(messages.globalAppTypeAlert)} type="warning" />
        )}
      </CapRow>
      {appType !== APP_TYPE_GLOBAL && (
        <CapRow className="application-detail-row">
          <CapHeading type="h3">
            {formatMessage(messages.accessibleOrgs)}
          </CapHeading>
          <CapMultiSelect
            treeData={accessibleOrgsData}
            appliedKeys={accessibleOrgs}
            onSelect={handleAccessibleOrgsListChange}
            placeholder={formatMessage(messages.accessibleOrgsPlaceholder)}
            disabled={appType === APP_TYPE_GLOBAL}
            disableSelectAll
            // maxValuesToSelect={5}
            showSelectButtonToolTip
            selectTooltipText={formatMessage(messages.accessibleOrgsSelectText)}
            searchPlaceholder={formatMessage(messages.searchOrganizations)}
          />
        </CapRow>
      )}
      {appType === APP_TYPE_EXTERNAL && (
        <CreateEditAppInputRow
          value={appCustomDomain}
          changeHandler={handleAppCustomDomainChange}
          placeholder={formatMessage(messages.customDomainPlaceholder)}
          label={formatMessage(messages.customDomain)}
          errorMessage={
            errorFields.appCustomDomain &&
            formatMessage(messages.invalidCustomDomain)
          }
        />
      )}
    </CapRow>
  );
};

CreateApplicationBasicDetails.propTypes = {
  intl: intlShape.isRequired,
  editMode: PropTypes.bool,
  validateAppNameStatus: PropTypes.string,
  errorFields: PropTypes.object,
  validAppId: PropTypes.string,
  handleValidateAppName: PropTypes.func,
  applicationData: PropTypes.object,
  validateAppPrefixPathStatus: PropTypes.string,
  validateAppPrefixPathError: PropTypes.string,
  basicConfig: PropTypes.object,
  updateState: PropTypes.func,
  validateAppNameAction: PropTypes.func,
  validPrefixPath: PropTypes.string,
  currentOrgDetails: PropTypes.object,
  globalAppsAllowed: PropTypes.bool,
  accessibleOrgsData: PropTypes.array,
};

CreateApplicationBasicDetails.defaultProps = {
  editMode: false,
  validateAppNameStatus: '',
  errorFields: {},
  validAppId: '',
  handleValidateAppName: () => { },
  applicationData: {},
  validateAppPrefixPathStatus: '',
  validateAppPrefixPathError: '',
  basicConfig: {},
  updateState: () => { },
  validateAppNameAction: () => { },
  validPrefixPath: '',
  currentOrgDetails: {},
  globalAppsAllowed: false,
  accessibleOrgsData: [],
};

export default injectIntl(CreateApplicationBasicDetails);
