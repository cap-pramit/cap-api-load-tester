import React from 'react';
import isEmpty from 'lodash/isEmpty';
import messages from './messages';
import { CapHeading, CapRow, CapColumn } from '@capillarytech/cap-ui-library';

import ListingColumnAppName from '../../atoms/ListingColumnAppName';
import ColoredTags from '../../atoms/ColoredTags';
import OpenLink from '../../atoms/OpenLink';
import ListingColumnActivity from '../../atoms/ListingColumnActivity';
import TickOrBlankWithTooltip from '../../atoms/TickOrBlankWithTooltip';
import ListingColumnActions from '../../atoms/ListingColumnActions';

/**
 * Returns an array of columns for a listing page.
 *
 * @param {Object} options - The options for generating the columns.
 * @param {Function} options.formatMessage - The function for formatting messages.
 * @param {Object} options.history - The history object for navigation.
 * @returns {Array} An array of column objects as acceptable by antd Table.
 */
export default function getColumns({ formatMessage, history }) {
  return [
    {
      title: (
        <CapHeading type="h5">
          {formatMessage(messages.applicationNameColumn)}
        </CapHeading>
      ),
      dataIndex: 'applicationNameColumn',
      key: 'applicationNameColumn',
      width: '19%',
      render: (text, record) => (
        <ListingColumnAppName
          text={text}
          record={record}
          formatMessage={formatMessage}
        />
      ),
    },
    {
      title: (
        <CapHeading type="h5">{formatMessage(messages.typeTagsColumn)}</CapHeading>
      ),
      dataIndex: 'typeColumn',
      key: 'typeColumn',
      width: '7%',
      render: (text, record) => <ColoredTags tagValue={record?.type} />,
    },
    {
      title: (
        <CapHeading type="h5">{formatMessage(messages.languageTagsColumn)}</CapHeading>
      ),
      dataIndex: 'languageColumn',
      key: 'languageColumn',
      width: '10%',
      render: (text, record) => <ColoredTags tagValue={record?.language} />,
    },
    {
      title: (
        <CapHeading type="h5">
          {formatMessage(messages.repositoryColumn)}
        </CapHeading>
      ),
      dataIndex: 'linksColumn',
      key: 'linksColumn',
      width: '7.5%',
      render: (text, record) => (
        <OpenLink
          link={record?.readmeLink}
          type="flex"
          align="middle"
          justify="center"
        />
      ),
      align: 'center',
    },
    {
      title: (
        <CapHeading type="h5">
          {formatMessage(messages.prefixColumn)}
        </CapHeading>
      ),
      dataIndex: 'listingColumnPrefix',
      key: 'listingColumnPrefix',
      render: (text, record) => (
        <CapRow className="overflow-wrap">
          <CapColumn>{record.prefixPath}</CapColumn>
        </CapRow>
      ),
      width: '20%',
      align: 'center',
    },
    {
      title: (
        <CapHeading>{formatMessage(messages.customDomainColumn)}</CapHeading>
      ),
      dataIndex: 'customDomainColumn',
      key: 'customDomainColumn',
      render: (text, record) => (
        <TickOrBlankWithTooltip showTick={record?.customDomain} />
      ),
      align: 'center',
    },
    {
      title: <CapHeading>{formatMessage(messages.multiOrgAccess)}</CapHeading>,
      dataIndex: 'multiOrgAccess',
      key: 'multiOrgAccess',
      render: (text, record) => (
        <TickOrBlankWithTooltip
          showTick={!isEmpty(record?.accessibleOrgs)}
          tooltipTitle={formatMessage(messages.multiOrgTooltip, {
            count: record?.accessibleOrgs?.length,
          })}
        />
      ),
      width: '5%',
      align: 'center',
    },
    // {
    //   title: <CapHeading>{formatMessage(messages.activityColumn)}</CapHeading>,
    //   dataIndex: 'activityColumn',
    //   key: 'activityColumn',
    //   render: (text, record) => (
    //     <ListingColumnActivity
    //       text={text}
    //       record={record}
    //       formatMessage={formatMessage}
    //     />
    //   ),
    //   align: 'center',
    // },
    {
      title: <CapHeading>{formatMessage(messages.lastUpdateColumn)}</CapHeading>,
      dataIndex: 'activityColumn',
      key: 'activityColumn',
      render: (text, record) => (
        <ListingColumnActivity
          text={text}
          record={record}
          formatMessage={formatMessage}
        />
      ),
      width: '13%',
      align: 'center',
    },
    {
      title: <CapHeading>{formatMessage(messages.actionsColumn)}</CapHeading>,
      dataIndex: 'actionsColumn',
      key: 'addreactionsColumnss',
      align: 'center',
      render: (text, record) => (
        <ListingColumnActions
          text={text}
          record={record}
          history={history}
          formatMessage={formatMessage}
        />
      ),
    },
  ];
}
