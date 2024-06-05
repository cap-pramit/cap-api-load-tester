import React from 'react';
import messages from './messages';
import {
  CapHeading,
  CapRow,
  CapColumn,
  CapIcon,
  CapTooltip,
  CapTooltipWithInfo,
} from '@capillarytech/cap-ui-library';
import moment from 'moment';
import timeFormatMinSeconds from '../../../utils/timeFormatMinSeconds';

import TickOrBlankWithTooltip from '../../atoms/TickOrBlankWithTooltip';
import DeploymentColumnActions from '../../molecules/DeploymentColumnActions';

import { DEPLOYMENT_COMPLETED_STATUS, DEPLOYMENT_IN_PROGRESS_STATUS } from '../../molecules/DeploymentColumnActions/constants';
import { DATE_TIME_FORMAT } from '../../pages/App/constants';
/**
 * Returns an array of columns for a listing page.
 *
 * @param {Object} options - The options for generating the columns.
 * @param {Function} options.formatMessage - The function for formatting messages.
 * @param {Object} options.history - The history object for navigation.
 * @returns {Array} An array of column objects as acceptable by antd Table.
 */
export default function getColumns({
  formatMessage,
  history,
  orgUsersMap,
  actions,
  applicationId,
}) {
  return [
    {
      title: (
        <CapHeading type="h5">{formatMessage(messages.version)}</CapHeading>
      ),
      dataIndex: 'versions',
      key: 'versions',
      width: '10%',
      render: (text, record) => (
        <CapRow type="flex" align="middle">
          <div className="deployment-version-text">{record?.version}</div>
          <CapTooltipWithInfo title={record?.description} />
        </CapRow>
      ),
    },
    {
      title: (
        <CapHeading type="h5">{formatMessage(messages.status)}</CapHeading>
      ),
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text, record) => (
        <>
          <CapRow type="flex" align="middle" gutter={4}>
            <CapColumn>
              {formatMessage(
                messages[(record?.state?.status)] || messages.statusUnknown,
              )}
            </CapColumn>
            <CapColumn>
              <CapTooltip title={record?.state?.error}>
                {!record?.state?.success && (
                  <CapIcon
                    className={
                      record?.state?.status === 'in_progress'
                        ? 'rotate-continuous'
                        : 'rotate-full'
                    }
                    type={
                      record?.state?.status === 'in_progress'
                        ? 'refreshCircle'
                        : 'alert-warning'
                    }
                    size={record?.state?.status === 'in_progress' ? 's' : 'm'}
                  />
                )}
              </CapTooltip>
            </CapColumn>
          </CapRow>
        </>
      ),
    },
    {
      title: (
        <CapHeading type="h5">
          {formatMessage(messages.promotionStatus)}
        </CapHeading>
      ),
      dataIndex: 'promotionStatus',
      key: 'promotionStatus',
      width: '8%',
      align: 'center',
      render: (text, record) => (
        <>
          <TickOrBlankWithTooltip
            showTick={record?.isPromoted}
            tickSize="m"
            tooltipTitle={formatMessage(messages.promotedOnBy, {
              date: moment(record?.auditInfo?.promotedAt).format(
                DATE_TIME_FORMAT,
              ),
              user: orgUsersMap.get(Number(record?.auditInfo?.promotedBy)),
            })}
          />
        </>
      ),
    },
    {
      title: (
        <CapHeading type="h5">{formatMessage(messages.uatEnabled)}</CapHeading>
      ),
      dataIndex: 'uatStatus',
      key: 'uatStatus',
      width: '8%',
      render: (text, record) => {
        const {
          uatActive,
          deploymentState: { uat: { status } = {} } = {},
          auditInfo: { uatEnabledAt, uatEnabledBy } = {},
        } = record || {};
        return (
          <>
            <TickOrBlankWithTooltip
              showTick={uatActive && status === DEPLOYMENT_COMPLETED_STATUS}
              showProgress={status === DEPLOYMENT_IN_PROGRESS_STATUS}
              tickSize="m"
              tooltipTitle={formatMessage(messages.uatEnabledOnBy, {
                date: moment(uatEnabledAt).format(
                  DATE_TIME_FORMAT,
                ),
                user: orgUsersMap.get(Number(uatEnabledBy)),
              })}
            />
          </>
        );
      },
      align: 'center',
    },
    {
      title: (
        <CapHeading type="h5">{formatMessage(messages.prodEnabled)}</CapHeading>
      ),
      dataIndex: 'prodStatus',
      key: 'prodStatus',
      width: '8%',
      align: 'center',
      render: (text, record) => {
        const {
          prodActive,
          deploymentState: { prod: { status } = {} } = {},
          auditInfo: { prodEnabledAt, prodEnabledBy } = {},
        } = record || {};
        return (
          <>
            <TickOrBlankWithTooltip
              showTick={prodActive && status === DEPLOYMENT_COMPLETED_STATUS}
              showProgress={status === DEPLOYMENT_IN_PROGRESS_STATUS}
              tickSize="m"
              tooltipTitle={formatMessage(messages.prodEnabledOnBy, {
                date: moment(prodEnabledAt).format(
                  DATE_TIME_FORMAT,
                ),
                user: orgUsersMap.get(Number(prodEnabledBy)),
              })}
            />
          </>
        );
      },
    },
    {
      title: (
        <CapHeading type="h5">
          {formatMessage(messages.uploadDuration)}
        </CapHeading>
      ),
      dataIndex: 'uploadDuration',
      key: 'uploadDuration',
      width: '16%',
      align: 'center',
      render: (text, record) => (
        <>
          {record?.stats?.totalDuration != null &&
            record?.stats?.totalDuration > -1 ? (
            <CapTooltip
              title={formatMessage(messages.uploadStartedAtCompletedAt, {
                startTime: moment(record?.stats?.startTime).format(
                  DATE_TIME_FORMAT,
                ),
                endTime: moment(record?.stats?.endTime).format(
                  DATE_TIME_FORMAT,
                ),
              })}
            >
              <div>{timeFormatMinSeconds(record?.stats?.totalDuration)}</div>
            </CapTooltip>
          ) : (
            <CapTooltip title={formatMessage(messages.uploadStatsNotAvailable)}>
              <CapIcon type="minus" size="s" />
            </CapTooltip>
          )}
        </>
      ),
    },
    {
      title: (
        <CapHeading type="h5">{formatMessage(messages.actions)}</CapHeading>
      ),
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <DeploymentColumnActions
          text={text}
          record={record}
          history={history}
          formatMessage={formatMessage}
          actions={actions}
          applicationId={applicationId}
        />
      ),
    },
  ];
}
