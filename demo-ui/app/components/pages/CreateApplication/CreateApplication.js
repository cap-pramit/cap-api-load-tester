import React, { useEffect, useMemo, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { injectSaga } from '@capillarytech/vulcan-react-sdk/utils';
import {
  injectReducer,
  clearDataOnUnmount,
} from '@capillarytech/vulcan-react-sdk/utils';
import {
  CapHeader,
  CapIcon,
  CapRow,
  CapButton,
  CapSpin,
  CapStepsAccordian,
} from '@capillarytech/cap-ui-library';
import makeSelectCreateApplication, {
  makeSelectValidateAppName,
  makeSelectValidatePrefixPath,
  makeSelectValidateI18nApiConfig,
  makeSelectApplicationData,
  makeSelectCheckGlobalAppsAllowed,
} from './selectors';
import { makeSelectGlobal } from '../Cap/selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import CreateApplicationBasicDetails from '../../molecules/CreateApplicationBasicDetails';
import CreateApplicationAuthDetails from '../../molecules/CreateApplicationAuthDetails/CreateApplicationAuthDetails';
import CreateApplicationI18nDetails from '../../molecules/CreateApplicationI18nDetails/CreateApplicationI18nDetails';
import './styles.scss';
import {
  INITIAL_TRANSLATION_API_CONFIG,
  MODE_CREATE,
  MODE_EDIT,
  APP_TYPE_NATIVE,
  APP_TYPE_EXTERNAL,
  I18N_TYPES_INTOUCH,
  I18N_TYPES_CUSTOM,
  APP_LANGUAGE_REACT,
  STEP_BASIC,
  STEP_AUTH,
  STEP_I18N,
  CONFIG_TYPE_BASIC,
  CONFIG_TYPE_AUTH,
  CONFIG_TYPE_TRANSLATION,
  APP_TYPE_GLOBAL,
} from './constants';
import { REQUEST, SUCCESS } from '../App/constants';
import { isEmpty } from 'lodash';
import { StepAccordianHeader } from './styles';
import { localReducer, initialState } from './utils';
const CreateApplication = ({
  actions,
  history,
  intl: { formatMessage },
  match: {
    params: { applicationId },
  },
  validateAppNameData: { validAppId = '', validateAppNameStatus = null },
  validatePrefixPathData: {
    validPrefixPath = '',
    validateAppPrefixPathStatus = null,
    validateAppPrefixPathError = null,
  },
  validateI18nApiConfigData: {
    i18nApiConfigValid = null,
    validateI18nApiConfigStatus = null,
    validateI18nApiConfigError = null,
    i18nIntouchConfigValid = null,
  },
  applicationData: { getApplicationByAppIdStatus = null, applicationData = {} },
  global: { currentOrgDetails = {}, user = {} } = {},
  checkGlobalAppsAllowedData: { globalAppsAllowed = false } = {},
}) => {
  const mode = window.location.href.includes(MODE_EDIT)
    ? MODE_EDIT
    : MODE_CREATE;
  const editMode = mode === MODE_EDIT;

  const [currentState, dispatchAction] = useReducer(localReducer, initialState);

  const updateState = ({ type, updatedConfig }) => {
    dispatchAction({ type, updatedConfig });
  };

  // TODO - replace this with child orgs list from user data once multi-org approach is implemented and parent-child org data is available
  const accessibleOrgsData = useMemo(
    () => {
      if (!Array.isArray(user?.proxyOrgList)) {
        return [];
      }
      const duplicateCheckMap = {};
      return user?.proxyOrgList.reduce((acc, { orgID, orgName }) => {
        if (
          !duplicateCheckMap[orgID] &&
          orgID !== currentOrgDetails?.currentOrgId
        ) {
          duplicateCheckMap[orgID] = true;
          acc.push({
            title: orgName,
            key: orgID,
            value: orgID,
          });
        }
        return acc;
      }, []);
    },
    [user?.proxyOrgList],
  );

  useEffect(() => {
    if (editMode) {
      actions.getApplicationDetails(applicationId, formatMessage);
    } else {
      actions.checkGlobalAppsAllowed();
    }
  }, []);

  useEffect(
    () => {
      if (
        editMode &&
        getApplicationByAppIdStatus === SUCCESS &&
        applicationData
      ) {
        const {
          name,
          description,
          prefixPath,
          readmeLink,
          type,
          customDomain,
          accessibleOrgs = [],
          config: {
            authentication: {
              enabled: appEnableAuthEdit,
              type: externalAppAuthTypeEdit,
              identifier: identifierEdit,
            },
            translations: {
              enabled: enableTranslationEdit,
              type: appTranslationTypeEdit,
              locizeConfig: {
                projectName: locizeProjectNameEdit,
                projectId: locizeProjectIdEdit,
                projectKey: locizeProjectKeyEdit,
              } = {},
              api: apiEdit,
            } = {},
          },
        } = applicationData || {};
        updateState({
          type: CONFIG_TYPE_BASIC,
          updatedConfig: {
            appName: name,
            needNameValidation: false,
            appDescription: description,
            appReadme: readmeLink,
            appPrefixPath: prefixPath,
            appType: type,
            appCustomDomain: customDomain,
            accessibleOrgs,
          },
        });
        updateState({
          type: CONFIG_TYPE_AUTH,
          updatedConfig: {
            appEnableAuth: appEnableAuthEdit,
            externalAppAuthType: externalAppAuthTypeEdit,
            otpIdentifier: identifierEdit,
          },
        });
        updateState({
          type: CONFIG_TYPE_TRANSLATION,
          updatedConfig: {
            enableTranslation: enableTranslationEdit,
            appTranslationType: appTranslationTypeEdit,
            locizeProjectName: locizeProjectNameEdit,
            locizeProjectId: locizeProjectIdEdit,
            locizeProjectKey: locizeProjectKeyEdit,
            translationApiJson:
              JSON.stringify(apiEdit, null, 2) ||
              INITIAL_TRANSLATION_API_CONFIG,
          },
        });
      }
    },
    [getApplicationByAppIdStatus, applicationData],
  );

  useEffect(
    () => {
      if (validAppId) {
        updateState({
          type: CONFIG_TYPE_BASIC,
          updatedConfig: {
            appPrefixPath: `/${validAppId}/ui`,
          },
        });
      }
    },
    [validAppId, validateAppNameStatus],
  );

  const onClickBack = () => history.push('/');

  const isValidUserInputs = useMemo(
    () => {
      const isUnresolvedErrorFields = Object.values(
        currentState.errorFields,
      ).some(value => value);
      const {
        appName,
        appPrefixPath,
        appReadme,
        needNameValidation,
      } = currentState.basicConfig;
      const {
        enableTranslation,
        appTranslationType,
        locizeProjectId,
        locizeProjectKey,
        locizeProjectName,
        translationApiJson,
        i18nLocale,
        i18nLocaleIntouch,
      } = currentState.translationConfig;
      const isBasicEmptyCheckValidated =
        isEmpty(appName) || isEmpty(appPrefixPath) || isEmpty(appReadme);
      const isIntouchTypeTranslationInvalid =
        appTranslationType === I18N_TYPES_INTOUCH &&
        (isEmpty(locizeProjectName) ||
          isEmpty(locizeProjectId) ||
          isEmpty(locizeProjectKey) ||
          isEmpty(i18nLocaleIntouch) ||
          !i18nIntouchConfigValid);
      const isCustomTypeTranslationInvalid =
        appTranslationType === I18N_TYPES_CUSTOM &&
        (isEmpty(translationApiJson) ||
          isEmpty(i18nLocale) ||
          !i18nApiConfigValid);
      const isAppIdAndPrefixValidInCreateMode =
        (!editMode && (!validAppId || !validPrefixPath)) || needNameValidation;

      const isInvalidInput =
        isBasicEmptyCheckValidated ||
        isUnresolvedErrorFields ||
        (enableTranslation &&
          (isIntouchTypeTranslationInvalid ||
            isCustomTypeTranslationInvalid)) ||
        isAppIdAndPrefixValidInCreateMode;
      return !isInvalidInput;
    },
    [
      currentState.basicConfig,
      currentState.authConfig,
      currentState.translationConfig,
      currentState.errorFields,
      validAppId,
      validPrefixPath,
      i18nApiConfigValid,
      i18nIntouchConfigValid,
    ],
  );

  const createPayload = () => {
    const {
      appDescription,
      appReadme,
      appCustomDomain,
      appName,
      appPrefixPath,
      appType,
      accessibleOrgs,
    } = currentState.basicConfig;
    const {
      appEnableAuth,
      externalAppAuthType,
      otpIdentifier,
    } = currentState.authConfig;
    const {
      enableTranslation,
      appTranslationType,
      locizeProjectId,
      locizeProjectKey,
      locizeProjectName,
      translationApiJson,
    } = currentState.translationConfig;
    const payload = {
      description: appDescription,
      readmeLink: appReadme,
      customDomain: appCustomDomain,
      config: {
        translations: {
          enabled: enableTranslation,
        },
      },
      accessibleOrgs,
    };
    if (enableTranslation) {
      payload.config.translations.type = appTranslationType;
      if (appTranslationType === I18N_TYPES_INTOUCH) {
        payload.config.translations.locizeConfig = {
          projectName: locizeProjectName,
          projectId: locizeProjectId,
          projectKey: locizeProjectKey,
        };
      } else {
        const parsedObj = JSON.parse(translationApiJson);
        delete parsedObj.locale;
        payload.config.translations.api = parsedObj;
      }
    }

    if (!editMode) {
      payload._id = validAppId;
      payload.name = appName;
      payload.prefixPath = appPrefixPath;
      payload.type = appType;
      payload.language = APP_LANGUAGE_REACT;
      payload.config.authentication = {
        enabled: appEnableAuth,
      };
      if (appEnableAuth) {
        payload.config.authentication.type = externalAppAuthType;
        payload.config.authentication.identifier = otpIdentifier;
      }
    }
    return payload;
  };

  const handleCreateorEditApplicationClick = () => {
    const payload = createPayload();
    actions.createOrUpdateApplication({
      payload,
      appId: applicationData?._id,
      successMsg: formatMessage(
        messages[
        editMode ? 'applicationUpdatedSuccess' : 'applicationCreatedSuccess'
        ],
      ),
      history,
      formatMessage,
    });
  };

  const isTranslationStepCompleted = useMemo(
    () => {
      const {
        enableTranslation,
        appTranslationType,
        locizeProjectId,
        locizeProjectKey,
        locizeProjectName,
        translationApiJson,
        i18nLocale,
        i18nLocaleIntouch,
      } = currentState.translationConfig;
      const isLocizeConfigValid =
        !isEmpty(locizeProjectName) &&
        !isEmpty(locizeProjectId) &&
        !isEmpty(locizeProjectKey) &&
        !isEmpty(i18nLocaleIntouch);
      const isI18nApiConfigValid =
        !isEmpty(translationApiJson) && !isEmpty(i18nLocale);
      const isValidCustomTranslationConfig =
        appTranslationType === I18N_TYPES_CUSTOM &&
        isI18nApiConfigValid &&
        i18nApiConfigValid;
      const isValidIntouchTranslationConfig =
        appTranslationType === I18N_TYPES_INTOUCH &&
        isLocizeConfigValid &&
        i18nIntouchConfigValid;

      return (
        !enableTranslation ||
        ((enableTranslation && isValidIntouchTranslationConfig) ||
          isValidCustomTranslationConfig)
      );
    },
    [
      currentState.translationConfig,
      i18nApiConfigValid,
      i18nIntouchConfigValid,
    ],
  );

  const isAuthStepCompleted = useMemo(
    () => {
      const { basicConfig, errorFields } = currentState;
      const { appType, appReadme } = basicConfig;
      const isValidReadme = !isEmpty(appReadme) && !errorFields.appReadme;
      const isValidappIdAndPrefixPath =
        validateAppNameStatus === SUCCESS &&
        validateAppPrefixPathStatus === SUCCESS;

      return (
        editMode ||
        ((appType === APP_TYPE_NATIVE || appType === APP_TYPE_GLOBAL) &&
          isValidappIdAndPrefixPath &&
          isValidReadme) ||
        appType === APP_TYPE_EXTERNAL
      );
    },
    [
      currentState.authConfig,
      currentState.basicConfig,
      validateAppNameStatus,
      validateAppPrefixPathStatus,
      currentState.errorFields.appReadme,
      editMode,
    ],
  );

  const isBasicStepCompleted = useMemo(
    () => {
      const { basicConfig, errorFields } = currentState;
      const { appReadme } = basicConfig;
      const isValidReadme = !isEmpty(appReadme) && !errorFields.appReadme;
      const isValidappIdAndPrefixPath =
        validateAppNameStatus === SUCCESS &&
        validateAppPrefixPathStatus === SUCCESS;

      return isValidReadme && (editMode || isValidappIdAndPrefixPath);
    },
    [
      validateAppNameStatus,
      validateAppPrefixPathStatus,
      currentState.errorFields.appReadme,
      currentState.basicConfig,
      editMode,
    ],
  );

  const stepperItems = [
    {
      header: (
        <StepAccordianHeader
          className="accordian-header"
          size="label"
          title={formatMessage(messages.basicDetailsTitle)}
          description={formatMessage(messages.basicDetailsDescription)}
        />
      ),
      key: STEP_BASIC,
      content: (
        <CreateApplicationBasicDetails
          basicConfig={currentState.basicConfig}
          authConfig={currentState.authConfig}
          updateState={updateState}
          validateAppNameAction={actions.validateAppName}
          validatePrefixPathAction={actions.validatePrefixPath}
          editMode={editMode}
          validateAppNameStatus={validateAppNameStatus}
          errorFields={currentState.errorFields}
          validAppId={validAppId}
          validPrefixPath={validPrefixPath}
          applicationData={applicationData}
          validateAppPrefixPathStatus={validateAppPrefixPathStatus}
          validateAppPrefixPathError={validateAppPrefixPathError}
          currentOrgDetails={currentOrgDetails}
          globalAppsAllowed={globalAppsAllowed}
          accessibleOrgsData={accessibleOrgsData}
        />
      ),
      completed: isBasicStepCompleted,
    },
    {
      header: (
        <StepAccordianHeader
          className="accordian-header"
          size="label"
          title={formatMessage(messages.authDetailsTitle)}
          description={formatMessage(messages.authDetailsDescription)}
        />
      ),
      key: STEP_AUTH,
      disabled: currentState.basicConfig?.appType !== APP_TYPE_EXTERNAL,
      content: (
        <CreateApplicationAuthDetails
          authConfig={currentState.authConfig}
          updateState={updateState}
          editMode={editMode}
        />
      ),
      completed: isAuthStepCompleted,
    },
    {
      header: (
        <StepAccordianHeader
          className="accordian-header"
          size="label"
          title={formatMessage(messages.i18nDetailsTitle)}
          description={formatMessage(messages.i18nDetailsDescription)}
        />
      ),
      key: STEP_I18N,
      content: (
        <CreateApplicationI18nDetails
          translationConfig={currentState.translationConfig}
          updateState={updateState}
          appType={currentState.basicConfig?.appType}
          errorFields={currentState.errorFields}
          i18nApiConfigValid={i18nApiConfigValid}
          i18nIntouchConfigValid={i18nIntouchConfigValid}
          validateI18nApiConfigAction={actions.validateI18nApiConfig}
          validateI18nApiConfigStatus={validateI18nApiConfigStatus}
          validateI18nApiConfigError={validateI18nApiConfigError}
        />
      ),
      completed: isTranslationStepCompleted,
    },
  ];

  return (
    <CapSpin spinning={editMode && getApplicationByAppIdStatus === REQUEST}>
      <CapRow className="create-application-container">
        <CapHeader
          titleClass="create-application-header"
          title={
            editMode
              ? formatMessage(messages.editApplication)
              : formatMessage(messages.createApplication)
          }
          prefix={
            <CapIcon
              type="back"
              data-testid="back-icon"
              onClick={onClickBack}
            />
          }
        />
        <CapStepsAccordian
          className="create-app-steps-accordian"
          defaultActiveKey={STEP_BASIC}
          items={stepperItems}
          bordered={false}
        />
        <CapButton
          className="create-edit-application-btn"
          disabled={!isValidUserInputs}
          onClick={handleCreateorEditApplicationClick}
        >
          {formatMessage(
            messages[editMode ? 'editApplication' : 'createApplication'],
          )}
        </CapButton>
      </CapRow>
    </CapSpin>
  );
};

CreateApplication.propTypes = {
  actions: PropTypes.object,
  history: PropTypes.object,
  intl: PropTypes.object,
  validateAppNameData: PropTypes.object,
  validatePrefixPathData: PropTypes.object,
  validateI18nApiConfigData: PropTypes.object,
  createApplication: PropTypes.object,
  applicationData: PropTypes.object,
  global: PropTypes.object,
  checkGlobalAppsAllowedData: PropTypes.object,
};

CreateApplication.defaultProps = {
  actions: {},
  history: {},
  intl: {},
  validateAppNameData: {},
  validatePrefixPathData: {},
  validateI18nApiConfigData: {},
  applicationData: {},
  global: {},
  checkGlobalAppsAllowedData: {},
};

const mapStateToProps = createStructuredSelector({
  createApplication: makeSelectCreateApplication(),
  validateAppNameData: makeSelectValidateAppName(),
  validatePrefixPathData: makeSelectValidatePrefixPath(),
  validateI18nApiConfigData: makeSelectValidateI18nApiConfig(),
  applicationData: makeSelectApplicationData(),
  global: makeSelectGlobal(),
  checkGlobalAppsAllowedData: makeSelectCheckGlobalAppsAllowed(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

//Do not remote your appName hash from here.
const withReducer = injectReducer({
  key: `${CURRENT_APP_NAME}-createApplication`,
  reducer,
});
//Do not remote your appName hash from here.
const withSaga = injectSaga({
  key: `${CURRENT_APP_NAME}-createApplication`,
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(clearDataOnUnmount(withRouter(injectIntl(CreateApplication))));
