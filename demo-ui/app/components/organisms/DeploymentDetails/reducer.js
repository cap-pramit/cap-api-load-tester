/*
 * DeploymentDetails reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes, UPLOADED_BUILD_MAX_POLL_COUNT } from './constants';
import * as constants from '../../pages/App/constants';
import { DEPLOYMENT_COMPLETED_STATUS } from '../../molecules/DeploymentColumnActions/constants';

const { REQUEST, SUCCESS, FAILURE, INITIAL } = constants;

export const initialState = fromJS({
  deploymentsList: [],
  fetchingDeploymentsData: INITIAL,
  initiateDeleteBuildForId: null,
  initiateDeleteBuildForVersion: null,
  openUploadSlideBox: false,
  uploadedBuildDeploymentId: null,
  uploadedBuildRemainingPollFrequency: 0,
  uploadBuildStatus: null,
  enableUatProdDeploymentId: null,
  enableUatRemainingPollFrequency: 0,
  enableUatProdStatus: null,
  enableDeploymentEnvironment: null,
  successMsg: '',
});

const deploymentDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEFAULT_ACTION:
      return state;

    case actionTypes.CLEAR_DATA:
      return initialState;

    case actionTypes.GET_DEPLOYMENT_LISTING_DATA_REQUEST:
      return state.set('fetchingDeploymentsData', REQUEST);

    case actionTypes.GET_DEPLOYMENT_LISTING_DATA_SUCCESS: {
      const { data = [] } = action;
      const newData = data.map(item => ({ ...item, key: item._id }));

      return state
        .set('fetchingDeploymentsData', SUCCESS)
        .set('deploymentsList', fromJS(newData));
    }

    case actionTypes.GET_DEPLOYMENT_LISTING_DATA_FAILURE:
      return state
        .set('fetchingDeploymentsData', FAILURE)
        .set('deploymentsList', fromJS([]));

    case actionTypes.DELETE_BUILD_SUCCESS: {
      const deploymentIdToDelete = action.deploymentId;
      const updatedDeploymentsListAfterDelete = state
        .get('deploymentsList')
        .filter(deployment => deployment.get('_id') !== deploymentIdToDelete);
      return state
        .set('deploymentsList', updatedDeploymentsListAfterDelete)
        .set('initiateDeleteBuildForId', null)
        .set('initiateDeleteBuildForVersion', null);
    }

    case actionTypes.PROMOTE_DEMOTE_BUILD_SUCCESS: {
      const deploymentIdToPromoteDemote = action.deploymentId;
      const updatedDeploymentsListAfterPromoteDemote = state
        .get('deploymentsList')
        .map(deployment => {
          if (deployment.get('_id') === deploymentIdToPromoteDemote) {
            return deployment.set('isPromoted', action?.isPromoted);
          }
          return deployment;
        });
      return state.set(
        'deploymentsList',
        updatedDeploymentsListAfterPromoteDemote,
      );
    }

    case actionTypes.INITIATE_DELETE_BUILD_REQUEST:
      return state
        .set('initiateDeleteBuildForId', action.deploymentId)
        .set('initiateDeleteBuildForVersion', action.version);

    case actionTypes.INITIATE_DELETE_BUILD_FAILURE:
      return state
        .set('initiateDeleteBuildForId', null)
        .set('initiateDeleteBuildForVersion', null);

    case actionTypes.OPEN_UPLOAD_SLIDE_BOX:
      return state.set('openUploadSlideBox', true);

    case actionTypes.CLOSE_UPLOAD_SLIDE_BOX:
      return state.set(
        'openUploadSlideBox',
        state?.get('uploadBuildStatus') === REQUEST ? true : false,
      );

    case actionTypes.UPLOAD_BUILD_REQUEST:
      return state
        .set('uploadedBuildDeploymentId', null)
        .set(
          'uploadedBuildRemainingPollFrequency',
          UPLOADED_BUILD_MAX_POLL_COUNT,
        )
        .set('uploadBuildStatus', REQUEST);

    case actionTypes.UPLOAD_BUILD_SUCCESS:
      return state
        .set('uploadedBuildDeploymentId', action.deploymentId)
        .set('uploadBuildStatus', SUCCESS)
        .set('openUploadSlideBox', false);

    case actionTypes.UPLOAD_BUILD_FAILURE:
      return state
        .set('uploadedBuildDeploymentId', null)
        .set('uploadBuildStatus', FAILURE)
        .set('openUploadSlideBox', false);

    case actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_REQUEST:
      return state
        .set('enableUatProdDeploymentId', null)
        .set('enableUatRemainingPollFrequency',
          action?.resetPollCount ? UPLOADED_BUILD_MAX_POLL_COUNT : state?.get('enableUatRemainingPollFrequency')
        )
        .set('enableUatProdStatus', REQUEST)
        .set('enableDeploymentEnvironment', null);
    case actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_SUCCESS: {
      const { data: { deploymentState = {}} = {}, environment, successMsg} = action;
      const deploymentIdToRefresh = action.deploymentId;
      const isBuildCompletedInCurrentPoll =
        deploymentState?.[environment]?.status === DEPLOYMENT_COMPLETED_STATUS;
      const leftPollCount = isBuildCompletedInCurrentPoll
        ? 0
        : state?.get('enableUatRemainingPollFrequency') - 1;

      const updatedDeploymentListAfterRefresh = state
        .get('deploymentsList')
        .map(deployment => {
          if (deployment.get('_id') === deploymentIdToRefresh) {
            return fromJS(action.data);
          }
          return deployment;
        });
      return state
        .set('deploymentsList', updatedDeploymentListAfterRefresh)
        .set('enableUatRemainingPollFrequency', leftPollCount)
        .set(
          'enableUatProdDeploymentId',
          isBuildCompletedInCurrentPoll
            ? null
            : deploymentIdToRefresh,
        )
        .set('enableDeploymentEnvironment', action?.environment)
        .set('successMsg', successMsg)
        .set('enableUatProdStatus', SUCCESS);
    }
    case actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_FAILURE:
      return state
        .set('enableUatProdDeploymentId', null)
        .set('enableUatProdStatus', FAILURE)
        .set('enableDeploymentEnvironment', null);
    case actionTypes.GET_DEPLOYMENT_BY_DEPLOYMENT_ID_SUCCESS: {
      const deploymentIdToRefresh = action.deploymentId;
      const isBuildCompletedInCurrentPoll =
        action?.data?.state?.status === DEPLOYMENT_COMPLETED_STATUS;

      const leftPollCount = isBuildCompletedInCurrentPoll
        ? 0
        : state?.get('uploadedBuildRemainingPollFrequency') - 1;

      const updatedDeploymentListAfterRefresh = state
        .get('deploymentsList')
        .map(deployment => {
          if (deployment.get('_id') === deploymentIdToRefresh) {
            return fromJS(action.data);
          }
          return deployment;
        });

      return state
        .set('deploymentsList', updatedDeploymentListAfterRefresh)
        .set('uploadedBuildRemainingPollFrequency', leftPollCount)
        .set(
          'uploadedBuildDeploymentId',
          isBuildCompletedInCurrentPoll
            ? null
            : state?.get('uploadedBuildDeploymentId'),
        );
    }

    default:
      return state;
  }
};

export default deploymentDetailsReducer;
