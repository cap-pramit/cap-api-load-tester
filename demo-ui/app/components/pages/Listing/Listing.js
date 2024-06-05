import React from 'react';

import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import {
  injectSaga,
  injectReducer,
  clearDataOnUnmount,
} from '@capillarytech/vulcan-react-sdk/utils';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import PageTemplate from '../../templates/PageTemplate';
import * as actions from './actions';
import saga from './saga';
import reducer from './reducer';
import messages from './messages';
import { makeSelectListing } from './selectors';
import {
  CapRow,
  CapColumn,
  CapInput,
  CapButton,
  CapTable,
  CapHeading,
} from '@capillarytech/cap-ui-library';
import * as constants from '../App/constants';
import { TABLE_SCROLL_CONFIG, SEARCH_DEBOUNCE_TIME_MS } from './constants';
import './styles.scss';
const { REQUEST, SUCCESS, VULCAN_EDIT_APPLICATION } = constants;

import getColumns from './columns';
import EmptyStateIllustration from '../../atoms/EmptyStateIllustration';
import RbacTooltipWrapper from '../../atoms/RbacTooltipWrapper';
import { Auth } from '@capillarytech/cap-ui-utils';

const CapSearch = CapInput.Search;

export const Listing = props => {
  const { intl, actions, listingState, history } = props;
  const { formatMessage } = intl;
  const {
    listingData,
    endOfList,
    fetchingListingData,
    limit,
    offset,
  } = listingState;

  const [searchInput, setSearchInput] = React.useState('');

  const handleSearch = React.useCallback(
    debounce(searchText => {
      setSearchInput(searchText);
      //NOTE: This is a workaround to reset the scroll position of the table when a new search is performed.
      //Ideally ref should be used, but there is no way to target ant-table-body directly. Only listings-table can be targeted.
      const listingsTable = document.querySelector(
        '#listings-table div.ant-table-body',
      );
      if (listingsTable) {
        listingsTable.scrollTop = 0;
      }
      actions.getListingData({
        limit,
        offset: 0,
        name: searchText,
      });
    }, SEARCH_DEBOUNCE_TIME_MS),
    [actions, limit],
  );

  React.useEffect(() => {
    actions.getListingData();
    return () => {
      handleSearch.cancel();
    };
  }, []);

  const setPaginationCb = React.useCallback(
    () => {
      if (!endOfList && fetchingListingData !== REQUEST) {
        actions.getListingData({
          limit,
          offset,
          name: searchInput,
        });
      }
    },
    [endOfList, fetchingListingData, actions, limit, offset, searchInput],
  );

  const onRowClick = React.useCallback(
    record => {
      return {
        onClick: event => {
          history.push(`/view/${record._id}`);
        },
      };
    },
    [history],
  );

  const columns = React.useMemo(() => getColumns({ formatMessage, history }), [
    formatMessage,
    history,
  ]);

  const handleCreateApplicationClick = () =>
    history.push('/create/application');

  const noAppsPresent =
    searchInput === '' &&
    fetchingListingData === SUCCESS &&
    listingData?.length === 0;

  return (
    <PageTemplate className="fade-in">
      <CapRow type="flex">
        <CapColumn>
          <CapHeading type="h2">
            {formatMessage(messages.vulcanApplications)}
          </CapHeading>
        </CapColumn>
      </CapRow>
      <br />
      <CapRow type="flex" justify="space-between" gutter={8}>
        <CapColumn span={6}>
          {!noAppsPresent && (
            <CapSearch
              placeholder={formatMessage(messages.searchPlaceholder)}
              onChange={e => handleSearch(e.target.value)}
              onClear={e => handleSearch(e.target.value)}
              allowClear
            />
          )}
        </CapColumn>
        <CapColumn>
          <RbacTooltipWrapper permission={VULCAN_EDIT_APPLICATION}>
            <span>
              <CapButton disabled={!Auth.hasAccess(VULCAN_EDIT_APPLICATION)} onClick={handleCreateApplicationClick}>
                {formatMessage(messages.createApplication)}
              </CapButton>
            </span>
          </RbacTooltipWrapper>
        </CapColumn>
      </CapRow>
      <br />
      <CapRow>
        {noAppsPresent ? (
          <EmptyStateIllustration
            emptyIllustrationText={formatMessage(messages.noApplicationsFound)}
          />
        ) : (
          <CapTable
            columns={columns}
            dataSource={listingData}
            onRow={onRowClick}
            id="listings-table"
            infinteScroll
            setPagination={setPaginationCb}
            scroll={TABLE_SCROLL_CONFIG}
            showLoader={fetchingListingData === REQUEST}
            loading={fetchingListingData === REQUEST}
            offset_limit={{ limit: limit, pageNumber: offset }}
          />
        )}
      </CapRow>
    </PageTemplate>
  );
};

Listing.propTypes = {
  intl: PropTypes.object,
  actions: PropTypes.object,
  listingState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  listingState: makeSelectListing(),
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

const withSaga = injectSaga({ key: 'listingSaga', saga });
const withReducer = injectReducer({ key: 'listingReducer', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withRouter(injectIntl(clearDataOnUnmount(Listing))));
