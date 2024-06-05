import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import {
  CapHeading, CapRow, CapRadioGroup, CapRadio, CapTooltipWithInfo, CapColumn, CapButton, CapError
} from '@capillarytech/cap-ui-library';
import messages from '../../pages/CreateApplication/messages';
import { APP_TYPE_EXTERNAL, I18N_TYPES_INTOUCH, I18N_TYPES_CUSTOM, CONFIG_TYPE_TRANSLATION, CONFIG_TYPE_ERRORFIELDS } from '../../pages/CreateApplication/constants';
import { FAILURE } from '../../pages/App/constants';
import CreateEditAppInputRow from '../../atoms/CreateEditAppInputRow';
import '../../pages/CreateApplication/styles.scss';
import { isEmpty } from 'lodash';
import CreateEditAppInputRowWithValidate from '../../atoms/CreateEditAppInputRowWithValidate';

function CreateApplicationI18nDetails({
  intl: { formatMessage },
  translationConfig: {
    enableTranslation,
    appTranslationType,
    locizeProjectName,
    locizeProjectId,
    locizeProjectKey,
    translationApiJson,
    i18nLocale,
    i18nLocaleIntouch,
  },
  updateState,
  appType,
  errorFields,
  validateI18nApiConfigAction,
  validateI18nApiConfigStatus,
  validateI18nApiConfigError,
  i18nApiConfigValid,
  i18nIntouchConfigValid,
}) {
  const handleEnableTranslationChange = (e) => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_TRANSLATION,
      updatedConfig: {
        enableTranslation: val,
        appTranslationType: val ?
          appType === APP_TYPE_EXTERNAL ? I18N_TYPES_CUSTOM : I18N_TYPES_INTOUCH
          : ''
      }
    });
    if (val === false) {
      clearLocizeConfig();
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: {
          locizeProjectId: null,
          locizeProjectKey: null,
          locizeProjectName: null
        }
      });
    }
  };

  const handleAppTranslationTypeChange = (e) => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_TRANSLATION,
      updatedConfig: { appTranslationType: val }
    });
    if (val === I18N_TYPES_CUSTOM) {
      clearLocizeConfig();
    }
  };

  const clearLocizeConfig = () => updateState({
    type: CONFIG_TYPE_TRANSLATION,
    updatedConfig: {
      locizeProjectName: '',
      locizeProjectId: '',
      locizeProjectKey: '',
    }
  });

  const handleLocizeProjectNameChange = (e) => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_TRANSLATION,
      updatedConfig: { locizeProjectName: val }
    });
    if (isEmpty(val)) {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { locizeProjectName: true }
      });
    } else {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { locizeProjectName: null }
      });
    }
  };

  const handleLocizeProjectIdChange = (e) => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_TRANSLATION,
      updatedConfig: { locizeProjectId: val }
    });
    if (isEmpty(val)) {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { locizeProjectId: true }
      });
    } else {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { locizeProjectId: null }
      });
    }
  };

  const handleLocizeProjectKeyChange = (e) => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_TRANSLATION,
      updatedConfig: { locizeProjectKey: val }
    });
    if (isEmpty(val)) {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { locizeProjectKey: true }
      });
    } else {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { locizeProjectKey: null }
      });
    }
  };

  const handleTranslationJsonChange = (e) => {
    const val = e.target.value;
    updateState({
      type: CONFIG_TYPE_TRANSLATION,
      updatedConfig: { translationApiJson: val }
    });
    try {
      JSON.parse(val);
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { translationApiJson: null }
      });
    } catch (err) {
      updateState({
        type: CONFIG_TYPE_ERRORFIELDS,
        updatedConfig: { translationApiJson: true }
      });
    }
  }

  const handleI18nLocaleChange = (e) => updateState({
    type: CONFIG_TYPE_TRANSLATION,
    updatedConfig: { i18nLocale: e.target.value }
  });
  const handleI18nLocaleIntouchChange = (e) => updateState({
    type: CONFIG_TYPE_TRANSLATION,
    updatedConfig: { i18nLocaleIntouch: e.target.value }
  });

  const handleValidateCustomI18nJson = () => {
    const config = JSON.parse(translationApiJson);
    delete config.locale;
    validateI18nApiConfigAction({ api: config, locale: i18nLocaleIntouch, type: I18N_TYPES_CUSTOM, formatMessage });
  };

  const handleValidateLocizeConfig = () => {
    const config = {
      locizeConfig: {
        projectId: locizeProjectId,
        projectKey: locizeProjectKey,
        projectName: locizeProjectName,
      },
      locale: i18nLocaleIntouch,
    };
    validateI18nApiConfigAction({ ...config, type: I18N_TYPES_INTOUCH, formatMessage });
  };

  return (
    <CapRow className="accordian-content">
      <CapRow className="application-detail-row">
        <CapHeading type="h3">
          {formatMessage(messages.appEnableTranslation)}
        </CapHeading>
        <CapRadioGroup
          className="radio-group-app-enable-translation"
          onChange={handleEnableTranslationChange}
          value={enableTranslation}
        >
          <CapRadio value={true}>
            {formatMessage(messages.yes)}
          </CapRadio>
          <CapRadio value={false}>
            {formatMessage(messages.no)}
          </CapRadio>
        </CapRadioGroup>
      </CapRow>
      {enableTranslation &&
        <>
          <CapRow className="application-detail-row">
            <CapHeading type="h3">
              {formatMessage(messages.appTranslationType)}
            </CapHeading>
            <CapRadioGroup
              className="radio-group-app-translation-type"
              onChange={handleAppTranslationTypeChange}
              value={appType === APP_TYPE_EXTERNAL ? I18N_TYPES_CUSTOM : appTranslationType}
            >
              <CapRadio
                value={I18N_TYPES_INTOUCH}
                disabled={appType === APP_TYPE_EXTERNAL}
                suffix={
                  <CapTooltipWithInfo
                    title={formatMessage(messages.onlyUsedWithInTouchApps)}
                    className="app-type-info"
                  />
                }
              >
                {formatMessage(messages.intouchTranslationType)}
              </CapRadio>
              <CapRadio value={I18N_TYPES_CUSTOM}>
                {formatMessage(messages.customTranslationType)}
              </CapRadio>
            </CapRadioGroup>
          </CapRow>
          {appTranslationType === I18N_TYPES_INTOUCH && (
            <>
              <CreateEditAppInputRow
                value={locizeProjectName}
                changeHandler={handleLocizeProjectNameChange}
                placeholder={formatMessage(messages.locizeProjectNamePlaceholder)}
                label={formatMessage(messages.locizeProjectName)}
                errorMessage={errorFields.locizeProjectName && formatMessage(messages.invalidLocizeProjectName)}
              />
              <CreateEditAppInputRow
                value={locizeProjectId}
                changeHandler={handleLocizeProjectIdChange}
                placeholder={formatMessage(messages.locizeProjectIdPlaceholder)}
                label={formatMessage(messages.locizeProjectId)}
                errorMessage={errorFields.locizeProjectId && formatMessage(messages.invalidLocizeProjectId)}
              />
              <CreateEditAppInputRow
                value={locizeProjectKey}
                changeHandler={handleLocizeProjectKeyChange}
                placeholder={formatMessage(messages.locizeProjectKeyPlaceholder)}
                label={formatMessage(messages.locizeProjectKey)}
                errorMessage={errorFields.locizeProjectKey && formatMessage(messages.invalidLocizeProjectKey)}
              />
              <CreateEditAppInputRowWithValidate
                value={i18nLocaleIntouch}
                changeHandler={handleI18nLocaleIntouchChange}
                placeholder={formatMessage(messages.locizeApiLocalePlaceholder)}
                label={formatMessage(messages.locizeApiLocale)}
                errorMessage={validateI18nApiConfigError || ''}
                validateStatus={validateI18nApiConfigStatus}
                validValue={i18nIntouchConfigValid}
                btnType="secondary"
                btnDisabled={isEmpty(locizeProjectName) || isEmpty(locizeProjectId) || isEmpty(locizeProjectKey)}
                btnOnClick={handleValidateLocizeConfig}
                btnClassName="validate-app-name-btn"
                btnLabel={formatMessage(messages.test)}
                editMode={false}
              />
            </>
          )}
          {appTranslationType === I18N_TYPES_CUSTOM &&
            <>
              <CreateEditAppInputRow
                value={translationApiJson}
                changeHandler={handleTranslationJsonChange}
                placeholder={formatMessage(messages.translationApiJsonPlaceholder)}
                label={formatMessage(messages.translationApiJson)}
                isTextArea
              />
              <CreateEditAppInputRowWithValidate
                value={i18nLocale}
                changeHandler={handleI18nLocaleChange}
                placeholder={formatMessage(messages.locizeApiLocalePlaceholder)}
                label={
                  <>
                    {formatMessage(messages.locizeApiLocale)}
                    <CapTooltipWithInfo
                      title={formatMessage(messages.locizeApiLocaleInfoText)}
                      className="i18n-locale-info"
                    />
                  </>
                }
                errorMessage={
                  validateI18nApiConfigStatus === FAILURE ?
                    validateI18nApiConfigError :
                    (errorFields.translationApiJson ?
                      formatMessage(messages.invalidTranslationApiJson) : '')}
                validateStatus={validateI18nApiConfigStatus}
                validValue={i18nIntouchConfigValid}
                btnType="secondary"
                btnDisabled={!i18nLocale}
                btnOnClick={handleValidateCustomI18nJson}
                btnClassName="validate-app-name-btn"
                btnLabel={formatMessage(messages.test)}
                editMode={false}
              />
            </>
          }
        </>
      }
    </CapRow>
  );
}

CreateApplicationI18nDetails.propTypes = {
  intl: intlShape.isRequired,
  appType: PropTypes.string,
  errorFields: PropTypes.object,
  validateI18nApiConfigStatus: PropTypes.string,
  validateI18nApiConfigError: PropTypes.string,
  translationConfig: PropTypes.object,
  updateState: PropTypes.func,
  i18nApiConfigValid: PropTypes.bool,
};

CreateApplicationI18nDetails.defaultProps = {
  intl: {},
  appType: '',
  errorFields: {},
  validateI18nApiConfigStatus: '',
  validateI18nApiConfigError: null,
  translationConfig: {},
  updateState: () => { },
  i18nApiConfigValid: false,
};

export default injectIntl(CreateApplicationI18nDetails);
