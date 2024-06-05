import { apiCaller } from '@capillarytech/vulcan-react-sdk/utils';
import { removeAuthenticationDetais } from '../utils/authWrapper';
import endpoints from '../config/endpoints';
import * as requestConstructor from './requestConstructor';

const { getAPICallObject } = requestConstructor;

function redirectIfUnauthenticated(response) {
  const isUnauthorized = response.status === 401;
  const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
  const isAuthUserCall =
    response.url.split('auth')[1] &&
    response.url.split('auth')[1].split('?')[0] === '/user';
  if (isUnauthorized) {
    // if (isProd) {
    //   const originUrl = window.location.origin;
    //   removeAuthenticationDetais();
    //   //TODO: to revisit this.
    //   // window.location = `${originUrl}${config.production.logout_url}`;
    // } else {
    if (isLoginPage && isAuthUserCall) return;
    removeAuthenticationDetais();
    // }
  }
}

const httpRequest = apiCaller.initializeApiCaller({
  redirectIfUnauthenticated,
});

export const getLocizeMessage = async locale => {
  const appNameList = ["vulcan_ui"];
  const response = await Promise.all(
    appNameList.map(appName => {
      const url = `${endpoints.arya_endpoint}/translations/${appName}/${locale}`;
      return httpRequest(url, getAPICallObject('GET'));
    }),
  );
  let data = {};
  response.forEach(item => {
    data = {
      ...data,
      ...item,
    };
  });
  return data;
};


export const getSupportedLocales = () => {
  const url = `${endpoints.arya_endpoint}/translations/supportedLocales`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const logout = () => {
  const url = `${endpoints.arya_endpoint}/auth/logout`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const changeProxyOrg = orgId => {
  const url = `${endpoints.arya_endpoint}/auth/setProxy/${orgId}`;
  return httpRequest(url, getAPICallObject('Post'));
};

export const getUserData = () => {
  const url = `${endpoints.arya_endpoint}/auth/user`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const getOrgUsersData = () => {
  const url = `${endpoints.arya_endpoint}/auth/org/users`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const getListingData = filtersObj => {
  const { limit = 10, offset = 0, name } = filtersObj || {};

  let url = `${endpoints.vulcan_endpoint}/list?limit=${limit}&offset=${offset}`;

  if (name && name.trim()) {
    url += `&name=${name.trim()}`;
  }

  return httpRequest(url, getAPICallObject('GET'));
};

export const getDeploymentsList = applicationId => {
  const url = `${endpoints.vulcan_endpoint}/${applicationId}/deployments?sortBy=version&sortOrder=desc`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const enableDisableUatOrProd = ({
  applicationId,
  deploymentId,
  environment,
  action,
}) => {
  const url = `${endpoints.vulcan_endpoint}/${applicationId}/deployments/${deploymentId}/${environment}`;
  return httpRequest(url, getAPICallObject('POST', { action }));
};

export const promoteOrDemoteBuild = ({ deploymentId, isPromoted }) => {
  const url = `${endpoints.vulcan_endpoint}/deployments/${deploymentId}`;
  return httpRequest(url, getAPICallObject('PUT', { isPromoted }));
};

export const deleteBuild = ({ deploymentId }) => {
  const url = `${endpoints.vulcan_endpoint}/deployments/${deploymentId}`;
  return httpRequest(url, getAPICallObject('PUT', { isActive: false }));
};

export const uploadBuild = ({ file, description, applicationId }) => {
  const data = new FormData();
  data.append('file', file);
  data.append('description', description);
  const url = `${endpoints.vulcan_endpoint}/${applicationId}/deployments`;
  return httpRequest(url, getAPICallObject('POST', data, true));
};

export const getDeploymentByDeploymentId = deploymentId => {
  const url = `${endpoints.vulcan_endpoint}/deployments/${deploymentId}`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const validateAppName = appName => {
  const url = `${endpoints.vulcan_endpoint}/app-id?name=${appName}`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const validatePrefixPath = prefixPath => {
  const url = `${endpoints.vulcan_endpoint}/prefix/validate?prefix=${prefixPath}`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const validateI18nApiConfig = config => {
  const url = `${endpoints.vulcan_endpoint}/i18n-config/validate`;
  return httpRequest(url, getAPICallObject('POST', config));
};

export const createOrUpdateApplication = ({ payload, appId }) => {
  const url = `${endpoints.vulcan_endpoint}/${appId || 'application'}`;
  return httpRequest(url, getAPICallObject(appId ? 'PUT' : 'POST', payload));
};

export const getApplicationDetails = appId => {
  const url = `${endpoints.vulcan_endpoint}/${appId}`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const checkGlobalAppsAllowed = () => {
  const url = `${endpoints.vulcan_endpoint}/cluster-config`;
  return httpRequest(url, getAPICallObject('GET'));
};
