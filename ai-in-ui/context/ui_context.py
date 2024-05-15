training_data = [
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to capture customer information and make an API call to save the customer details to server from the below specs:
            {
              "entity": {
                "title": {
                  "type": "enum",
                  "defaultValue": "mr",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "mr",
                    "mrs",
                    "ms",
                    "others"
                  ]
                },
                "firstName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "middleName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "lastName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "dob": {
                  "type": "date",
                  "defaultValue": "current_date"
                },
                "gender": {
                  "type": "enum",
                  "defaultValue": "male",
                  "uiType": "radio",
                  "possibleValues": [
                    "male",
                    "female",
                    "others"
                  ]
                },
                "mobile": {
                  "type": "string",
                  "defaultValue": ""
                },
                "houseFlatNo": {
                  "type": "string",
                  "defaultValue": ""
                },
                "street": {
                  "type": "string",
                  "defaultValue": ""
                },
                "landmark": {
                  "type": "string",
                  "defaultValue": ""
                },
                "city": {
                  "type": "string",
                  "defaultValue": ""
                },
                "district": {
                  "type": "string",
                  "defaultValue": ""
                },
                "country": {
                  "type": "enum",
                  "defaultValue": "india",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "india",
                    "usa",
                    "uk"
                  ]
                },
                "pincode": {
                  "type": "string",
                  "defaultValue": ""
                },
                "passportNo": {
                  "type": "string",
                  "defaultValue": ""
                },
                "occupation": {
                  "type": "enum",
                  "defaultValue": "service",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "service",
                    "business",
                    "artist",
                    "others"
                  ]
                },
                "parentFFN": {
                  "type": "string",
                  "defaultValue": ""
                },
                "nationality": {
                  "type": "string",
                  "defaultValue": ""
                },
                "passportIssualCountry": {
                  "type": "enum",
                  "defaultValue": "india",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "india",
                    "usa",
                    "uk"
                  ]
                },
                "passportExpiry": {
                  "type": "date",
                  "defaultValue": "current_date"
                }
              },
              "action": {
                  "save": {
                    "api": "/saveCustomer",
                    "method": "POST"
                  }
              }
            }
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useState } from 'react'; // import react
            import { compose, bindActionCreators } from 'redux'; // import action binding utils from redux
            import { injectIntl, intlShape } from 'react-intl'; // import for using i18n in component
            import PropTypes from 'prop-types'; // import proptypes for definition
            import { createStructuredSelector } from 'reselect';
            import { connect } from 'react-redux'; // import connect for redux
            import moment from 'moment';
            
            // import capillary react sdk utils
            import { injectSaga,injectReducer,clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            
            // import style, actions, constants, saga, reducers and selectors
            import style from './style';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectCustomerInformation } from './selectors';
            
            import PageTemplate from '../../templates/PageTemplate';
        
            // import capillary UI library components
            import { CapRow, CapColumn, CapInput, CapSelect, CapRadioGroup, CapDatePicker, CapButton, CapHeading, CapLabel } from '@capillarytech/cap-ui-library';
            
            export const CustomerInformationForm = ({
              className,
              customerInformation,
              actions,
              intl,
            }) => {
              const [customerData, setCustomerData] = useState({
                  title: 'mr',
                  firstName: '',
                  middleName: '',
                  lastName: '',
                  dob: moment(),
                  gender: 'male',
                  mobile: '',
                  houseFlatNo: '',
                  street: '',
                  landmark: '',
                  city: '',
                  district: '',
                  country: 'india',
                  pincode: '',
                  passportNo: '',
                  occupation: 'service',
                  parentFFN: '',
                  nationality: '',
                  passportIssualCountry: 'india',
                  passportExpiry: moment(),
              });
            
              const handleSaveCustomer = () => {
               // make actions call on CTA click
                actions.saveCustomerData(customerData);
              };
            
              return (
                <div className={className}>
                  <PageTemplate>
                      <CapRow>
                          <CapColumn span={24}>
                              <CapHeading type="h2">Customer Information</CapHeading>
                          </CapColumn>
                      </CapRow>
                      <CapRow>
                          <CapColumn span={24}>
                              <CapSelect
                                  label={<CapLabel type="label2" style={{textAlign: 'left'}}>Title</CapLabel>}
                                  options={[
                                      { value: 'mr', label: 'Mr' },
                                      { value: 'mrs', label: 'Mrs' },
                                      { value: 'ms', label: 'Ms' },
                                      { value: 'others', label: 'Others' }
                                  ]}
                                  value={customerData.title}
                                  onChange={(value) => setCustomerData({ ...customerData, title: value })}
                              />
                          </CapColumn>
                          <CapColumn span={24}>
                              <CapInput
                                  label={<CapLabel type="label2" style={{textAlign: 'left'}}>First Name</CapLabel>}
                                  value={customerData.firstName}
                                  onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                              />
                          </CapColumn>
                          <CapColumn span={24}>
                              <CapInput
                                  label={<CapLabel type="label2" style={{textAlign: 'left'}}>Last Name</CapLabel>}
                                  value={customerData.lastName}
                                  onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                              />
                          </CapColumn>
                      </CapRow>
                      {/* Add fields as per the specifications in schema */}
                      <CapButton
                          className="save-button"
                          type="primary"
                          onClick={handleSaveCustomer}
                      >
                          Save Customer
                      </CapButton>
                  </PageTemplate>
                </div>
              );
            };
            
            // define component prop types
            CustomerInformationForm.propTypes = {
              customerInformation: PropTypes.object,
              actions: PropTypes.object,
              intl: intlShape.isRequired,
            };
            
            // create props from redux state
            const mapStateToProps = createStructuredSelector({
              customerInformation: makeSelectCustomerInformation()
            });
            
            // map actions to props
            function mapDispatchToProps(dispatch) {
              return {
                actions: bindActionCreators(actions, dispatch),
              };
            }
            
            const withConnect = connect(
              mapStateToProps,
              mapDispatchToProps,
            );
            
            // inject saga and reducer
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}-customerInformation`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}-customerInformation`, reducer });
            
            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(
              injectIntl(withStyles(clearDataOnUnmount(CustomerInformationForm, "clearData"), style))
            );
        """
    },
    {
        "role": "user",
        "content": """
            Create a simple react component to capture customer information and make a props call to save the customer details. Use your own layout and styling.
            Refer to the below schema for cutsomer entity:
            {
              "entity": {
                "title": {
                  "type": "enum",
                  "defaultValue": "mr",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "mr",
                    "mrs",
                    "ms",
                    "others"
                  ]
                },
                "firstName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "middleName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "lastName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "dob": {
                  "type": "date",
                  "defaultValue": "current_date"
                },
                "gender": {
                  "type": "enum",
                  "defaultValue": "male",
                  "uiType": "radio",
                  "possibleValues": [
                    "male",
                    "female",
                    "others"
                  ]
                },
                "mobile": {
                  "type": "string",
                  "defaultValue": ""
                },
                "houseFlatNo": {
                  "type": "string",
                  "defaultValue": ""
                }
              }
            }
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useState } from 'react';
            import moment from 'moment';
            import PageTemplate from '../../templates/PageTemplate';
            import {
                CapRow,
                CapColumn,
                CapHeading,
                CapInput,
                CapSelect,
                CapRadioGroup,
                CapRadio,
                CapDatePicker,
                CapButton,
                CapLabel,
            } from '@capillarytech/cap-ui-library';
            
            const CustomerFormPage = ({ saveDataForCustomer }) => {
                const [customerInfo, setCustomerInfo] = useState({
                    title: 'mr',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dob: moment(),
                    gender: 'male',
                    mobile: '',
                    houseFlatNo: ''
                });
            
                const saveData = () => {
                    console.log('Saving customer info:', customerInfo);
                    saveDataForCustomer(customerInfo);
                };
            
                const clearData = () => {
                    setCustomerInfo({
                        title: 'mr',
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        dob: moment(),
                        gender: 'male',
                        mobile: '',
                        houseFlatNo: ''
                    });
                };
            
                return (
                    <PageTemplate>
                        <CapRow style={{ padding: '10px' }}>
                            <CapColumn span={24}>
                                <CapHeading type="h2" style={{ color: '#5E6C84', marginTop: '10px', marginLeft: '8px', marginBottom: '10px', textAlign: 'left' }}>Personal Information</CapHeading>
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '10px' }}>
                                <CapSelect
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Title</CapLabel>}
                                    options={[{ value: 'mr', label: 'Mr' }, { value: 'mrs', label: 'Mrs' }, { value: 'ms', label: 'Ms' }]}
                                    value={customerInfo.title}
                                    onChange={(value) => setCustomerInfo({ ...customerInfo, title: value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '10px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>First Name</CapLabel>}
                                    value={customerInfo.firstName}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '10px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Middle Name</CapLabel>}
                                    value={customerInfo.middleName}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, middleName: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '10px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Last Name</CapLabel>}
                                    value={customerInfo.lastName}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '10px' }}>
                                <CapDatePicker
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>DOB</CapLabel>}
                                    value={customerInfo.dob}
                                    onChange={(value) => setCustomerInfo({ ...customerInfo, dob: value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '10px' }}>
                                <CapRadioGroup
                                    value={customerInfo.gender}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, gender: e.target.value })}
                                    style={{ width: '100%' }}
                                >
                                    <CapRow>
                                        <CapColumn span={6}>
                                            <CapLabel type="label2" style={{ textAlign: 'right' }}>Gender</CapLabel>
                                        </CapColumn>
                                        <CapColumn span={6}>
                                            <CapRadio value="male">Male</CapRadio>
                                        </CapColumn>
                                        <CapColumn span={6}>
                                            <CapRadio value="female">Female</CapRadio>
                                        </CapColumn>
                                        <CapColumn span={6}>
                                            <CapRadio value="trans">Trans</CapRadio>
                                        </CapColumn>
                                        <CapColumn span={6}>
                                            <CapRadio value="others">Others</CapRadio>
                                        </CapColumn>
                                    </CapRow>
                                </CapRadioGroup>
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '10px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Mobile</CapLabel>}
                                    value={customerInfo.mobile}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, mobile: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                        </CapRow>
            
                        <CapRow style={{ padding: '10px' }}>
                            <CapColumn span={24}>
                                <CapHeading type="h2" style={{ color: '#5E6C84', marginTop: '10px', marginLeft: '8px', marginBottom: '10px', textAlign: 'left' }}>Contact Information</CapHeading>
                            </CapColumn>
                            <CapColumn span={24} style={{ padding: '10px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>House / Flat No</CapLabel>}
                                    value={customerInfo.houseFlatNo}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, houseFlatNo: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                        </CapRow>
                        <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                            <CapColumn span={4} style={{ padding: '8px 16px' }}>
                                <CapButton
                                    type="primary"
                                    onClick={saveData}
                                    style={{ margin: '0 12px' }}
                                >
                                    Save
                                </CapButton>
                            </CapColumn>
                            <CapColumn span={4} style={{ padding: '8px 16px' }}>
                                <CapButton
                                    type="secondary"
                                    onClick={clearData}
                                    style={{ margin: '0 12px' }}
                                >
                                    Cancel
                                </CapButton>
                            </CapColumn>
                        </CapRow>
                    </PageTemplate>
                );
            };
            
            export default CustomerFormPage;
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all extended fields in a tabular format. Refer to the below extended field entity schema for the fields and API call to fetch the data:\n
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"entityType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"customer\",\"transaction\",\"lineitem\",\"card\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"DOUBLE\",\"STRING\",\"INTEGER\",\"CUSTOM_ENUM\"]},\"enumValues\":{\"type\":\"string\",\"defaultValue\":\"\"}},\"action\":{\"api\":\"/v2/extendedFields\",\"method\":\"GET\"}}
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { connect } from 'react-redux';
            import { createStructuredSelector } from 'reselect';
            import { injectIntl, intlShape } from 'react-intl';
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            import { CapTable, CapRow, CapColumn, CapHeading, CapSpin, CapMenu, CapIcon, CapDropdown } from '@capillarytech/cap-ui-library';
            import PropTypes from 'prop-types';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectExtendedFields } from './selectors';
            import PageTemplate from '../../templates/PageTemplate';
            import style from './style';
            
            const ExtendedFieldsTable = ({ className, extendedFieldsData, actions }) => {
            
              // extract data and fetching status from the props data, taken from redux state via selectors
              const { data, fetching } = extendedFieldsData;
              
              const [pagination, setPagination] = useState({ 
                  pageSize: 10, // based on user input, limit of records per page
                  current: 1, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
              });
              
              useEffect(() => {
                // always make API call to fetch data in case of redux state managed components by using actions call instead of direct method import / call
                actions.fetchExtendedFields();
              }, []);
            
              ## add this section if actions column is required by user ##
              const handleMenuClick = e => {
                e.domEvent.stopPropagation();
              };
              const handleMenuDropdownClick = e => {
                e.stopPropagation();
              };
              ## end of if actions column is required by user ##
            
              const getExtendedFieldsTableColumns = () => {
                // define all columsn according to the given schema
                const columns = [
                  { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                  { dataIndex: 'entityType', key: 'entityType', title: <CapHeading type="h5">Entity Type</CapHeading> },
                  { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                  { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                  { dataIndex: 'enumValues', key: 'enumValues', title: <CapHeading type="h5">Enum Values</CapHeading> },
                  // add actions only when required
                  { 
                      dataIndex: '', 
                      key: 'actions', 
                      title: '', 
                      align: 'center', 
                      width: '8%',
                      render: (text, record) => (
                        <CapRow>
                          <CapDropdown onClick={handleMenuDropdownClick} overlay={(
                            <CapMenu onClick={handleMenuClick}>
                              <CapMenu.Item
                                onClick={() => { /* handle this menu click action item on particular row */ }}
                              >
                                Action_1
                              </CapMenu.Item>
                              <CapMenu.Item
                                onClick={() => { /* handle this menu click action item on particular row */ }}
                              >
                                Action_2
                              </CapMenu.Item>
                            </CapMenu>
                          )}>
                            <CapIcon type="more" aria-label="Action menu icon" />
                          </CapDropdown>
                        </CapRow>
                      )
                    }
                ];
                // calculate required column width based on whether actions column is required
                const columnWidth = `${Math.floor(<if actions column is there then 92 else 100>  / columns.length)}%`;
                // attach column widths to the column list
                const finalColumns = columns.map(col => ({
                  ...col,
                  width: columnWidth,
                }));
                return finalColumns;
              };
                
              return (
              <div className={className}>
                <PageTemplate>
                  <CapRow>
                    <CapColumn span={24}>
                      <CapHeading type="h2">Extended Fields</CapHeading>
                    </CapColumn>
                    <CapColumn span={24}>
                      <CapSpin spinning={fetching}> // use this only in case of table or data view component which are redux state managed
                        <CapTable
                          className="extended-fields-table"
                          columns={getExtendedFieldsTableColumns()}
                          dataSource={data} // data taken from props
                          rowKey="id" // Assuming 'id' is the unique key for each extended field
                          rowSelection={null}
                          identifier="extendedFieldsTable"
                          pagination={pagination}
                          scroll={{ y: 500 }}
                          infinteScroll={false}
                          showLoader={false}
                          rowClassName="extended-fields-row"
                          // handle row click on the table
                          onRow={record => {
                            return {
                              onClick: event => {
                                /* handle row click */
                              },
                            };
                          }}
                        />
                      </CapSpin>
                    </CapColumn>
                  </CapRow>
                </PageTemplate>
              </div>
              );
            };
            
            ExtendedFieldsTable.propTypes = {
              extendedFieldsData: PropTypes.array.isRequired,
              actions: PropTypes.object,
              intl: intlShape.isRequired,
            };
            
            const mapStateToProps = createStructuredSelector({
              extendedFieldsData: makeSelectExtendedFields(),
            });
            
            function mapDispatchToProps(dispatch) {
              return {
                actions: bindActionCreators(actions, dispatch),
              };
            }
            
            const withConnect = connect(mapStateToProps, mapDispatchToProps);
            
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}_extendedFieldsListSaga`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_extendedFieldsListReducer`, reducer });
            
            export default compose(
                withSaga,
                withReducer,
                withConnect,
            )(injectIntl(withStyles(clearDataOnUnmount(ExtendedFieldsTable, "clearData"), style)));
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization's custom fields in a tabular format. Also, add edit and delete actions for the rows of the table with dummy functions to be implemented. 
            Refer to the below custom field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"},\"isDisabled\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isUpdatable\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"enableAuditTrail\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isPiiData\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isPsiData\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"}},\"action\":{\"api\":\"/v2/organization/customFields\",\"method\":\"GET\"}}
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { connect } from 'react-redux';
            import { createStructuredSelector } from 'reselect';
            import { injectIntl, intlShape } from 'react-intl';
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            import { CapTable, CapRow, CapColumn, CapHeading, CapSpin, CapMenu, CapIcon, CapDropdown } from '@capillarytech/cap-ui-library';
            import PropTypes from 'prop-types';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectCustomFields } from './selectors';
            import PageTemplate from '../../templates/PageTemplate';
            import style from './style';
            
            const CustomFieldsTable = ({ className, customFieldsData, actions }) => {
            
              const { data, fetching } = customFieldsData;
              
              const [pagination, setPagination] = useState({ 
                  pageSize: 10, // based on user input, limit of records per page
                  current: 1, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
              });
            
              useEffect(() => {
                actions.fetchCustomFields();
              }, []);
            
              const handleActionsMenuClick = e => {
                e.domEvent.stopPropagation();
              };
            
              const handleActionsMenuDropdownClick = e => {
                e.stopPropagation();
              };
            
              const handleEdit = record => {
                console.log('Edit record:', record);
              };
            
              const handleDelete = record => {
                console.log('Delete record:', record);
              };
            
              const getCustomFieldsTableColumns = () => {
                const columns = [
                  { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                  { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                  { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                  { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                  { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                  { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                  { dataIndex: 'isDisabled', key: 'isDisabled', title: <CapHeading type="h5">Disabled</CapHeading> },
                  { dataIndex: 'isUpdatable', key: 'isUpdatable', title: <CapHeading type="h5">Updatable</CapHeading> },
                  { dataIndex: 'enableAuditTrail', key: 'enableAuditTrail', title: <CapHeading type="h5">Audit Trail</CapHeading> },
                  { dataIndex: 'isPiiData', key: 'isPiiData', title: <CapHeading type="h5">PII Data</CapHeading> },
                  { dataIndex: 'isPsiData', key: 'isPsiData', title: <CapHeading type="h5">PSI Data</CapHeading> },
                  // add only when actions columns is needed
                  {
                      dataIndex: '',
                      key: 'actions',
                      title: '',
                      align: 'center',
                      render: (text, record) => (
                        <CapRow>
                          <CapDropdown onClick={handleActionsMenuDropdownClick} overlay={(
                            <CapMenu onClick={handleActionsMenuClick}>
                              <CapMenu.Item onClick={() => handleEdit(record)}>Edit</CapMenu.Item>
                              <CapMenu.Item onClick={() => handleDelete(record)}>Delete</CapMenu.Item>
                            </CapMenu>
                          )}>
                            <CapIcon type="more" aria-label="Action menu icon" />
                          </CapDropdown>
                        </CapRow>
                      )
                    }
                ];
            
                const columnWidth = `${Math.floor(100 / columns.length)}%`;
            
                const finalColumns = columns.map(col => ({
                  ...col,
                  width: columnWidth,
                }));
                return finalColumns;
              };
            
              return (
              <div className={className}>
                <PageTemplate>
                  <CapRow>
                    <CapColumn span={24}>
                      <CapHeading type="h2">Custom Fields</CapHeading>
                    </CapColumn>
                    <CapColumn span={24}>
                      <CapSpin spinning={fetching}>
                        <CapTable
                          className="custom-fields-table"
                          columns={getCustomFieldsTableColumns()}
                          dataSource={data}
                          rowKey="id"
                          rowSelection={null}
                          identifier="customFieldsTable"
                          pagination={pagination}
                          scroll={{ y: 500 }}
                          infinteScroll={false}
                          showLoader={false}
                          rowClassName="custom-fields-row"
                          onRow={record => {
                            return {
                              onClick: event => {
                                /* handle row click */
                              },
                            };
                          }}
                        />
                      </CapSpin>
                    </CapColumn>
                  </CapRow>
                </PageTemplate>
              </div>
              );
            };
            
            CustomFieldsTable.propTypes = {
              customFieldsData: PropTypes.array.isRequired,
              actions: PropTypes.object,
              intl: intlShape.isRequired,
            };
            
            const mapStateToProps = createStructuredSelector({
              customFieldsData: makeSelectCustomFields(),
            });
            
            function mapDispatchToProps(dispatch) {
              return {
                actions: bindActionCreators(actions, dispatch),
              };
            }
            
            const withConnect = connect(mapStateToProps, mapDispatchToProps);
            
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}_customFieldsListSaga`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_customFieldsListReducer`, reducer });
            
            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(injectIntl(withStyles(clearDataOnUnmount(CustomFieldsTable, "clearData"), style)));
        """
    },
    {
        "role": "user",
        "content": """
            Create a simple react component to list all the organization's extended fields in a tabular format. Do not add actions on the rows. 
            Consider that the extended fields data is coming to the component as a prop with data(list) and loading (boolean) attributes.
            Keep 15 rows per page and select 3rd page by default. 
            Refer to the below extended field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"},\"isDisabled\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isUpdatable\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"enableAuditTrail\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isPiiData\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isPsiData\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"}}}
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useState } from 'react';
            import { CapTable, CapRow, CapColumn, CapHeading, CapSpin } from '@capillarytech/cap-ui-library';
            import PropTypes from 'prop-types';
            
            const ExtendedFieldsTable = ({ data, loading }) => {
                const [pagination, setPagination] = useState({ 
                  pageSize: 15, // based on user input, limit of records per page
                  current: 3, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
                });
              
                const getExtendedFieldsTableColumns = () => {
                    return [
                        { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                        { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                        { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                        { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                        { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                        { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                        { dataIndex: 'isDisabled', key: 'isDisabled', title: <CapHeading type="h5">Disabled</CapHeading> },
                        { dataIndex: 'isUpdatable', key: 'isUpdatable', title: <CapHeading type="h5">Updatable</CapHeading> },
                        { dataIndex: 'enableAuditTrail', key: 'enableAuditTrail', title: <CapHeading type="h5">Audit Trail</CapHeading> },
                        { dataIndex: 'isPiiData', key: 'isPiiData', title: <CapHeading type="h5">PII Data</CapHeading> },
                        { dataIndex: 'isPsiData', key: 'isPsiData', title: <CapHeading type="h5">PSI Data</CapHeading> },
                    ];
                };
            
                return (
                    <CapRow>
                        <CapColumn span={24}>
                            <CapHeading type="h2">Organization's Extended Fields</CapHeading>
                        </CapColumn>
                        <CapColumn span={24}>
                            <CapSpin spinning={loading}>
                                <CapTable
                                    className="extended-fields-table"
                                    columns={getExtendedFieldsTableColumns()}
                                    dataSource={data}
                                    rowKey="id" // Assuming 'id' is the unique key for each extended field
                                    rowSelection={null}
                                    identifier="extendedFieldsTable"
                                    pagination={pagination}
                                    scroll={{ y: 500 }}
                                    infinteScroll={false}
                                    showLoader={false}
                                    rowClassName="extended-fields-row"
                                />
                            </CapSpin>
                        </CapColumn>
                    </CapRow>
                );
            };
            
            ExtendedFieldsTable.propTypes = {
                data: PropTypes.array.isRequired,
                loading: PropTypes.bool.isRequired,
            };
            
            export default ExtendedFieldsTable;
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization's custom fields in a tabular format. 
            Create a custom row class in style.js along with it to make sure table cells text overflow is handled with ellipsis.
            Refer to the below custom field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"},\"isDisabled\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isUpdatable\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"enableAuditTrail\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isPiiData\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isPsiData\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"}},\"action\":{\"api\":\"/v2/organization/customFields\",\"method\":\"GET\"}}
        """
    },
    {
        "role": "assistant",
        "content": """
            ```javascript
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { connect } from 'react-redux';
            import { createStructuredSelector } from 'reselect';
            import { injectIntl, intlShape } from 'react-intl';
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            import { CapTable, CapRow, CapColumn, CapHeading, CapSpin, CapMenu, CapIcon, CapDropdown } from '@capillarytech/cap-ui-library';
            import PropTypes from 'prop-types';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectCustomFields } from './selectors';
            import PageTemplate from '../../templates/PageTemplate';
            import style from './style';
            
            const CustomFieldsTable = ({ className, customFieldsData, actions }) => {
            
              const { data, fetching } = customFieldsData;
              
              const [pagination, setPagination] = useState({ 
                  pageSize: 10, // based on user input, limit of records per page
                  current: 1, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
              });
            
              useEffect(() => {
                actions.fetchCustomFields();
              }, []);
            
              const getCustomFieldsTableColumns = () => {
                const columns = [
                  { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                  { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                  { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                  { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                  { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                  { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                  { dataIndex: 'isDisabled', key: 'isDisabled', title: <CapHeading type="h5">Disabled</CapHeading> },
                  { dataIndex: 'isUpdatable', key: 'isUpdatable', title: <CapHeading type="h5">Updatable</CapHeading> },
                  { dataIndex: 'enableAuditTrail', key: 'enableAuditTrail', title: <CapHeading type="h5">Audit Trail</CapHeading> },
                  { dataIndex: 'isPiiData', key: 'isPiiData', title: <CapHeading type="h5">PII Data</CapHeading> },
                  { dataIndex: 'isPsiData', key: 'isPsiData', title: <CapHeading type="h5">PSI Data</CapHeading> },
                ];
                const columnWidth = `${Math.floor(100 / columns.length)}%`;
                const finalColumns = columns.map(col => ({
                  ...col,
                  width: columnWidth,
                }));
                return finalColumns;
              };
            
              return (
              <div className={className}>
                <PageTemplate>
                  <CapRow>
                    <CapColumn span={24}>
                      <CapHeading type="h2">Custom Fields</CapHeading>
                    </CapColumn>
                    <CapColumn span={24}>
                      <CapSpin spinning={fetching}>
                        <CapTable
                          className="custom-fields-table"
                          columns={getCustomFieldsTableColumns()}
                          dataSource={data}
                          rowKey="id"
                          rowSelection={null}
                          identifier="customFieldsTable"
                          pagination={pagination}
                          scroll={{ y: 500 }}
                          infinteScroll={false}
                          showLoader={false}
                          rowClassName="custom-fields-row" // Added custom class name here
                          onRow={record => {
                            return {
                              onClick: event => {
                                /* handle row click */
                              },
                            };
                          }}
                        />
                      </CapSpin>
                    </CapColumn>
                  </CapRow>
                </PageTemplate>
              </div>
              );
            };
            
            CustomFieldsTable.propTypes = {
              customFieldsData: PropTypes.array.isRequired,
              actions: PropTypes.object,
              intl: intlShape.isRequired,
            };
            
            const mapStateToProps = createStructuredSelector({
              customFieldsData: makeSelectCustomFields(),
            });
            
            function mapDispatchToProps(dispatch) {
              return {
                actions: bindActionCreators(actions, dispatch),
              };
            }
            
            const withConnect = connect(mapStateToProps, mapDispatchToProps);
            
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}_customFieldsListSaga`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_customFieldsListReducer`, reducer });
            
            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(injectIntl(withStyles(clearDataOnUnmount(CustomFieldsTable, "clearData"), style)));
            ```
            ```javascript
            import { css } from 'styled-components';
            
            export default css`
              .custom-fields-row td {
                width: 50px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            `;
            ```
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization's custom fields in a tabular format. 
            keep 20 records in every page, add one action for each row for deleting, with dummy function to be implemented. 
            Refer to the below custom field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"}},\"action\":{\"api\":\"/v2/organization/customFields\",\"method\":\"GET\"}}
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { injectIntl, intlShape } from 'react-intl';
            import PropTypes from 'prop-types';
            import { createStructuredSelector } from 'reselect';
            import { connect } from 'react-redux';
            import { CapTable, CapSpin, CapHeading, CapMenu, CapDropdown, CapIcon } from '@capillarytech/cap-ui-library';
            import PageTemplate from '../../templates/PageTemplate';
            import { makeSelectCustomFields } from './selectors';
            import style from './style';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            
            const CustomFieldsList = ({ className, customFields, actions }) => {
                const { data, fetching } = customFields;
                
                const [pagination, setPagination] = useState({ 
                  pageSize: 20, // based on user input, limit of records per page
                  current: 1, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
                });
            
                useEffect(() => {
                    actions.fetchCustomFields();
                }, []);
                
                const getCustomFieldsDataSource = () => data;
            
                const handleDelete = (record) => {
                    // Dummy function to be implemented for deleting custom field
                    console.log('Deleting custom field:', record);
                };
            
                const handleActionsMenuClick = (e) => {
                  e.stopPropagation();
                }
            
                const getCustomFieldsTableColumns = () => {
                    const columns = [
                        { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                        { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                        { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                        { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                        { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                        { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                        // include the below actions column in the table only when requested
                        {
                            dataIndex: 'actions',
                            key: 'actions',
                            title: <CapHeading type="h5">Actions</CapHeading>,
                            render: (text, record) => (
                                <CapDropdown
                                    overlay={(
                                        <CapMenu onClick={handleActionsMenuClick}>
                                            <CapMenu.Item key="delete" onClick={() => handleDelete(record)}>Delete</CapMenu.Item>
                                        </CapMenu>
                                    )}
                                >
                                    <CapIcon type="more" aria-label="Action menu icon" />
                                </CapDropdown>
                            ),
                        },
                    ];
                    const columnWidth = `${Math.floor(100/columns.length)}%`;
                    return columns.map(column => ({
                        ...column,
                        width: columnWidth,
                    }));
                };
            
                return (
                <div className={className}>
                    <PageTemplate>
                        <CapSpin spinning={fetching}>
                            <CapTable
                                className="custom-fields-list-table"
                                columns={getCustomFieldsTableColumns()}
                                dataSource={getCustomFieldsDataSource()}
                                rowKey="id"
                                rowSelection={null}
                                identifier="customFieldsList"
                                pagination={pagination}
                                scroll={{ y: 500 }}
                                infinteScroll={false}
                                showLoader={!customFields}
                                rowClassName="custom-fields-row"
                            />
                        </CapSpin>
                    </PageTemplate>
                </div>
                );
            };
            
            CustomFieldsList.propTypes = {
                customFields: PropTypes.array,
                actions: PropTypes.object,
                intl: intlShape.isRequired,
            };
            
            const mapStateToProps = createStructuredSelector({
                customFields: makeSelectCustomFields(),
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
            
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}_customFieldsListSaga`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_customFieldsListReducer`, reducer });
            
            export default compose(
                withSaga,
                withReducer,
                withConnect,
            )(
                injectIntl(withStyles(clearDataOnUnmount(CustomFieldsList, 'clearData'), style))
            );
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization's extended fields in a tabular format. No need to add actions column in the table.
            Refer to the below custom field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"}},\"action\":{\"api\":\"/v2/extendedFields\",\"method\":\"GET\"}}
        """
    },
    {
        "role": "assistant",
        "content": """
            // Import necessary libraries and components
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { injectIntl, intlShape } from 'react-intl';
            import PropTypes from 'prop-types';
            import { createStructuredSelector } from 'reselect';
            import { connect } from 'react-redux';
            import moment from 'moment';
            
            // Import capillary react sdk utils
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            
            // Import style, actions, constants, saga, reducers and selectors
            import style from './style';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectExtendedFields } from './selectors';
            
            import PageTemplate from '../../templates/PageTemplate';
            import { CapTable, CapSpin, CapHeading } from '@capillarytech/cap-ui-library';
            
            const ExtendedFieldsList = ({ className, extendedFields, actions, intl }) => {
                useEffect(() => {
                    actions.fetchExtendedFields();
                }, []);
                
                const [pagination, setPagination] = useState({ 
                  pageSize: 10, // based on user input, limit of records per page
                  current: 1, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
                });
            
                // Function to generate columns for the table
                const getExtendedFieldsTableColumns = () => {
                    return [
                        { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                        { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                        { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                        { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                        { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                        { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> }
                    ];
                };
            
                return (
                <div className={className}>
                    <PageTemplate>
                        <CapSpin spinning={extendedFields.fetching}>
                            <CapTable
                                className="extended-fields-table"
                                columns={getExtendedFieldsTableColumns()}
                                dataSource={extendedFields.data}
                                rowKey="name"
                                rowSelection={null}
                                identifier="extendedFieldsList"
                                pagination={pagination}
                                scroll={{ y: 500 }}
                                infinteScroll={false}
                                showLoader={extendedFields.fetching}
                            />
                        </CapSpin>
                    </PageTemplate>
                </div>
                );
            };
            
            // Define component prop types
            ExtendedFieldsList.propTypes = {
                extendedFields: PropTypes.object,
                actions: PropTypes.object,
                intl: intlShape.isRequired,
            };
            
            // Create props from redux state
            const mapStateToProps = createStructuredSelector({
                extendedFields: makeSelectExtendedFields()
            });
            
            // Map actions to props
            function mapDispatchToProps(dispatch) {
                return {
                    actions: bindActionCreators(actions, dispatch),
                };
            }
            
            const withConnect = connect(
                mapStateToProps,
                mapDispatchToProps,
            );
            
            // Inject saga and reducer
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}-extendedFields`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}-extendedFields`, reducer });
            
            export default compose(
                withSaga,
                withReducer,
                withConnect,
            )(
                injectIntl(withStyles(clearDataOnUnmount(ExtendedFieldsList, "clearData"), style))
            );
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization's extended fields in a tabular format. 
            Refer to the below custom field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"}},\"action\":{\"api\":\"/v2/extendedFields\",\"method\":\"GET\"}}
        """
    },
    {
        "role": "assistant",
        "content": """
            // Import necessary libraries and components
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { injectIntl, intlShape } from 'react-intl';
            import PropTypes from 'prop-types';
            import { createStructuredSelector } from 'reselect';
            import { connect } from 'react-redux';
            import moment from 'moment';

            // Import capillary react sdk utils
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';

            // Import style, actions, constants, saga, reducers and selectors
            import style from './style';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectExtendedFields } from './selectors';

            import PageTemplate from '../../templates/PageTemplate';
            import { CapTable, CapSpin, CapHeading } from '@capillarytech/cap-ui-library';

            const ExtendedFieldsList = ({ className, extendedFields, actions, intl }) => {
                useEffect(() => {
                    actions.fetchExtendedFields();
                }, []);
                
                const [pagination, setPagination] = useState({ 
                  pageSize: 10, // based on user input, limit of records per page
                  current: 1, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
                });

                // Function to generate columns for the table
                const getExtendedFieldsTableColumns = () => {
                    return [
                        { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                        { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                        { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                        { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                        { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                        { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> }
                    ];
                };

                return (
                <div className={className}>
                    <PageTemplate>
                        <CapSpin spinning={extendedFields.fetching}>
                            <CapTable
                                className="extended-fields-table"
                                columns={getExtendedFieldsTableColumns()}
                                dataSource={extendedFields.data}
                                rowKey="name"
                                rowSelection={null}
                                identifier="extendedFieldsList"
                                pagination={pagination}
                                scroll={{ y: 500 }}
                                infinteScroll={false}
                                showLoader={extendedFields.fetching}
                            />
                        </CapSpin>
                    </PageTemplate>
                </div>
                );
            };

            // Define component prop types
            ExtendedFieldsList.propTypes = {
                extendedFields: PropTypes.object,
                actions: PropTypes.object,
                intl: intlShape.isRequired,
            };

            // Create props from redux state
            const mapStateToProps = createStructuredSelector({
                extendedFields: makeSelectExtendedFields()
            });

            // Map actions to props
            function mapDispatchToProps(dispatch) {
                return {
                    actions: bindActionCreators(actions, dispatch),
                };
            }

            const withConnect = connect(
                mapStateToProps,
                mapDispatchToProps,
            );

            // Inject saga and reducer
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}-extendedFields`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}-extendedFields`, reducer });

            export default compose(
                withSaga,
                withReducer,
                withConnect,
            )(
                injectIntl(withStyles(clearDataOnUnmount(ExtendedFieldsList, "clearData"), style))
            );
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization's custom fields in a tabular format. 
            Also, add edit and delete actions for the rows of the table with dummy functions to be implemented. 
            Refer to the below custom field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"},\"isDisabled\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isUpdatable\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"}},\"action\":{\"api\":\"/v2/organization/customFields\",\"method\":\"GET\"}}
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { connect } from 'react-redux';
            import { createStructuredSelector } from 'reselect';
            import { injectIntl, intlShape } from 'react-intl';
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            import { CapTable, CapRow, CapColumn, CapHeading, CapSpin, CapMenu, CapIcon, CapDropdown } from '@capillarytech/cap-ui-library';
            import PropTypes from 'prop-types';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectCustomFields } from './selectors';
            import PageTemplate from '../../templates/PageTemplate';
            import style from './style';

            const CustomFieldsTable = ({ className, customFieldsData, actions }) => {

              const { data, fetching } = customFieldsData;

              const [pagination, setPagination] = useState({ 
                  pageSize: 10, // based on user input, limit of records per page
                  current: 1, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
              });

              useEffect(() => {
                actions.fetchCustomFields();
              }, []);

              const handleActionsMenuClick = e => {
                e.domEvent.stopPropagation();
              };

              const handleActionsMenuDropdownClick = e => {
                e.stopPropagation();
              };

              const handleEdit = record => {
                console.log('Edit record:', record);
              };

              const handleDelete = record => {
                console.log('Delete record:', record);
              };

              const getCustomFieldsTableColumns = () => {
                const columns = [
                  { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                  { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                  { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                  { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                  { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                  { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                  { dataIndex: 'isDisabled', key: 'isDisabled', title: <CapHeading type="h5">Disabled</CapHeading> },
                  { dataIndex: 'isUpdatable', key: 'isUpdatable', title: <CapHeading type="h5">Updatable</CapHeading> },
                  // add this action column only if requested
                  {
                      dataIndex: '',
                      key: 'actions',
                      title: '',
                      align: 'center',
                      width: '8%',
                      render: (text, record) => (
                        <CapRow>
                          <CapDropdown onClick={handleActionsMenuDropdownClick} overlay={(
                            <CapMenu onClick={handleActionsMenuClick}>
                              <CapMenu.Item onClick={() => handleEdit(record)}>Edit</CapMenu.Item>
                              <CapMenu.Item onClick={() => handleDelete(record)}>Delete</CapMenu.Item>
                            </CapMenu>
                          )}>
                            <CapIcon type="more" aria-label="Action menu icon" />
                          </CapDropdown>
                        </CapRow>
                      )
                    },
                ];
                const columnWidth = `${Math.floor(100 / columns.length)}%`;
                const finalColumns = columns.map(col => ({
                  ...col,
                  width: columnWidth,
                }));
                return finalColumns;
              };

              return (
                  <div className={className}>
                    <PageTemplate>
                      <CapRow>
                        <CapColumn span={24}>
                          <CapHeading type="h2">Custom Fields</CapHeading>
                        </CapColumn>
                        <CapColumn span={24}>
                          <CapSpin spinning={fetching}>
                            <CapTable
                              className="custom-fields-table"
                              columns={getCustomFieldsTableColumns()}
                              dataSource={data}
                              rowKey="id"
                              rowSelection={null}
                              identifier="customFieldsTable"
                              pagination={pagination}
                              scroll={{ y: 500 }}
                              infinteScroll={false}
                              showLoader={false}
                              rowClassName="custom-fields-row"
                              onRow={record => {
                                return {
                                  onClick: event => {
                                    /* handle row click */
                                  },
                                };
                              }}
                            />
                          </CapSpin>
                        </CapColumn>
                      </CapRow>
                    </PageTemplate>
                  </div>
              );
            };

            CustomFieldsTable.propTypes = {
              customFieldsData: PropTypes.object.isRequired,
              actions: PropTypes.object.isRequired,
              intl: intlShape.isRequired,
            };

            const mapStateToProps = createStructuredSelector({
              customFieldsData: makeSelectCustomFields(),
            });

            function mapDispatchToProps(dispatch) {
              return {
                actions: bindActionCreators(actions, dispatch),
              };
            }

            const withConnect = connect(mapStateToProps, mapDispatchToProps);

            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}_customFieldsListSaga`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_customFieldsListReducer`, reducer });

            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(
                injectIntl(withStyles(clearDataOnUnmount(CustomFieldsTable, "clearData"), style))
            );
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization's custom fields in a tabular format. 
            Also, add edit and delete actions for the rows of the table with dummy functions to be implemented. 
            Refer to the below custom field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"},\"isDisabled\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isUpdatable\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"}},\"action\":{\"api\":\"/v2/organization/customFields\",\"method\":\"GET\"}}
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { connect } from 'react-redux';
            import { createStructuredSelector } from 'reselect';
            import { injectIntl, intlShape } from 'react-intl';
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            import { CapTable, CapRow, CapColumn, CapHeading, CapSpin, CapMenu, CapIcon, CapDropdown } from '@capillarytech/cap-ui-library';
            import PropTypes from 'prop-types';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectCustomFields } from './selectors';
            import PageTemplate from '../../templates/PageTemplate';
            import style from './style';

            const CustomFieldsTable = ({ className, customFieldsData, actions }) => {

              // extract data and fetching boolean flag from props data in redux
              const { data, fetching } = customFieldsData;

              // define pagination state variable for table type components
              const [pagination, setPagination] = useState({ 
                  pageSize: 10, // based on user input, limit of records per page
                  current: 1, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
              });

              // call action to load custom fields on component mount
              useEffect(() => {
                actions.fetchCustomFields();
              }, []);

              // stop event propagation on menu click
              const handleActionsMenuClick = e => {
                e.domEvent.stopPropagation();
              };

              // stop event propagation on dropdown click
              const handleActionsMenuDropdownClick = e => {
                e.stopPropagation();
              };

              // implement edit record
              const handleEdit = record => {
                console.log('Edit record:', record);
              };

              // implement delete record
              const handleDelete = record => {
                console.log('Delete record:', record);
              };

              // prepare all columns for table
              const getCustomFieldsTableColumns = () => {
                const columns = [
                  { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                  { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                  { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                  { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                  { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                  { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                  { dataIndex: 'isDisabled', key: 'isDisabled', title: <CapHeading type="h5">Disabled</CapHeading> },
                  { dataIndex: 'isUpdatable', key: 'isUpdatable', title: <CapHeading type="h5">Updatable</CapHeading> },
                  // add this action column only if actions column is needed
                  {
                      dataIndex: '',
                      key: 'actions',
                      title: '',
                      align: 'center',
                      render: (text, record) => (
                        <CapRow>
                          <CapDropdown onClick={handleActionsMenuDropdownClick} overlay={(
                            <CapMenu onClick={handleActionsMenuClick}>
                              <CapMenu.Item onClick={() => handleEdit(record)}>Edit</CapMenu.Item>
                              <CapMenu.Item onClick={() => handleDelete(record)}>Delete</CapMenu.Item>
                            </CapMenu>
                          )}>
                            <CapIcon type="more" aria-label="Action menu icon" />
                          </CapDropdown>
                        </CapRow>
                      )
                    },
                ];
                // get column width
                const columnWidth = `${Math.floor(100 / columns.length)}%`;
                // append column width and send back columns list for table
                const finalColumns = columns.map(col => ({
                  ...col,
                  width: columnWidth,
                }));
                return finalColumns;
              };

              return (
                  <div className={className}>
                    <PageTemplate>
                      <CapRow>
                        <CapColumn span={24}>
                          <CapHeading type="h2">Custom Fields</CapHeading>
                        </CapColumn>
                        <CapColumn span={24}>
                          <CapSpin spinning={fetching}>
                            <CapTable
                              className="custom-fields-table"
                              columns={getCustomFieldsTableColumns()}
                              dataSource={data}
                              rowKey="id"
                              rowSelection={null}
                              identifier="customFieldsTable"
                              pagination={pagination}
                              scroll={{ y: 500 }}
                              infinteScroll={false}
                              showLoader={false}
                              rowClassName="custom-fields-row"
                              onRow={record => {
                                return {
                                  onClick: event => {
                                    /* handle row click */
                                  },
                                };
                              }}
                            />
                          </CapSpin>
                        </CapColumn>
                      </CapRow>
                    </PageTemplate>
                  </div>
              );
            };

            // define prop types of component
            CustomFieldsTable.propTypes = {
              customFieldsData: PropTypes.object.isRequired,
              actions: PropTypes.object.isRequired,
              intl: intlShape.isRequired,
            };

            // map redux state to props of component using selector methods
            const mapStateToProps = createStructuredSelector({
              customFieldsData: makeSelectCustomFields(),
            });

            // map actions to props of component
            function mapDispatchToProps(dispatch) {
              return {
                actions: bindActionCreators(actions, dispatch),
              };
            }

            // declare with connect for state and actions props
            const withConnect = connect(mapStateToProps, mapDispatchToProps);

            // inject saga and reducer with unique key using CURRENT_APP_NAME
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}_customFieldsListSaga`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_customFieldsListReducer`, reducer });

            // export component
            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(
                injectIntl(withStyles(clearDataOnUnmount(CustomFieldsTable, "clearData"), style))
            );
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization\'s custom fields in a tabular format. 
            Refer to the below custom field entity schema:
            {"entity":{"name":{"type":"string","defaultValue":""},"type":{"type":"string","defaultValue":""},"dataType":{"type":"enum","defaultValue":"","uiType":"dropdown","possibleValues":["boolean","integer","string","enum"]},"label":{"type":"string","defaultValue":""},"scope":{"type":"string","defaultValue":""},"defaultValue":{"type":"string","defaultValue":""},"phase":{"type":"string","defaultValue":""},"isDisabled":{"type":"boolean","defaultValue":false,"uiType":"checkbox"},"isUpdatable":{"type":"boolean","defaultValue":false,"uiType":"checkbox"},"isPiiData":{"type":"boolean","defaultValue":false,"uiType":"checkbox"},"isPsiData":{"type":"boolean","defaultValue":false,"uiType":"checkbox"}},"action":{"api":"/v2/organization/customFields","method":"GET"}}'}
        """
    },
    {
        "role": "assistant",
        "content": """
            Sure, let's create a Redux state-managed React component to list all the organization's custom fields in a tabular format. 
            We'll follow the instructions and examples provided to ensure we adhere to the required standards.

            I will create the file contents in the following order:
            1. api.js
            2. constants.js
            3. actions.js
            4. reducer.js
            5. selectors.js
            6. saga.js
            7. style.js
            8. Component file
            9. Loadable.js
            10. index.js
            11. routes.js
            12. mfe-exposed-components.js

            ### Step 1: Create the API call in `api.js`
            ```javascript
            // api.js
            import { apiCaller } from '@capillarytech/vulcan-react-sdk/utils';
            import endpoints from '../config/endpoints';
            import * as requestConstructor from './requestConstructor';

            const { getVulcanAPICallObject } = requestConstructor;

            function redirectIfUnauthenticated(response) {
              const { removeAuthenticationDetais } = require('../utils/authWrapper');
              const isUnauthorized = response.status === 401;
              const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
              const isAuthUserCall =
                response.url.split('auth')[1] &&
                response.url.split('auth')[1].split('?')[0] === '/user';
              if (isUnauthorized) {
                if (isLoginPage && isAuthUserCall) return;
                removeAuthenticationDetais();
              }
            }

            const httpRequest = apiCaller.initializeApiCaller({redirectIfUnauthenticated});

            export const fetchCustomFields = async (payload = {}) => {
              // extract data from payload like const { name } = payload; and append it to the API URL
              const url = `${endpoints.vulcan_endpoint}/v2/organization/customFields`;
              return httpRequest(url, getVulcanAPICallObject('GET'));
            };
            ```

            ### Step 2: Define constants in `constants.js`
            ```javascript
            // constants.js
            import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils';

            const scope = "/Components/pages/CustomFieldsList/";

            export const actionTypes = defineActionTypes(
              {
                CLEAR_DATA: "CLEAR_DATA",
                FETCH_CUSTOM_FIELDS: "FETCH_CUSTOM_FIELDS",
                FETCH_CUSTOM_FIELDS_SUCCESS: "FETCH_CUSTOM_FIELDS_SUCCESS",
                FETCH_CUSTOM_FIELDS_FAILURE: "FETCH_CUSTOM_FIELDS_FAILURE",
              },
              { prefix: CURRENT_APP_NAME, scope: scope },
            );
            ```

            ### Step 3: Create actions in `actions.js`
            ```javascript
            // actions.js
            import { actionTypes } from './constants';

            export const clearData = () => ({
              type: actionTypes.CLEAR_DATA,
            });

            export const fetchCustomFields = (payload) => ({
              type: actionTypes.FETCH_CUSTOM_FIELDS,
              payload,
            });

            export const fetchCustomFieldsSuccess = data => ({
              type: actionTypes.FETCH_CUSTOM_FIELDS_SUCCESS,
              data: data,
            });

            export const fetchCustomFieldsFailure = error => ({
              type: actionTypes.FETCH_CUSTOM_FIELDS_FAILURE,
              error: error,
            });
            ```

            ### Step 4: Create the reducer in `reducer.js`
            ```javascript
            // reducer.js
            import { fromJS } from 'immutable';
            import { actionTypes } from './constants';

            const initialState = fromJS({
              customFields: {
                fetching: false,
                data: [],
                error: null,
              },
            });

            const customFieldsReducer = (state = initialState, action) => {
              switch (action.type) {
                case actionTypes.CLEAR_DATA:
                  return state.set('customFields', initialState);
                case actionTypes.FETCH_CUSTOM_FIELDS:
                  return state.set('customFields', fromJS({ fetching: true, data: [], error: null }));
                case actionTypes.FETCH_CUSTOM_FIELDS_SUCCESS:
                  return state.set('customFields', fromJS({ fetching: false, data: action.data, error: null }));
                case actionTypes.FETCH_CUSTOM_FIELDS_FAILURE:
                  return state.set('customFields', fromJS({ fetching: false, data: [], error: action.error }));
                default:
                  return state;
              }
            };

            export default customFieldsReducer;
            ```

            ### Step 5: Create selectors in `selectors.js`
            ```javascript
            // selectors.js
            import { createSelector } from 'reselect';
            import { fromJS } from 'immutable';
            import { initialState } from './reducer';

            const selectDomain = (state = fromJS({})) =>
              state.get(`${CURRENT_APP_NAME}_customFieldsListReducer`, initialState);

            const makeSelectCustomFields = () =>
              createSelector(selectDomain, (substate = fromJS({})) =>
                substate.toJS().customFields,
            );

            export {
              makeSelectCustomFields,
            };
            ```

            ### Step 6: Create the saga in `saga.js`
            ```javascript
            // saga.js
            import { call, put, takeLatest, all } from 'redux-saga/effects';
            import { actionTypes } from './constants';
            import * as actions from './actions';
            import * as Api from '../../../services/api';

            function* fetchCustomFields({ payload }) {
              try {
                const response = yield call(Api.fetchCustomFields, payload);
                yield put(actions.fetchCustomFieldsSuccess(response));
              } catch (error) {
                yield put(actions.fetchCustomFieldsFailure(error));
              }
            }

            function* watchFetchCustomFields() {
              yield takeLatest(actionTypes.FETCH_CUSTOM_FIELDS, fetchCustomFields);
            }

            export default function* customFieldsSaga() {
              yield all([
                watchFetchCustomFields(),
              ]);
            }
            ```

            ### Step 7: Create the style in `style.js`
            ```javascript
            // style.js
            import { css } from 'styled-components';

            export default css`
              .custom-fields-list-table {
                width: 100%;
              }
            `;
            ```

            ### Step 8: Create the main component file
            ```javascript
            // CustomFieldsList.js
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { injectIntl, intlShape } from 'react-intl';
            import PropTypes from 'prop-types';
            import { createStructuredSelector } from 'reselect';
            import { connect } from 'react-redux';
            import { CapTable, CapSpin, CapHeading, CapRow, CapColumn } from '@capillarytech/cap-ui-library';
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            import style from './style';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectCustomFields } from './selectors';
            import PageTemplate from '../../templates/PageTemplate';

            const CustomFieldsList = ({ className, customFields, actions, intl }) => {
              const { data, fetching } = customFields;
              const [pagination, setPagination] = useState({
                current: 1,
                pageSize: 10,
                onChange: (current, pageSize) => setPagination({ current, pageSize }),
              });

              useEffect(() => {
                actions.fetchCustomFields();
              }, []);

              const getCustomFieldsTableColumns = () => {
                const columns = [
                  { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                  { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                  { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                  { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                  { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                  { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                  { dataIndex: 'phase', key: 'phase', title: <CapHeading type="h5">Phase</CapHeading> },
                  { dataIndex: 'isDisabled', key: 'isDisabled', title: <CapHeading type="h5">Disabled</CapHeading> },
                  { dataIndex: 'isUpdatable', key: 'isUpdatable', title: <CapHeading type="h5">Updatable</CapHeading> },
                  { dataIndex: 'isPiiData', key: 'isPiiData', title: <CapHeading type="h5">PII Data</CapHeading> },
                  { dataIndex: 'isPsiData', key: 'isPsiData', title: <CapHeading type="h5">PSI Data</CapHeading> },
                ];
                const columnWidth = `${Math.floor(100 / columns.length)}%`;
                return columns.map(column => ({
                  ...column,
                  width: columnWidth,
                }));
              };

              return (
                <div className={className}>
                  <PageTemplate>
                    <CapRow>
                      <CapColumn span={24}>
                        <CapHeading type="h2">Organization's Custom Fields</CapHeading>
                      </CapColumn>
                    </CapRow>
                    <CapRow>
                      <CapColumn span={24}>
                        <CapSpin spinning={fetching}>
                          <CapTable
                            className="custom-fields-list-table"
                            columns={getCustomFieldsTableColumns()}
                            dataSource={data}
                            rowKey="id"
                            rowSelection={null}
                            identifier="customFieldsList"
                            pagination={pagination}
                            scroll={{ y: 500 }}
                            infinteScroll={false}
                            showLoader={false}
                            rowClassName="custom-fields-row"
                          />
                        </CapSpin>
                      </CapColumn>
                    </CapRow>
                  </PageTemplate>
                </div>
              );
            };

            CustomFieldsList.propTypes = {
              customFields: PropTypes.object.isRequired,
              actions: PropTypes.object.isRequired,
              intl: intlShape.isRequired,
            };

            const mapStateToProps = createStructuredSelector({
              customFields: makeSelectCustomFields(),
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

            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}_customFieldsListSaga`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_customFieldsListReducer`, reducer });

            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(
              injectIntl(withStyles(clearDataOnUnmount(CustomFieldsList, "clearData"), style))
            );
            ```

            ### Step 9: Create Loadable.js
            ```javascript
            // Loadable.js
            import React, { Suspense } from 'react';
            import { loadable } from '@capillarytech/cap-ui-utils';
            import CapSpin from '@capillarytech/cap-ui-library/CapSpin';

            const LoadableComponent = loadable(() => import('./CustomFieldsList'));

            export default () => (
              <Suspense fallback={<CapSpin />}>
                <LoadableComponent />
              </Suspense>
            );
            ```

            ### Step 10: Create index.js
            ```javascript
            // index.js
            import { withCustomAuthAndTranslations } from '@capillarytech/vulcan-react-sdk/utils';
            import LoadableComponent from './Loadable';

            export default withCustomAuthAndTranslations(LoadableComponent);
            ```

            ### Step 11: Add entry in routes.js
            ```javascript
            // routes.js
            import { lazy } from 'react';
            const CustomFields = lazy(() => import('../CustomFields/Loadable'));

            const routes = [
              {
                path: `/custom-fields`,
                component: CustomFields,
              },
              {
                exact: true,
                path: `/accessForbidden`,
                component: lazy(() => import('@capillarytech/vulcan-react-sdk/components/AccessForbidden')),
              },
              {
                exact: true,
                path: `/*`,
                component: Dashboard,
              }
            ];

            export default routes;
            ```

            ### Step 12: Add entry in mfe-exposed-components.js
            ```javascript
            // mfe-exposed-components.js
            module.exports = {
              './CustomFieldsList': './app/components/pages/CustomFields',
            };
            ```
        """
    }
]

chat_history = [
    {
        "role": "user",
        "content": """
            Create a simple react component to list all the organization's extended fields in a tabular format. Do not add actions on the rows. 
            Consider that the extended fields data is coming to the component as a prop with data(list) and loading (boolean) attributes.
            Keep 15 rows per page and select 3rd page by default. 
            Refer to the below extended field entity schema:
            {\"entity\":{\"name\":{\"type\":\"string\",\"defaultValue\":\"\"},\"type\":{\"type\":\"string\",\"defaultValue\":\"\"},\"dataType\":{\"type\":\"enum\",\"defaultValue\":\"\",\"uiType\":\"dropdown\",\"possibleValues\":[\"boolean\",\"integer\",\"string\",\"enum\"]},\"label\":{\"type\":\"string\",\"defaultValue\":\"\"},\"scope\":{\"type\":\"string\",\"defaultValue\":\"\"},\"defaultValue\":{\"type\":\"string\",\"defaultValue\":\"\"},\"isDisabled\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isUpdatable\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"enableAuditTrail\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isPiiData\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"},\"isPsiData\":{\"type\":\"boolean\",\"defaultValue\":false,\"uiType\":\"checkbox\"}}}
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useState } from 'react';
            import { CapTable, CapRow, CapColumn, CapHeading, CapSpin } from '@capillarytech/cap-ui-library';
            import PropTypes from 'prop-types';

            const ExtendedFieldsTable = ({ data, loading }) => {
                const [pagination, setPagination] = useState({ 
                  pageSize: 15, // based on user input, limit of records per page
                  current: 3, // based on user input, page selected by default
                  onChange: (current, pageSize) => setPagination({ current, pageSize }),
                });
                
                const getExtendedFieldsTableColumns = () => {
                    return [
                        { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                        { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                        { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                        { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                        { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                        { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                        { dataIndex: 'isDisabled', key: 'isDisabled', title: <CapHeading type="h5">Disabled</CapHeading> },
                        { dataIndex: 'isUpdatable', key: 'isUpdatable', title: <CapHeading type="h5">Updatable</CapHeading> },
                        { dataIndex: 'enableAuditTrail', key: 'enableAuditTrail', title: <CapHeading type="h5">Audit Trail</CapHeading> },
                        { dataIndex: 'isPiiData', key: 'isPiiData', title: <CapHeading type="h5">PII Data</CapHeading> },
                        { dataIndex: 'isPsiData', key: 'isPsiData', title: <CapHeading type="h5">PSI Data</CapHeading> },
                    ];
                };

                return (
                    <CapRow>
                        <CapColumn span={24}>
                            <CapHeading type="h2">Organization's Extended Fields</CapHeading>
                        </CapColumn>
                        <CapColumn span={24}>
                            <CapSpin spinning={loading}>
                                <CapTable
                                    className="extended-fields-table"
                                    columns={getExtendedFieldsTableColumns()}
                                    dataSource={data}
                                    rowKey="id" // Assuming 'id' is the unique key for each extended field
                                    rowSelection={null}
                                    identifier="extendedFieldsTable"
                                    pagination={pagination}
                                    scroll={{ y: 500 }}
                                    infinteScroll={false}
                                    showLoader={false}
                                    rowClassName="extended-fields-row"
                                />
                            </CapSpin>
                        </CapColumn>
                    </CapRow>
                );
            };

            ExtendedFieldsTable.propTypes = {
                data: PropTypes.array.isRequired,
                loading: PropTypes.bool.isRequired,
            };

            export default ExtendedFieldsTable;
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to capture customer information and make an API call to save the customer details to server from the below specs:
            {
              "entity": {
                "title": {
                  "type": "enum",
                  "defaultValue": "mr",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "mr",
                    "mrs",
                    "ms",
                    "others"
                  ]
                },
                "firstName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "middleName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "lastName": {
                  "type": "string",
                  "defaultValue": ""
                },
                "dob": {
                  "type": "date",
                  "defaultValue": "current_date"
                },
                "gender": {
                  "type": "enum",
                  "defaultValue": "male",
                  "uiType": "radio",
                  "possibleValues": [
                    "male",
                    "female",
                    "others"
                  ]
                },
                "mobile": {
                  "type": "string",
                  "defaultValue": ""
                },
                "houseFlatNo": {
                  "type": "string",
                  "defaultValue": ""
                },
                "street": {
                  "type": "string",
                  "defaultValue": ""
                },
                "landmark": {
                  "type": "string",
                  "defaultValue": ""
                },
                "city": {
                  "type": "string",
                  "defaultValue": ""
                },
                "district": {
                  "type": "string",
                  "defaultValue": ""
                },
                "country": {
                  "type": "enum",
                  "defaultValue": "india",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "india",
                    "usa",
                    "uk"
                  ]
                },
                "pincode": {
                  "type": "string",
                  "defaultValue": ""
                },
                "passportNo": {
                  "type": "string",
                  "defaultValue": ""
                },
                "occupation": {
                  "type": "enum",
                  "defaultValue": "service",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "service",
                    "business",
                    "artist",
                    "others"
                  ]
                },
                "parentFFN": {
                  "type": "string",
                  "defaultValue": ""
                },
                "nationality": {
                  "type": "string",
                  "defaultValue": ""
                },
                "passportIssualCountry": {
                  "type": "enum",
                  "defaultValue": "india",
                  "uiType": "dropdown",
                  "possibleValues": [
                    "india",
                    "usa",
                    "uk"
                  ]
                },
                "passportExpiry": {
                  "type": "date",
                  "defaultValue": "current_date"
                }
              },
              "action": {
                  "save": {
                    "api": "/saveCustomer",
                    "method": "POST"
                  }
              }
            }
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useState } from 'react'; // import react
            import { compose, bindActionCreators } from 'redux'; // import action binding utils from redux
            import { injectIntl, intlShape } from 'react-intl'; // import for using i18n in component
            import PropTypes from 'prop-types'; // import proptypes for definition
            import { createStructuredSelector } from 'reselect';
            import { connect } from 'react-redux'; // import connect for redux
            import moment from 'moment';

            // import capillary react sdk utils
            import { injectSaga,injectReducer,clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';

            // import style, actions, constants, saga, reducers and selectors
            import style from './style';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectCustomerInformation } from './selectors';

            import PageTemplate from '../../templates/PageTemplate';

            // import capillary UI library components
            import { CapRow, CapColumn, CapInput, CapSelect, CapRadioGroup, CapDatePicker, CapButton, CapHeading, CapLabel } from '@capillarytech/cap-ui-library';

            export const CustomerInformationForm = ({
              className,
              customerInformation,
              actions,
              intl,
            }) => {
              const [customerData, setCustomerData] = useState({
                  title: 'mr',
                  firstName: '',
                  middleName: '',
                  lastName: '',
                  dob: moment(),
                  gender: 'male',
                  mobile: '',
                  houseFlatNo: '',
                  street: '',
                  landmark: '',
                  city: '',
                  district: '',
                  country: 'india',
                  pincode: '',
                  passportNo: '',
                  occupation: 'service',
                  parentFFN: '',
                  nationality: '',
                  passportIssualCountry: 'india',
                  passportExpiry: moment(),
              });

              const handleSaveCustomer = () => {
               // make actions call on CTA click
                actions.saveCustomerData(customerData);
              };

              return (
              <div className={className}>
                  <PageTemplate>
                      <CapRow>
                          <CapColumn span={24}>
                              <CapHeading type="h2">Customer Information</CapHeading>
                          </CapColumn>
                      </CapRow>
                      <CapRow>
                          <CapColumn span={24}>
                              <CapSelect
                                  label={<CapLabel type="label2" style={{textAlign: 'left'}}>Title</CapLabel>}
                                  options={[
                                      { value: 'mr', label: 'Mr' },
                                      { value: 'mrs', label: 'Mrs' },
                                      { value: 'ms', label: 'Ms' },
                                      { value: 'others', label: 'Others' }
                                  ]}
                                  value={customerData.title}
                                  onChange={(value) => setCustomerData({ ...customerData, title: value })}
                              />
                          </CapColumn>
                          <CapColumn span={24}>
                              <CapInput
                                  label={<CapLabel type="label2" style={{textAlign: 'left'}}>First Name</CapLabel>}
                                  value={customerData.firstName}
                                  onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                              />
                          </CapColumn>
                          <CapColumn span={24}>
                              <CapInput
                                  label={<CapLabel type="label2" style={{textAlign: 'left'}}>Last Name</CapLabel>}
                                  value={customerData.lastName}
                                  onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                              />
                          </CapColumn>
                      </CapRow>
                      {/* Add fields as per the specifications in schema */}
                      <CapButton
                          className="save-button"
                          type="primary"
                          onClick={handleSaveCustomer}
                      >
                          Save Customer
                      </CapButton>
                  </PageTemplate>
              </div>
              );
            };

            // define component prop types
            CustomerInformationForm.propTypes = {
              customerInformation: PropTypes.object,
              actions: PropTypes.object,
              intl: intlShape.isRequired,
            };

            // create props from redux state
            const mapStateToProps = createStructuredSelector({
              customerInformation: makeSelectCustomerInformation()
            });

            // map actions to props
            function mapDispatchToProps(dispatch) {
              return {
                actions: bindActionCreators(actions, dispatch),
              };
            }

            const withConnect = connect(
              mapStateToProps,
              mapDispatchToProps,
            );

            // inject saga and reducer
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}-customerInformation`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}-customerInformation`, reducer });

            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(
              injectIntl(withStyles(clearDataOnUnmount(CustomerInformationForm, "clearData"), style))
            );
        """
    },
    {
        "role": "user",
        "content": """
            Create a redux state managed react component to list all the organization\'s custom fields in a tabular format. 
            Refer to the below custom field entity schema:
            {"entity":{"name":{"type":"string","defaultValue":""},"type":{"type":"string","defaultValue":""},"dataType":{"type":"enum","defaultValue":"","uiType":"dropdown","possibleValues":["boolean","integer","string","enum"]},"label":{"type":"string","defaultValue":""},"scope":{"type":"string","defaultValue":""},"defaultValue":{"type":"string","defaultValue":""},"phase":{"type":"string","defaultValue":""},"isDisabled":{"type":"boolean","defaultValue":false,"uiType":"checkbox"},"isUpdatable":{"type":"boolean","defaultValue":false,"uiType":"checkbox"},"isPiiData":{"type":"boolean","defaultValue":false,"uiType":"checkbox"},"isPsiData":{"type":"boolean","defaultValue":false,"uiType":"checkbox"}},"action":{"api":"/v2/organization/customFields","method":"GET"}}'}
        """
    },
    {
        "role": "assistant",
        "content": """
            Sure, let's create a Redux state-managed React component to list all the organization's custom fields in a tabular format. 
            We'll follow the instructions and examples provided to ensure we adhere to the required standards.
            
            I will create the file contents in the following order:
            1. api.js
            2. constants.js
            3. actions.js
            4. reducer.js
            5. selectors.js
            6. saga.js
            7. style.js
            8. Component file
            9. Loadable.js
            10. index.js
            11. routes.js
            12. mfe-exposed-components.js

            ### Step 1: Create the API call in `api.js`
            ```javascript
            // api.js
            import { apiCaller } from '@capillarytech/vulcan-react-sdk/utils';
            import endpoints from '../config/endpoints';
            import * as requestConstructor from './requestConstructor';
            
            const { getVulcanAPICallObject } = requestConstructor;
            
            function redirectIfUnauthenticated(response) {
              const { removeAuthenticationDetais } = require('../utils/authWrapper');
              const isUnauthorized = response.status === 401;
              const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
              const isAuthUserCall =
                response.url.split('auth')[1] &&
                response.url.split('auth')[1].split('?')[0] === '/user';
              if (isUnauthorized) {
                if (isLoginPage && isAuthUserCall) return;
                removeAuthenticationDetais();
              }
            }
            
            const httpRequest = apiCaller.initializeApiCaller({redirectIfUnauthenticated});
            
            export const fetchCustomFields = async (payload = {}) => {
              // extract data from payload like const { name } = payload; and append it to the API URL
              const url = `${endpoints.vulcan_endpoint}/v2/organization/customFields`;
              return httpRequest(url, getVulcanAPICallObject('GET'));
            };
            ```
            
            ### Step 2: Define constants in `constants.js`
            ```javascript
            // constants.js
            import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils';
            
            const scope = "/Components/pages/CustomFieldsList/";
            
            export const actionTypes = defineActionTypes(
              {
                CLEAR_DATA: "CLEAR_DATA",
                FETCH_CUSTOM_FIELDS: "FETCH_CUSTOM_FIELDS",
                FETCH_CUSTOM_FIELDS_SUCCESS: "FETCH_CUSTOM_FIELDS_SUCCESS",
                FETCH_CUSTOM_FIELDS_FAILURE: "FETCH_CUSTOM_FIELDS_FAILURE",
              },
              { prefix: CURRENT_APP_NAME, scope: scope },
            );
            ```
            
            ### Step 3: Create actions in `actions.js`
            ```javascript
            // actions.js
            import { actionTypes } from './constants';
            
            export const clearData = () => ({
              type: actionTypes.CLEAR_DATA,
            });
            
            export const fetchCustomFields = (payload) => ({
              type: actionTypes.FETCH_CUSTOM_FIELDS,
              payload,
            });
            
            export const fetchCustomFieldsSuccess = data => ({
              type: actionTypes.FETCH_CUSTOM_FIELDS_SUCCESS,
              data: data,
            });
            
            export const fetchCustomFieldsFailure = error => ({
              type: actionTypes.FETCH_CUSTOM_FIELDS_FAILURE,
              error: error,
            });
            ```
            
            ### Step 4: Create the reducer in `reducer.js`
            ```javascript
            // reducer.js
            import { fromJS } from 'immutable';
            import { actionTypes } from './constants';
            
            const initialState = fromJS({
              customFields: {
                fetching: false,
                data: [],
                error: null,
              },
            });
            
            const customFieldsReducer = (state = initialState, action) => {
              switch (action.type) {
                case actionTypes.CLEAR_DATA:
                  return state.set('customFields', initialState);
                case actionTypes.FETCH_CUSTOM_FIELDS:
                  return state.set('customFields', fromJS({ fetching: true, data: [], error: null }));
                case actionTypes.FETCH_CUSTOM_FIELDS_SUCCESS:
                  return state.set('customFields', fromJS({ fetching: false, data: action.data, error: null }));
                case actionTypes.FETCH_CUSTOM_FIELDS_FAILURE:
                  return state.set('customFields', fromJS({ fetching: false, data: [], error: action.error }));
                default:
                  return state;
              }
            };
            
            export default customFieldsReducer;
            ```
            
            ### Step 5: Create selectors in `selectors.js`
            ```javascript
            // selectors.js
            import { createSelector } from 'reselect';
            import { fromJS } from 'immutable';
            import { initialState } from './reducer';
            
            const selectDomain = (state = fromJS({})) =>
              state.get(`${CURRENT_APP_NAME}_customFieldsListReducer`, initialState);
            
            const makeSelectCustomFields = () =>
              createSelector(selectDomain, (substate = fromJS({})) =>
                substate.toJS().customFields,
            );
            
            export {
              makeSelectCustomFields,
            };
            ```
            
            ### Step 6: Create the saga in `saga.js`
            ```javascript
            // saga.js
            import { call, put, takeLatest, all } from 'redux-saga/effects';
            import { actionTypes } from './constants';
            import * as actions from './actions';
            import * as Api from '../../../services/api';
            
            function* fetchCustomFields({ payload }) {
              try {
                const response = yield call(Api.fetchCustomFields, payload);
                yield put(actions.fetchCustomFieldsSuccess(response));
              } catch (error) {
                yield put(actions.fetchCustomFieldsFailure(error));
              }
            }
            
            function* watchFetchCustomFields() {
              yield takeLatest(actionTypes.FETCH_CUSTOM_FIELDS, fetchCustomFields);
            }
            
            export default function* customFieldsSaga() {
              yield all([
                watchFetchCustomFields(),
              ]);
            }
            ```
            
            ### Step 7: Create the style in `style.js`
            ```javascript
            // style.js
            import { css } from 'styled-components';
            
            export default css`
              .custom-fields-list-table {
                width: 100%;
              }
            `;
            ```
            
            ### Step 8: Create the main component file
            ```javascript
            // CustomFieldsList.js
            import React, { useEffect, useState } from 'react';
            import { compose, bindActionCreators } from 'redux';
            import { injectIntl, intlShape } from 'react-intl';
            import PropTypes from 'prop-types';
            import { createStructuredSelector } from 'reselect';
            import { connect } from 'react-redux';
            import { CapTable, CapSpin, CapHeading, CapRow, CapColumn } from '@capillarytech/cap-ui-library';
            import { injectSaga, injectReducer, clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
            import style from './style';
            import * as actions from './actions';
            import * as constants from './constants';
            import saga from './saga';
            import reducer from './reducer';
            import { makeSelectCustomFields } from './selectors';
            import PageTemplate from '../../templates/PageTemplate';
            
            const CustomFieldsList = ({ className, customFields, actions, intl }) => {
              const { data, fetching } = customFields;
              const [pagination, setPagination] = useState({
                current: 1,
                pageSize: 10,
                onChange: (current, pageSize) => setPagination({ current, pageSize }),
              });
            
              useEffect(() => {
                actions.fetchCustomFields();
              }, []);
            
              const getCustomFieldsTableColumns = () => {
                const columns = [
                  { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                  { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                  { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                  { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                  { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                  { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                  { dataIndex: 'phase', key: 'phase', title: <CapHeading type="h5">Phase</CapHeading> },
                  { dataIndex: 'isDisabled', key: 'isDisabled', title: <CapHeading type="h5">Disabled</CapHeading> },
                  { dataIndex: 'isUpdatable', key: 'isUpdatable', title: <CapHeading type="h5">Updatable</CapHeading> },
                  { dataIndex: 'isPiiData', key: 'isPiiData', title: <CapHeading type="h5">PII Data</CapHeading> },
                  { dataIndex: 'isPsiData', key: 'isPsiData', title: <CapHeading type="h5">PSI Data</CapHeading> },
                ];
                const columnWidth = `${Math.floor(100 / columns.length)}%`;
                return columns.map(column => ({
                  ...column,
                  width: columnWidth,
                }));
              };
            
              return (
                <div className={className}>
                  <PageTemplate>
                    <CapRow>
                      <CapColumn span={24}>
                        <CapHeading type="h2">Organization's Custom Fields</CapHeading>
                      </CapColumn>
                    </CapRow>
                    <CapRow>
                      <CapColumn span={24}>
                        <CapSpin spinning={fetching}>
                          <CapTable
                            className="custom-fields-list-table"
                            columns={getCustomFieldsTableColumns()}
                            dataSource={data}
                            rowKey="id"
                            rowSelection={null}
                            identifier="customFieldsList"
                            pagination={pagination}
                            scroll={{ y: 500 }}
                            infinteScroll={false}
                            showLoader={false}
                            rowClassName="custom-fields-row"
                          />
                        </CapSpin>
                      </CapColumn>
                    </CapRow>
                  </PageTemplate>
                </div>
              );
            };
            
            CustomFieldsList.propTypes = {
              customFields: PropTypes.object.isRequired,
              actions: PropTypes.object.isRequired,
              intl: intlShape.isRequired,
            };
            
            const mapStateToProps = createStructuredSelector({
              customFields: makeSelectCustomFields(),
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
            
            const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}_customFieldsListSaga`, saga, mode: sagaInjectorTypes.DAEMON });
            const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_customFieldsListReducer`, reducer });
            
            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(
              injectIntl(withStyles(clearDataOnUnmount(CustomFieldsList, "clearData"), style))
            );
            ```
            
            ### Step 9: Create Loadable.js
            ```javascript
            // Loadable.js
            import React, { Suspense } from 'react';
            import { loadable } from '@capillarytech/cap-ui-utils';
            import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
            
            const LoadableComponent = loadable(() => import('./CustomFieldsList'));
            
            export default () => (
              <Suspense fallback={<CapSpin />}>
                <LoadableComponent />
              </Suspense>
            );
            ```
            
            ### Step 10: Create index.js
            ```javascript
            // index.js
            import { withCustomAuthAndTranslations } from '@capillarytech/vulcan-react-sdk/utils';
            import LoadableComponent from './Loadable';
            
            export default withCustomAuthAndTranslations(LoadableComponent);
            ```
            
            ### Step 11: Add entry in routes.js
            ```javascript
            // routes.js
            import { lazy } from 'react';
            const CustomFields = lazy(() => import('../CustomFields/Loadable'));
            
            const routes = [
              {
                path: `/custom-fields`,
                component: CustomFields,
              },
              {
                exact: true,
                path: `/accessForbidden`,
                component: lazy(() => import('@capillarytech/vulcan-react-sdk/components/AccessForbidden')),
              },
              {
                exact: true,
                path: `/*`,
                component: Dashboard,
              }
            ];
            
            export default routes;
            ```
            
            ### Step 12: Add entry in mfe-exposed-components.js
            ```javascript
            // mfe-exposed-components.js
            module.exports = {
              './CustomFieldsList': './app/components/pages/CustomFields',
            };
            ```
        """
    }
]

base_instructions = [
    {
        "role": "system",
        "content": """
            You are a an accomplished senior react UI web application developer, who works for Capillary Technologies. 
            Your job is to write React components which follow the capillary UX design for look and feel. 
            There can be 2 types of components:
                1. Redux state-managed React component (Full redux connected component with state management using actions, selectors, reducer, saga and API call, apart from the main component file, style, Loadable and index files)
                2. Simple React component (Just the component file along with its style, Loadable and index files)
            Always carefully read the context and instructions provided to understand the requirements for these UI components.
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN instructions for generating component code ##
            MOST IMPORTANT: [These instructions should be strictly followed while generating the component, treat it as a cheatsheet to help you generate components accurately]
            1. Library “moment” will be imported at the top of the component and used instead of the JavaScript Date class for date fields like “moment()”, do not format the moment object into string
            2. Wrap the entire generated component html inside the <PageTemplate> element imported like “import PageTemplate from ../../templates/PageTemplate” - always import this separately (do not forget this as this will give me the page layout styling)
            2a. Wrap the <PageTemplate> element with `<div className={className}>` where className is received as a prop in the component, this is necessary for withStyles HOC to work in exporting the component along with included styles 
            3. Types of form elements to be replaced with custom UI library elements and their specifications are provided along with ui_library_schema JSON (all these elements should be imported from @capillarytech/cap-ui-library package) - always import this separately
            4. MANDATORY to import all elements matching the pattern /Cap(.*)/ from package "@capillarytech/cap-ui-library".
            5. Generate the entire component carefully, add style attributes to elements where they are specified
            6. For CapRadioGroup element add a new CapColumn inside with a span of 6 to accommodate the field label. This ensures that the label is displayed properly next to the radio buttons
            7. CapDatePicker, CapSelect elements’ onChange event handler function will take “value” parameter and set it to state
            8. CapInput, CapRadioGroup elements’ onChange event handler function will take “event” parameter and set event.target.value to state
            9. For CapRow and CapColumn elements, always remember to apply their required “style” and “span” attributes as per specifications, DO NOT IGNORE THEIR STYLES
            10. Apply any custom styles as per user requirements to the component elements by appending or adding style attributes to the elements
            11. For select dropdown or radio button, first option should be selected by default
            12. For date picker, default selected value should be current date, using "moment()"
            13. All labels should be left aligned and have font size of 14px by default with style attribute,user request can override this
            14. If any HTML element does not match the given specifications of cap-ui-library keep it in HTML format and style it with CSS as per need
            15. options for CapSelect would be of format [{value: "optionValue", label: "optionLabel"}]
            16. options for CapMultiselect would be of format array of elements with id, value, title, key fields for tree data
            17. apply default width 100% on all fields of form types UI
            18. Every section heading will span the entire column with span = 24
            19. Generate the full component with all the fields as requested, DO NOT SKIP any fields mentioned in the spec, generate the entire component in one go instead of incremental generation
            20. Import { compose, bindActionCreators } from 'redux'; // import action binding utils from redux - for redux enabled components
            21. Import { injectIntl, intlShape } from 'react-intl'; // import for using i18n in component, get intl in props of component
            22. import PropTypes from 'prop-types'; // import proptypes for definition
            23. import { createStructuredSelector } from 'reselect'; // for mapping redux state to props of component
            24. import { connect } from 'react-redux'; // import connect for redux
            25. Import capillary react sdk utils { injectSaga,injectReducer,clearDataOnUnmount, sagaInjectorTypes, withStyles } from '@capillarytech/vulcan-react-sdk/utils'; // these are needed for all capillary components
            26. import style, actions, constants, saga, reducers and selectors
                a. import style from './style';
                b. import * as actions from './actions';
                c. import * as constants from './constants';
                d. import saga from './saga';
                e. import reducer from './reducer';
                f. import { makeSelectCustomFields } from './selectors'; // import the selector required for mapping redux state to props of component according to type of component requested
            27. Always use actions call to dispatch action for CTA click / onload of document for listing page requirement
            28. Always include define component prop types section
            29. Always include create props from redux state section in component
            30. Always use map actions to props for component
            31. Attach actions to props and dispatch using bindActionCreators
            32. Always inject saga and reducer for redux state manipulations, always attach CURRENT_APP_NAME to the saga and reducer keys, else they will not be unique in global context when imported
            33. Export of the component should always be like
            export default compose(
              withSaga,
              withReducer,
              withConnect,
            )(
              injectIntl(withStyles(clearDataOnUnmount(<ComponentName>, "clearData"), style))
            );
            34. Always add `endpoints.vulcan_endpoint` to the api URL while making the api call using httpRequest in api.js
            35. In selector functions, state params will always have default value of `fromJS({})` 
            36. Checkboxes do not have label attribute, instead, labels are the content of the Checkbox tags
            37. For tables, generate field title and description from the attributes of the schema
            38. For tables, each column width will be equal to Math.floor(100 / total number of fields), converted to a string with percentage(%) sign appended, ALWAYS append width to the columns of the table 
            39. For tables, row key would be unique field in the schema, preferably some kind of id field
            40. For tables, keep all the columns of the table as the fields in the schema provided, irrespective of the data coming in response of the API
            41. From saga, always call the success and failure from actions object, main API call should be made on Api object, follow the example strictly
            42. Strictly follow examples while generating api.js, saga.js, selectors.js, reducer.js, actions.js, constants.js, Loadable.js, index.js files associated with the main component when redux state managed components are requested
            43. For simple react components, no redux saga related component constructs are needed, it will use data and functions passed to it from props
            44. Redux state managed components will always have `mapStateToProps` and `mapDispatchToProps`, but simple components will not have it
            45. Redux state managed components reading data from API through redux state, should import { data, fetching } from prop variable, fetching is a boolean variable to control CapSpin spinner when API is loading, data will be used to render the data on UI as read only
            46. For actions column, use CapDropdown and CapMenu combination as per example, on both CapMenu and CapDropdown add a onClick handler to stop event propagation so that action item click does not trigger a row click action on the table
            47. For redux state managed components, always strictly adhere to the reducer pattern and do not deviate from it
            48. Default pagination should always be added to the component whenever tables are used. Default limit will be 10 and 1st page selected, pattern of implementation will be same as given in examples
            49. Pagination state variable and its management should be done using useState() from react, so import useState at the beginning of the component
            50. For redux state managed components only, `className` will always be a prop in the component and <div className={className}> will wrap around the entire content [Not needed for simple components]
            51. Complete the implementation by creating all required files in following order:
                a. api.js entry (just the API caller method needed, not full implementation) [Not needed for simple components, needed for redux state-managed components only]
                b. constants.js [Not needed for simple components, needed for redux state-managed components only]
                c. actions.js [Not needed for simple components, needed for redux state-managed components only]
                d. reducer.js [Not needed for simple components, needed for redux state-managed components only]
                e. selectors.js [Not needed for simple components, needed for redux state-managed components only]
                f. saga.js [Not needed for simple components, needed for redux state-managed components only]
                g. style.js [Not needed for simple components, needed for redux state-managed components only]
                h. Component JS file [Needed for both types of components generated]
                i. Loadable.js [Needed for both types of components generated]
                j. index.js [Needed for both types of components generated]
                k. routes.js entry [Not needed for simple components, needed for redux state-managed components only]
                l. mfe-exposed-components.js [Needed for both types of components generated]s
            ## END instructions for generating component code ##
        """
    }
]

component_constructs = [
    {
        "role": "system",
        "content": """
            For Api call to be made from saga.js, you need to create an entry like this in api.js 
            ## BEGIN api.js example - FULL FILE if needed else only provide method to call API ##
            import { apiCaller } from '@capillarytech/vulcan-react-sdk/utils';
            import endpoints from '../config/endpoints';
            import * as requestConstructor from './requestConstructor';
            
            const { getVulcanAPICallObject, getAryaAPICallObject } = requestConstructor;
            
            function redirectIfUnauthenticated(response) {
              const { removeAuthenticationDetais } = require('../utils/authWrapper');
              const isUnauthorized = response.status === 401;
              const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
              const isAuthUserCall =
                response.url.split('auth')[1] &&
                response.url.split('auth')[1].split('?')[0] === '/user';
              if (isUnauthorized) {
                if (isLoginPage && isAuthUserCall) return;
                removeAuthenticationDetais();
              }
            }
            const httpRequest = apiCaller.initializeApiCaller({redirectIfUnauthenticated});
            
              # pattern - `${endpoints.vulcan_endpoint}/intouch/${schema.action.api}` mandatory to attach endpoints.vulcan_endpoint to the API endpoint given for a valid call from UI
              # request is POST / PUT / DELETE, body = data
              # if request method is GET body = undefined
              # options is an object of below structure
              # options: {
              #   type: object,
              #   defaultvalue: {},
              #   desc: 'request constructor options',
              #   fields: {
              #       isFileUpload: {
              #           type: boolean,
              #           defaultvalue: false,
              #           desc: 'required for file upload cases only' 
              #       },
              #       apiConfigs: {
              #           type: object,
              #           defaultvalue: {},
              #           desc: 'required for passing extra headers',
              #           fields: {
              #               headers: {
              #                   type: 'object',
              #                   defaultvalue: {},
              #               }
              #           }
              #       }  
              #   }
              # }
            export const fetchCustomFields = async (data) => {
              const url = `${endpoints.vulcan_endpoint}/intouch/v2/customFields`;
              return httpRequest(url, getVulcanAPICallObject('GET', body, options));
            };
            ## END api.js example - FULL FILE if required ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN Constants example ##
            /* constants.js */ 
            import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils'
            
            const scope = "/Components/pages/CustomFieldsForm/" // this format is name of component + 'Form'
            
            export const actionTypes = defineActionTypes(
              {
                CLEAR_DATA: "CLEAR_DATA",
                FETCH_CUSTOM_FIELDS: "FETCH_CUSTOM_FIELDS",
                FETCH_CUSTOM_FIELDS_SUCCESS: "FETCH_CUSTOM_FIELDS_SUCCESS",
                FETCH_CUSTOM_FIELDS_FAILURE: "FETCH_CUSTOM_FIELDS_FAILURE",
              },
              { prefix: CURRENT_APP_NAME, scope: scope },
            );
            ## END Constants example ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN Actions example ##
            /* actions.js */

            import { actionTypes } from './constants';
            
            export const clearData = () => ({
              type: actionTypes.CLEAR_DATA,
            });

            export const fetchCustomFields = (payload) => ({ // call this from the React component to load data / perform action as mentioned in schema
              type: actionTypes.FETCH_CUSTOM_FIELDS,
              payload: payload,
            });

            export const fetchCustomFieldsSuccess = data => ({
              type: actionTypes.FETCH_CUSTOM_FIELDS_SUCCESS,
              data: data,
            });

            export const fetchCustomFieldsFailure = error => ({
              type: actionTypes.FETCH_CUSTOM_FIELDS_FAILURE,
              error: error,
            });

            ## END Actions example ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN Reducer example ##
            /* reducer.js */
            import { fromJS } from 'immutable';
            import { actionTypes } from './constants';
            
            const initialState = fromJS({
              // define entity details here with initial values for redux state
              customFields: {
                fetching: false,
                data: [], // array since we are fetching list of entities, for single entity it would be an object {}
                error: null,
              },
            });
            // name of reducer is camel case name of component + 'Reducer'
            const customFieldsReducer = (state = initialState, action) => {
              switch (action.type) {
                case actionTypes.CLEAR_DATA:
                  return state.set('customFields', initialState);
                case actionTypes.FETCH_CUSTOM_FIELDS:
                  return state.set('customFields', fromJS({ fetching: true, data: [], error: null }));
                case actionTypes.FETCH_CUSTOM_FIELDS_SUCCESS:
                  return state.set('customFields', fromJS({ fetching: false, data: action.data, error: null }));
                case actionTypes.FETCH_CUSTOM_FIELDS_SUCCESS:
                  return state.set('customFields', fromJS({ fetching: false, data: [], error: action.error }));
                default:
                  return state;
              }
            };
            
            export default customFieldsReducer;
            ## END Reducer example ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN Selectors example ##
            /* selectors.js */ 
            import { createSelector } from 'reselect';
            import { fromJS } from 'immutable';
            import { initialState } from './reducer';
            
            /**
             * Direct selector to the Custom fields state domain
             */
            const selectDomain = (state = fromJS({})) =>
              state.get(`${CURRENT_APP_NAME}_customFieldsListReducer`, initialState);
            const makeSelectCustomFields = () =>
              createSelector(selectDomain, (substate = fromJS({})) =>
                substate.toJS().customFields,
            );
            
            export {
              makeSelectCustomFields,
            };
            ## END Selectors example ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN Saga example ##
            /* saga.js */ 
            import { call, put, takeLatest, cancel, takeEvery } from 'redux-saga/effects';
            import { actionTypes } from './constants';
            import * as actions from './actions';
            import * as Api from '../../../services/api'; // Assuming you have an Api module to make API calls

            // Saga to fetch list of custom fields for a given orgId
            function* fetchCustomFields({ payload }) {
              try {
                // Call the API to fetch custom fields, getCustomFields is the API function
                const response = yield call(Api.fetchCustomFields, payload);
                /* Process response here to prepare the data in required format for component into customFields data */
                // Dispatch success action with custom fields data
                yield put(actions.fetchCustomFieldsSuccess(customFields));
              } catch (error) {
                // Dispatch failure action if there's an error
                yield put(actions.fetchCustomFieldsFailure(error));
              }
            }
            
            // Watcher saga to listen for FETCH_CUSTOM_FIELDS action
            function* watchFetchCustomFields() {
              yield takeLatest(actionTypes.FETCH_CUSTOM_FIELDS, fetchCustomFields);
            }
            
            // Export the saga
            export default function* customFieldsSaga() {
              yield all([
                watchFetchCustomFields(),
                // Add other watcher sagas here if needed
              ]);
            }
            ## END Saga example ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN Style sheet example ##
            /* style.js */ 
            import { css } from 'styled-components';
            /* sample styles for h3 element and children-routes class used in Component code */
            export default css`
              /* left align div of type h2 */ 
              div[type="h2"] {
                text-align: left;
                margin-bottom: 8px;
              }
            `;
            ## END Style sheet example ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN Loadable sheet example ##
            /* Loadable.js */ 
            import React, { Suspense } from 'react';
            import { loadable } from '@capillarytech/cap-ui-utils';
            
            import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
            const LoadableComponent = loadable(() => import('./CustomFieldsList'));
            
            export default () => (
              <Suspense fallback={<CapSpin />}>
                <LoadableComponent />
              </Suspense>
            );
            ## END Loadable sheet example ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN Component index file sheet example ##
            /* index.js */ 
            import { withCustomAuthAndTranslations } from '@capillarytech/vulcan-react-sdk/utils';
            import LoadableComponent from './Loadable';
            export default withCustomAuthAndTranslations(LoadableComponent);
            ## END Component index file sheet example ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN entry in pages/App/routes.js file for newly generated component page ##
            /* routes.js */
            import { lazy } from 'react';
            const CustomFields = lazy(() => import('../CustomFields/Loadable')); // imported Loadable of component for effective code-splitting
            
            const routes = [
              // this will be your New route for generated component
              {
                path: `/custom-fields`,
                component: CustomFields,
              },
              // this will be your Access forbidden page
              {
                exact: true,
                path: `/accessForbidden`,
                component: lazy(() => import('@capillarytech/vulcan-react-sdk/components/AccessForbidden')),
              },
              // this will be your default / home / landing page route
              {
                exact: true,
                path: `/*`,
                component: Dashboard,
              }
            ];
            
            export default routes;
            ## END entry in pages/App/routes.js file for newly generated component page ##
        """
    },
    {
        "role": "system",
        "content": """
            ## BEGIN entry in mfe-exposed-components file for newly generated component page to expose it with webpack module federation ##
            /* mfe-exposed-components.js */
            // This file is used to expose the components of the MFE to the host application
            // Contents of this file are used in webpack config's ModuleFederationPlugin in consumer app.
            //
            module.exports = {
                // which exposes
                // List all components that are needed to be exposed from this app, example:
                './CustomFieldsList': './app/components/pages/CustomFields',
            };
            ## END entry in mfe-exposed-components file ##
        """
    }
]

element_samples = [
    {
        "role": "system",
        "content": """
            ## BEGIN element samples for code generation and HTML tag replacement with capillary UI library elements ##
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Row / Horizontal layout use this markup, also explain the logic for using this component using a comment in the code
            <CapRow className="rowClassName" style={{}}>
                {list of CapColumn elements for given row}
            </CapRow> 
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Column / Vertical layout use this markup, also explain the logic for using this component using a comment in the code
            <CapColumn className="columnClassName" style={{}} span={spanValue}>
                {content of the column, can be any element}
            </CapColumn>
            spanValue is an integer that can range between 1-24 distributed equally depending on number of columns required in the row, formula = Math.floor(24/num_of_columns)
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Input box / Text box use this markup, also explain the logic for using this component using a comment in the code
            <CapInput
              label={<CapLabel type="label2" style={{textAlign: 'left'}}>label</CapLabel>}
              placeholder={placeholderText}
              value={stateVariableValue: string}
              onBlur={onClickOutside event handler function (e) => {do something}}
              onChange={onChange event handler function (e) => {set event.target.value to stateVariableValue}}
              className="inputClassName"
              onPressEnter={onPressEnter event handler function (e) => {do something}}
              disabled={disabled boolean}
              style={}
            />
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Radio group / Radio buttons use this markup, also explain the logic for using this component using a comment in the code
            <CapRadioGroup
                value={stateVariableValue: string}
                onChange={onChange event handler function (e) => {set event.target.value to stateVariableValue}}
                disabled={disabled boolean}
                style={}
            >
                <CapRow>
                  <CapColumn span={spanValue, depends on num of options}>
                    <CapLabel type="label2" style={{textAlign: 'left'}}>label</CapLabel>
                  </CapColumn>
                  <CapColumn span={spanValue}>
                    <CapRadio value="option1">option1</CapRadio>
                  </CapColumn>
                  <CapColumn span={spanValue}>
                    <CapRadio value="option2">option2</CapRadio>
                  </CapColumn>
                  {... rest of the options}
                </CapRow>
            </CapRadioGroup>
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Select / Dropdown use this markup, also explain the logic for using this component using a comment in the code
            <CapSelect
                className={className}
                showArrow={showArrow boolean, display arrow}
                showSearch={showSearch boolean, search feature enable / disable}
                label={<CapLabel type="label2" style={{textAlign: 'left'}}>label</CapLabel>}
                placeholder={placeholder}
                options={options, array like [{value: "optionValue", label: "optionLabel"}], prepare the data from options given in request}
                value={stateVariableValue: string}
                style={}
                onChange={onChange event handler function (value) => {set value to stateVariableValue}}
                disabled={disabled boolean}
            />
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Multiselect / Tree selector use this markup, also explain the logic for using this component using a comment in the code
            <CapMultiSelect
                label={<CapLabel type="label2" style={{textAlign: 'left'}}>label</CapLabel>}
                getPopupContainer={trigger => trigger.parentElement}
                placeholder={placeholderText}
                searchPlaceholder={searchPlaceholderText}
                closeText={closeText}
                selectText={selectText}
                treeData={options array of elements with id, value, title, key fields for tree data, prepare the data from options given in request}
                onSelect={onSelect item event handler function (value) => {set value to stateVariableValue of appliedKeys}}
                appliedKeys={stateVariableValue, list of selected keys from tree data options}
                searchKey={searchKeyText}
            />
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Datepicker / Date use this markup, also explain the logic for using this component using a comment in the code
            <CapDatePicker
              style={}
              label={<CapLabel type="label2" style={{textAlign: 'left'}}>label</CapLabel>}
              value={stateVariableValue: moment object}
              onChange={onChange event handler function (value) => {set value to state variable}}
              placeholder={placeholderText}
              format={dateFormatString}
              disabled={disabled boolean}
            />
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Icons and Symbols use this markup, also explain the logic for using this component using a comment in the code
            <CapIcon
              type={iconType}
              size="s|m|l" [small / medium / large sized icon]
              className={classnames(
                'tooltip-info-icon-select',
                additionalIconClassName,
              )}
            />
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Tooltips use this markup, also explain the logic for using this component using a comment in the code
            <CapTooltip title={tooltipText} placement={tooltipPlacement}>{...children}</CapToolTip>
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Heading / Header / Section heading use this markup, also explain the logic for using this component using a comment in the code
            <CapHeading
                type={one among h1,h2,h3,h4,h5 values}
                className={classnames(
                  className,
                  'truncate-text',
                  'tooltip-criteria-selected-value',
                  additionalClassName,
                )}
            >
                {label / heading value}
            </CapHeading>
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Button / Action button / CTA use this markup, also explain the logic for using this component using a comment in the code
            <CapButton
                className={className}
                type={isDisabled ? 'secondary' : 'primary'}
                disabled={isDisabled}
                onClick={triggerAction handler function ()=>{}}
            >
                {label}
            </CapButton>
        """
    },
    {
        "role": "system",
        "content": """
            For rendering Checkboxes use this markup, also explain the logic for using this component using a comment in the code
            <CapCheckbox
                className={className}
                disabled={isDisabled}
                checked={stateVariableValue: boolean}
                onChange={onChange event handler function () => {toggle value of state variable like field: !prevState.field}}
            >
                {label}
            </CapCheckbox>
        """
    },
    {
        "role": "system",
        "content": """
            For rendering tables, use CapTable component from ui-library, also explain the logic for using this component using a comment in the code
            <CapSpin spinning={loading attribute from props}>
                <CapTable
                    className="custom-fields-list-table"
                    columns={getCustomFieldsTableColumns()}
                    dataSource={getCustomFieldsDataSource()}
                    rowKey={first_field_of_entity | unique key of entity}
                    rowSelection={null}
                    identifier="customFieldsList"
                    pagination={pagination}
                    scroll={{ 
                      y: 500 // height of the table
                    }}
                    infinteScroll={false}
                    showLoader={loading attribute from props}
                    onRow={(record) => ({
                      onMouseEnter: (event) => { /* handle Mouse enter event on row */ },
                      onMouseLeave: (event) => { /* handle Mouse leave event on row */ },
                      onClick: (event) => { /* handle Click event on row */ },
                    })}
                    rowClassName="custom-fields-row"
                />
            </CapSpin>
            For rendering rows and columns, define following functions in the component to be used in the table
            ## BEGIN pseudocode for table config rows and columns generation ##
            ## define pagination on the state inside the component function
            const [pagination, setPagination] = useState({ 
              pageSize: 10, // based on user input, limit of records per page
              current: 1, // based on user input, page selected by default
              onChange: (current, pageSize) => setPagination({ current, pageSize }),
            });
            ## generate columns for table and rows for data source ##
            const handleActionsMenuClick = e => {
                e.stopPropagation();
            }
            const getCustomFieldsTableColumns = () => {
                const columns = [
                    { dataIndex: 'name', key: 'name', title: <CapHeading type="h5">Name</CapHeading> },
                    { dataIndex: 'type', key: 'type', title: <CapHeading type="h5">Type</CapHeading> },
                    { dataIndex: 'dataType', key: 'dataType', title: <CapHeading type="h5">Data Type</CapHeading> },
                    { dataIndex: 'label', key: 'label', title: <CapHeading type="h5">Label</CapHeading> },
                    { dataIndex: 'scope', key: 'scope', title: <CapHeading type="h5">Scope</CapHeading> },
                    { dataIndex: 'defaultValue', key: 'defaultValue', title: <CapHeading type="h5">Default Value</CapHeading> },
                    // add the action column only when requested
                    {
                        dataIndex: 'actions',
                        key: '',
                        title: <CapHeading type="h5">Actions</CapHeading>,
                        render: (text, record) => (
                            <CapDropdown
                                overlay={(
                                    <CapMenu onClick={handleActionsMenuClick}>
                                        <CapMenu.Item key="delete" onClick={() => handleDelete(record)}>Delete</CapMenu.Item>
                                    </CapMenu>
                                )}
                            >
                                <CapIcon type="more" aria-label="Action menu icon" />
                            </CapDropdown>
                        ),
                    },
                ];
                const columnWidth = `${Math.floor(100/columns.length)}%`;
                return columns.map(column => ({
                    ...column,
                    width: columnWidth,
                }));
            };
            const getCustomFieldsDataSource = () => { /* return customFields list JSON data from state variable */ };
            ## END pseudocode for table config rows and columns generation ##
        """
    },
    {
        "role": "system",
        "content": """
            ## END element samples for code generation ##
        """
    }
]