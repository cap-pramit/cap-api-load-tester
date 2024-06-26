import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Auth } from '@capillarytech/cap-ui-utils';
import { injectSaga, injectReducer } from '@capillarytech/vulcan-react-sdk/utils';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';

import { Translations } from '@capillarytech/vulcan-react-sdk/components';
const { useTranslations } = Translations;

import { withRouter } from 'react-router';
import { matchPath } from 'react-router-dom';

import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
import CapSomethingWentWrong from '@capillarytech/cap-ui-library/CapSomethingWentWrong';
import multipleOrgSwitch from '@capillarytech/cap-ui-utils/utils/multipleOrgSwitch';

import sagas from './saga';
import reducer from './reducer';
import * as actions from './actions';
import * as loginActions from '../Login/actions';
import * as style from './style';

import NavigationBar from '../../organisms/NavigationBar';
import OrgChange from '../../organisms/OrgChange';

import * as path from '../../../config/path';
import * as constants from './constants';
import * as appConstants from '../App/constants';
import * as selectors from './selectors';
import messages from './messages';
import { prefix as prefixPath } from '../../../../app-config';

const { REQUEST, SUCCESS, FAILURE } = appConstants;
const { publicPath } = path;
const { spinnerStyle } = style;
const {
  makeSelectOrg,
  makeSelectCap,
  makeSelectSidebarMenuData,
  makeSelectTopbarMenuData,
  makeSelectIsoLangToLocizeLangMapping
} = selectors;
const {
  HELP_URL,
  ORG_SETTINGS_URL,
  LOYALTY_SETTINGS_URL,
  LOYALTY_NOTIFICATION_URL,
  SIDEBAR_MENU_ITEM_POSITION,
  MODULE_NAME_URL,
} = constants;

const { isMultipleTabsOpen } = multipleOrgSwitch;

const StyledCapSpin = withStyles(CapSpin, spinnerStyle);
const gtm = window.dataLayer || [];

export const Cap = ({
  topbarMenuData = [],
  sidebarMenuData,
  history,
  actions,
  loginActions,
  match,
  userData,
  orgData,
  isoLangToLocizeLangMapping,
  intl: { formatMessage },
}) => {
  const { pathname } = location;
  const { orgID, fetchingUserdata } = orgData;
  const { user } = userData;
  const { refID } = user;
  const matchedPath = matchPath(pathname, {
    path: `${match.path}${MODULE_NAME_URL}`,
  });

  // need to handle for modules
  // const { params: { moduleName } = {} } = matchedPath || {};
  const onSettingsPage = matchedPath ? true : false;

  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const { locale, changeLocale } = useTranslations();

  useEffect(() => {
    const {
      user: { accessiblePermissions = [], accessRoles = {} } = {},
      currentOrgDetails: { accessibleFeatures = [] } = {}
    } = userData; 
    Auth.initialize({
      permissions: accessiblePermissions,
      accessibleFeatures: accessibleFeatures,
      roles: Object.keys(accessRoles),
    });
  }, [userData]);

  useEffect(
    () => {
      const getUserGtmData = userData => {
        const userName = userData?.attributes?.USERNAME;
        const userEmail = userData?.attributes?.EMAIL;
        const orgObj = userData?.proxyOrgList?.find(org => org.orgID === orgID);
        const gtmData = {
          orgID,
          orgName: orgObj?.orgName,
          userId: userData?.refID,
          userName: userName?.value,
          userEmail: userEmail?.value,
          isCapUser: userData?.isCapUser,
        };
        return gtmData;
      };
      if (refID !== undefined) {
        const userGtmData = getUserGtmData(user);
        gtm.push(userGtmData);
      }
      if (orgID !== undefined) {
        gtm.push({ orgID });
      }
    },
    [refID, orgID],
  );

  useEffect(
    () => {
      actions.getTopbarMenuData();
      actions.getSupportedLocales();
      if (!fetchingUserdata) {
        actions.getUserData();
        actions.getOrgUsersData();
      }
      return () => {
        actions.clearTopbarMenuData();
      };
    },
    [actions],
  );

  //Use changeLocale exposed by useTranslations to change the locale if user's lang is different than the default specified one.
  useEffect(() => {
    const userIsoLang = userData?.user?.iso_lang;
    const locizeLang = isoLangToLocizeLangMapping.get(userIsoLang);

    if (userIsoLang && isoLangToLocizeLangMapping.size > 0 && locizeLang !== locale) {
      changeLocale(locizeLang);
    }
  }, [userData?.user?.iso_lang, isoLangToLocizeLangMapping.size]);



  const changeOrg = orgId => {
    if (isMultipleTabsOpen()) {
      setSelectedOrgId(orgId);
    } else {
      changeOrgAction(orgId);
    }
  };

  const changeOrgAction = orgId => {
    actions.changeOrg(orgId, navigateToDashboard);
  };

  const navigateToDashboard = () => {
    const origin = window.location.origin;
    window.location.href = `${origin}${prefixPath}`;
  };

  const logout = () => {
    loginActions.logout();
  };

  const onSecNavActionsClick = event => {
    if (event.key === 'close-icon') {
      window.location.pathname = publicPath;
    }
  };

  const onClickReload = () => {
    window.location.reload();
  };

  return (
    <StyledCapSpin
      className="cap-container spinner"
      spinning={fetchingUserdata === REQUEST}
    >
      {fetchingUserdata === SUCCESS && (
        <NavigationBar
          userData={userData}
          topbarMenuData={topbarMenuData}
          showSecondaryTopBar={onSettingsPage}
          sidebarMenuItemsPosition={SIDEBAR_MENU_ITEM_POSITION}
          settingsUrl={LOYALTY_SETTINGS_URL}
          notificationUrl={LOYALTY_NOTIFICATION_URL}
          orgSettingsUrl={ORG_SETTINGS_URL}
          helpUrl={HELP_URL}
          changeOrg={changeOrg}
          history={history}
          sidebarMenuData={sidebarMenuData}
          logout={logout}
          pathname={pathname}
          secondaryTopBarActionHandler={onSecNavActionsClick}
        />
      )}
      {fetchingUserdata === FAILURE && (
        <CapSomethingWentWrong
          title={formatMessage(messages.somethingWentWrongTitle)}
          description={formatMessage(messages.somethingWentWrongDesc)}
          reloadText={formatMessage(messages.tryRefreshing)}
          onClickReload={onClickReload}
        />
      )}
      <OrgChange
        userData={userData}
        selectedOrgId={selectedOrgId}
        changeOrgAction={changeOrgAction}
        navigateToDashboard={navigateToDashboard}
      />
    </StyledCapSpin>
  );
};

Cap.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  orgData: PropTypes.object,
  userData: PropTypes.object,
  topbarMenuData: PropTypes.array,
  sidebarMenuData: PropTypes.array,
  actions: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

Cap.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  orgData: makeSelectOrg(),
  userData: makeSelectCap(),
  sidebarMenuData: makeSelectSidebarMenuData(),
  topbarMenuData: makeSelectTopbarMenuData(),
  isoLangToLocizeLangMapping: makeSelectIsoLangToLocizeLangMapping(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  loginActions: bindActionCreators(loginActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = sagas.map((saga, index) =>
  injectSaga({ key: `cap-${index}`, saga }),
);

const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_cap`, reducer });

export default compose.apply(null, [...withSaga, withReducer, withConnect])(
  withRouter(injectIntl(Cap)),
);
