chat_history = [
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
            Create a simple react component to capture customer information and make an API call to save the customer details to server from the below specs:
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
            import React, { useEffect } from 'react';
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
            
            const ExtendedFieldsTable = ({ extendedFieldsData, actions }) => {
            
              // extract data and fetching status from the props data, taken from redux state via selectors
              const { data, fetching } = extendedFieldsData;
              
              useEffect(() => {
                // always make API call to fetch data in case of redux state managed components by using actions call instead of direct method import / call
                actions.fetchExtendedFields();
              }, []);
            
              ## add this section if actions column is required by user ##
              const handleRowClick = e => {
                e.domEvent.stopPropagation();
              };
              const handleDropdownClick = e => {
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
                ];
                // calculate required column width based on whether actions column is required
                const columnWidth = `${Math.floor(<if actions column is there then 92 else 100>  / columns.length)}%`;
                // attach column widths to the column list
                const finalColumns = columns.map(col => ({
                  ...col,
                  width: columnWidth,
                }));
                ## add this section if actions column is required by user ##
                ## import CapDropdown and CapMenu ##
                ## render all action items required in CapMenu.Item ##
                finalColumns.push({ 
                  dataIndex: '', 
                  key: 'actions', 
                  title: '', 
                  align: 'center', 
                  width: '8%',
                  render: (text, record) => (
                    <CapRow>
                      <CapDropdown onClick={handleDropdownClick} overlay={(
                        <CapMenu onClick={handleRowClick}>
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
                });
                ## end of if actions column is required by user ##
                return finalColumns;
              };
                
              return (
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
                          offset_limit={{
                              limit: 10, // based on user input
                              pageNumber: 0,
                              order: "DESC"
                          }}
                          scroll={{ y: 500 }}
                          infinteScroll={false}
                          showLoader={false}
                          rowClassName="row-class-name"
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
    }
]

chat_history_2 = [
    {
        "role": "user",
        "content": """
            Please use the context and instructions provided to you and write a Capillary specific React component as accurately as possible
            Component name: CustomerFormPage
            Form based UI with the below-mentioned sections to capture a customer’s details in customerInfo object and save that to the server.
            Please prepare all the form data in single level JSON object as it's needed for the API to be called.
            All fields in all the sections are mandatory to be filled up
            
            Sections required in the UI
            1. Personal information -
            
            Specifications:
            a. Row layout with 2 columns in each row, 4px padding on each row, 6px bottom margin
            b. Each column in the rows will have 8px top & bottom padding, 16px left & right padding
            c. Add section heading at top before section fields, heading type h3, color #5E6C84, 20px top margin, 16px left margin, 10px bottom margin, text should be left aligned
            
            Fields:
            a. title (select, options - [mr, mrs], 100% width)
            b. first name (input, 100% width)
            c. middle name (input, 100% width)
            d. last name (input, 100% width)
            e. DOB (date, 100% width)
            f. gender (radio button, options - [male, female, others], row layout with each option coming as a column inside along with the label)
            g. mobile (input, 100% width)
            
            2. Contact information -
            
            Specifications:
            a. Row layout with 1 column in each row, 4px padding on each row, 6px bottom margin
            b. Each column in the rows will have 8px top & bottom padding, 16px left & right padding
            c. Add section heading at top before section fields, heading type h3, color #5E6C84, 20px top margin, 16px left margin, 10px bottom margin, text should be left aligned
            
            Fields:
            a. house / flat no (input, 100% width)
            b. street (input, 100% width)
            c. landmark (input, 100% width)
            d. city (input, 100% width)
            e. district (input, 100% width)
            f. country (select, options - [india, us, uk, others], 100% width)
            g. pincode (input, 100% width)
            
            3. Other information -
            
            Specifications:
            a. Row layout with 2 columns in each row, 4px padding on each row, 6px bottom margin
            b. Each column in the rows will have 8px top & bottom padding, 16px left & right padding
            c. Add section heading at top before section fields, heading type h3, color #5E6C84, 20px top margin, 16px left margin, 10px bottom margin, text should be left aligned
            
            Fields:
            a. passport no (input, 100% width)
            b. occupation (select, options - [artist, banking, business, education, services, others], 100% width)
            c. parent FFN (input, 100% width)
            d. nationality (select, options - [indian, american, british, others], 100% width)
            e. passport issual country (input, 100% width)
            f. passport expiry (date, 100% width)
            
            4. Actions -
            
            Specifications:
            a. Row layout with 1 columns in each row, 4px padding on each row, 6px bottom margin
            b. Each column in the rows will have 8px top & bottom padding, 16px left & right padding
            c. Each field will have 12px left and right margin
            
            Fields:
            a. Save (button, primary, onclick call props method saveDataForCustomer() with the customer info)
            b. Cancel (button, secondary, onclick clear all state data)
        """
    },
    {
        "role": "assistant",
        "content": """
            import React, { useState } from 'react';
            import moment from 'moment';
            // import Page template
            import PageTemplate from '../../templates/PageTemplate';
            // import all capillary UI elements
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
            
                // initialize form data
                const [customerInfo, setCustomerInfo] = useState({
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
                  occupation: 'artist',
                  parentFFN: '',
                  nationality: 'indian',
                  passportIssualCountry: '',
                  passportExpiry: moment()
                });
            
                // call the prop method to save data
                const saveData = () => {
                  // Call API to save customerInfo
                  console.log('Saving customer info:', customerInfo);
                  saveDataForCustomer(customerInfo);
                };
            
                // clear the form
                const clearData = () => {
                    setCustomerInfo({
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
                        occupation: 'artist',
                        parentFFN: '',
                        nationality: 'indian',
                        passportIssualCountry: '',
                        passportExpiry: moment()
                    });
                };
            
                return (
                  <PageTemplate>
                    <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                      <CapColumn span={24}>
                        <CapHeading type="h3" style={{ color: '#5E6C84', marginTop: '20px', marginLeft: '16px', marginBottom: '10px', textAlign: 'left' }}>Personal Information</CapHeading>
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapSelect
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Title</CapLabel>}
                            options={[{ value: 'mr', label: 'Mr' }, { value: 'mrs', label: 'Mrs' }]}
                            value={customerInfo.title}
                            onChange={(value) => setCustomerInfo({ ...customerInfo, title: value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>First Name</CapLabel>}
                            value={customerInfo.firstName}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Middle Name</CapLabel>}
                            value={customerInfo.middleName}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, middleName: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Last Name</CapLabel>}
                            value={customerInfo.lastName}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapDatePicker
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>DOB</CapLabel>}
                            value={customerInfo.dob}
                            onChange={(value) => setCustomerInfo({ ...customerInfo, dob: value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
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
                                <CapRadio value="others">Others</CapRadio>
                            </CapColumn>
                          </CapRow>
                        </CapRadioGroup>
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Mobile</CapLabel>}
                            value={customerInfo.mobile}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, mobile: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                    </CapRow>
            
                    <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                      <CapColumn span={24}>
                        <CapHeading type="h3" style={{ color: '#5E6C84', marginTop: '20px', marginLeft: '16px', marginBottom: '10px', textAlign: 'left' }}>Contact Information</CapHeading>
                      </CapColumn>
                      <CapColumn span={24} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>House / Flat No</CapLabel>}
                            value={customerInfo.houseFlatNo}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, houseFlatNo: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={24} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Street</CapLabel>}
                            value={customerInfo.street}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, street: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={24} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Landmark</CapLabel>}
                            value={customerInfo.landmark}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, landmark: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={24} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>City</CapLabel>}
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={24} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>District</CapLabel>}
                            value={customerInfo.district}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, district: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={24} style={{ padding: '8px 16px' }}>
                        <CapSelect
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Country</CapLabel>}
                            options={[{ value: 'india', label: 'India' }, { value: 'us', label: 'US' }, { value: 'uk', label: 'UK' }, { value: 'others', label: 'Others' }]}
                            value={customerInfo.country}
                            onChange={(value) => setCustomerInfo({ ...customerInfo, country: value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={24} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Pincode</CapLabel>}
                            value={customerInfo.pincode}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                    </CapRow>
            
                    <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                      <CapColumn span={24}>
                        <CapHeading type="h3" style={{ color: '#5E6C84', marginTop: '20px', marginLeft: '16px', marginBottom: '10px', textAlign: 'left' }}>Other Information</CapHeading>
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport No</CapLabel>}
                            value={customerInfo.passportNo}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, passportNo: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapSelect
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Occupation</CapLabel>}
                            options={[{ value: 'artist', label: 'Artist' }, { value: 'banking', label: 'Banking' }, { value: 'business', label: 'Business' }, { value: 'education', label: 'Education' }, { value: 'services', label: 'Services' }, { value: 'others', label: 'Others' }]}
                            value={customerInfo.occupation}
                            onChange={(value) => setCustomerInfo({ ...customerInfo, occupation: value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Parent FFN</CapLabel>}
                            value={customerInfo.parentFFN}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, parentFFN: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapSelect
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Nationality</CapLabel>}
                            options={[{ value: 'indian', label: 'Indian' }, { value: 'american', label: 'American' }, { value: 'british', label: 'British' }, { value: 'others', label: 'Others' }]}
                            value={customerInfo.nationality}
                            onChange={(value) => setCustomerInfo({ ...customerInfo, nationality: value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapInput
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport Issual Country</CapLabel>}
                            value={customerInfo.passportIssualCountry}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, passportIssualCountry: e.target.value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                      <CapColumn span={12} style={{ padding: '8px 16px' }}>
                        <CapDatePicker
                            label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport Expiry</CapLabel>}
                            value={customerInfo.passportExpiry}
                            onChange={(value) => setCustomerInfo({ ...customerInfo, passportExpiry: value })}
                            style={{ width: '100%' }}
                        />
                      </CapColumn>
                    </CapRow>
            
                    <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                      <CapColumn span={24} style={{ padding: '8px 16px' }}>
                        <CapButton
                            type="primary"
                            onClick={saveData}
                            style={{ margin: '0 12px' }}
                        >
                            Save
                        </CapButton>
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
            Please use the context and instructions provided to you and write a Capillary specific React component as accurately as possible
            Component name: CustomerFormPage
            Form based UI with the below-mentioned sections to capture a customer’s details in customerInfo object and save that to the server.
            Please prepare all the form data in single level JSON object as it's needed for the API to be called.
            All fields in all the sections are mandatory to be filled up
            
            Sections required in the UI
            1. Personal information -
            
            Specifications:
            a. Row layout with 4 columns in each row, 6px padding on each row, 8px bottom margin
            b. Each column in the rows will have 4px top & bottom padding, 8px left & right padding
            c. Add section heading at top before section fields, heading type h2, text-align left, color #5E6C84, 20px top margin, 8px left margin, 10px bottom margin, text should be left aligned
            
            Fields:
            a. title (select, options - [mr, mrs, ms], 100% width)
            b. first name (input, 100% width)
            c. middle name (input, 100% width)
            d. last name (input, 100% width)
            e. DOB (date, 100% width)
            f. gender (radio button, options - [male, female, trans, others], row layout with each option coming as a column inside along with the label)
            g. mobile (input, 100% width)
            
            2. Contact information -
            
            Specifications:
            a. Row layout with 2 columns in each row, 10px padding on each row
            b. Each column in the rows will have 8px padding
            c. Add section heading at top before section fields, heading type h2, text-align left, color #b31313, 20px top margin, 8px left margin, 10px bottom margin, text should be left aligned
            
            Fields:
            a. house / flat no (input, 100% width)
            b. street (input, 100% width)
            c. landmark (input, 100% width)
            d. city (input, 100% width)
            e. district (input, 100% width)
            f. country (select, options - [india, us, uk, others], 100% width)
            g. pincode (input, 100% width)
            
            3. Other information -
            
            Specifications:
            a. Row layout with 3 columns in each row, 12px padding on each row
            b. Each column in the rows will have 12px padding
            c. Add section heading at top before section fields, heading type h2, text-align left, color #b31313, 20px top margin, 8px left margin, 10px bottom margin, text should be right aligned
            
            Fields:
            a. passport no (input, 100% width)
            b. occupation (select, options - [artist, banking, business, education, services, others], 100% width)
            c. parent FFN (input, 100% width)
            d. nationality (select, options - [indian, american, british, others], 100% width)
            e. passport issual country (input, 100% width)
            f. passport expiry (date, 100% width)
            
            4. Actions -
            
            Specifications:
            a. Row layout with 6 columns in each row, 4px padding on each row, 6px bottom margin
            b. Each column in the rows will have 8px top & bottom padding, 16px left & right padding
            c. Each field will have 12px left and right margin
            
            Fields:
            a. Save (button, primary, onclick call props method saveDataForCustomer() with the customer info)
            b. Cancel (button, secondary, onclick clear all state data)
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
                    houseFlatNo: '',
                    street: '',
                    landmark: '',
                    city: '',
                    district: '',
                    country: 'india',
                    pincode: '',
                    passportNo: '',
                    occupation: 'artist',
                    parentFFN: '',
                    nationality: 'indian',
                    passportIssualCountry: '',
                    passportExpiry: moment()
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
                        houseFlatNo: '',
                        street: '',
                        landmark: '',
                        city: '',
                        district: '',
                        country: 'india',
                        pincode: '',
                        passportNo: '',
                        occupation: 'artist',
                        parentFFN: '',
                        nationality: 'indian',
                        passportIssualCountry: '',
                        passportExpiry: moment()
                    });
                };
            
                return (
                    <PageTemplate>
                        <CapRow style={{ padding: '6px', marginBottom: '8px' }}>
                            <CapColumn span={24}>
                                <CapHeading type="h2" style={{ color: '#5E6C84', marginTop: '20px', marginLeft: '8px', marginBottom: '10px', textAlign: 'left' }}>Personal Information</CapHeading>
                            </CapColumn>
                            <CapColumn span={6} style={{ padding: '4px 8px' }}>
                                <CapSelect
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Title</CapLabel>}
                                    options={[{ value: 'mr', label: 'Mr' }, { value: 'mrs', label: 'Mrs' }, { value: 'ms', label: 'Ms' }]}
                                    value={customerInfo.title}
                                    onChange={(value) => setCustomerInfo({ ...customerInfo, title: value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={6} style={{ padding: '4px 8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>First Name</CapLabel>}
                                    value={customerInfo.firstName}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={6} style={{ padding: '4px 8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Middle Name</CapLabel>}
                                    value={customerInfo.middleName}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, middleName: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={6} style={{ padding: '4px 8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Last Name</CapLabel>}
                                    value={customerInfo.lastName}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={6} style={{ padding: '4px 8px' }}>
                                <CapDatePicker
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>DOB</CapLabel>}
                                    value={customerInfo.dob}
                                    onChange={(value) => setCustomerInfo({ ...customerInfo, dob: value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={6} style={{ padding: '4px 8px' }}>
                                <CapRadioGroup
                                    value={customerInfo.gender}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, gender: e.target.value })}
                                    style={{ width: '100%' }}
                                >
                                    <CapRow>
                                        <CapColumn span={4}>
                                            <CapLabel type="label2" style={{ textAlign: 'right' }}>Gender</CapLabel>
                                        </CapColumn>
                                        <CapColumn span={4}>
                                            <CapRadio value="male">Male</CapRadio>
                                        </CapColumn>
                                        <CapColumn span={4}>
                                            <CapRadio value="female">Female</CapRadio>
                                        </CapColumn>
                                        <CapColumn span={4}>
                                            <CapRadio value="trans">Trans</CapRadio>
                                        </CapColumn>
                                        <CapColumn span={4}>
                                            <CapRadio value="others">Others</CapRadio>
                                        </CapColumn>
                                    </CapRow>
                                </CapRadioGroup>
                            </CapColumn>
                            <CapColumn span={6} style={{ padding: '4px 8px' }}>
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
                                <CapHeading type="h2" style={{ color: '#b31313', marginTop: '20px', marginLeft: '8px', marginBottom: '10px', textAlign: 'left' }}>Contact Information</CapHeading>
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>House / Flat No</CapLabel>}
                                    value={customerInfo.houseFlatNo}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, houseFlatNo: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Street</CapLabel>}
                                    value={customerInfo.street}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, street: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Landmark</CapLabel>}
                                    value={customerInfo.landmark}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, landmark: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>City</CapLabel>}
                                    value={customerInfo.city}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>District</CapLabel>}
                                    value={customerInfo.district}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, district: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '8px' }}>
                                <CapSelect
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Country</CapLabel>}
                                    options={[{ value: 'india', label: 'India' }, { value: 'us', label: 'US' }, { value: 'uk', label: 'UK' }, { value: 'others', label: 'Others' }]}
                                    value={customerInfo.country}
                                    onChange={(value) => setCustomerInfo({ ...customerInfo, country: value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={12} style={{ padding: '8px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Pincode</CapLabel>}
                                    value={customerInfo.pincode}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                        </CapRow>
            
                        <CapRow style={{ padding: '12px' }}>
                            <CapColumn span={24}>
                                <CapHeading type="h2" style={{ color: '#b31313', marginTop: '20px', marginLeft: '8px', marginBottom: '10px', textAlign: 'left' }}>Other Information</CapHeading>
                            </CapColumn>
                            <CapColumn span={8} style={{ padding: '12px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport No</CapLabel>}
                                    value={customerInfo.passportNo}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, passportNo: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={8} style={{ padding: '12px' }}>
                                <CapSelect
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Occupation</CapLabel>}
                                    options={[{ value: 'artist', label: 'Artist' }, { value: 'banking', label: 'Banking' }, { value: 'business', label: 'Business' }, { value: 'education', label: 'Education' }, { value: 'services', label: 'Services' }, { value: 'others', label: 'Others' }]}
                                    value={customerInfo.occupation}
                                    onChange={(value) => setCustomerInfo({ ...customerInfo, occupation: value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={8} style={{ padding: '12px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Parent FFN</CapLabel>}
                                    value={customerInfo.parentFFN}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, parentFFN: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={8} style={{ padding: '12px' }}>
                                <CapSelect
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Nationality</CapLabel>}
                                    options={[{ value: 'indian', label: 'Indian' }, { value: 'american', label: 'American' }, { value: 'british', label: 'British' }, { value: 'others', label: 'Others' }]}
                                    value={customerInfo.nationality}
                                    onChange={(value) => setCustomerInfo({ ...customerInfo, nationality: value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={8} style={{ padding: '12px' }}>
                                <CapInput
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport Issual Country</CapLabel>}
                                    value={customerInfo.passportIssualCountry}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, passportIssualCountry: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                            <CapColumn span={8} style={{ padding: '12px' }}>
                                <CapDatePicker
                                    label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport Expiry</CapLabel>}
                                    value={customerInfo.passportExpiry}
                                    onChange={(value) => setCustomerInfo({ ...customerInfo, passportExpiry: value })}
                                    style={{ width: '100%' }}
                                />
                            </CapColumn>
                        </CapRow>
            
                        <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                            <CapColumn span={2} style={{ padding: '8px 16px' }}>
                                <CapButton
                                    type="primary"
                                    onClick={saveData}
                                    style={{ margin: '0 12px' }}
                                >
                                    Save
                                </CapButton>
                            </CapColumn>
                            <CapColumn span={2} style={{ padding: '8px 16px' }}>
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
    }
]

base_instructions = [
    {
        "role": "system",
        "content": "You are a an accomplished senior react UI web application developer, who works for Capillary Technologies. Your "
                    "job is to write React functional components which follow the capillary UX design for look and feel. "
                    "Always carefully read the context and instructions provided to understand the requirements for these UI components. "
    },
    {
        "role": "system",
        "content": """
            ## BEGIN instructions for generating component code ##
            MOST IMPORTANT: [These instructions should be strictly followed while generating the component, treat it as a cheatsheet to help you generate components accurately]
            1. Library “moment” will be imported at the top of the component and used instead of the JavaScript Date class for date fields like “moment()”, do not format the moment object into string
            2. Wrap the entire generated component html inside the <PageTemplate> element imported like “import PageTemplate from ../../templates/PageTemplate” - always import this separately (do not forget this as this will give me the page layout styling)
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
            38. For tables, each column width will be equal to Math.floor(100 / total number of fields), converted to a string with percentage(%) sign appended 
            39. For tables, row key would be unique field in the schema, preferably some kind of id field
            40. For tables, keep all the columns of the table as the fields in the schema provided, irrespective of the data coming in response of the API
            41. From saga, always call the success and failure from actions object, main API call should be made on Api object, follow the example strictly
            42. Strictly follow examples while generating api.js, saga.js, selectors.js, reducer.js, actions.js, constants.js, Loadable.js, index.js files associated with the main component when redux state managed components are requested
            43. For simple react components, no redux saga related component constructs are needed, it will use data and functions passed to it from props
            44. Redux state managed components will always have `mapStateToProps` and `mapDispatchToProps`, but simple components will not have it
            45. Redux state managed components reading data from API through redux state, should import { data, fetching } from prop variable, fetching is a boolean variable to control CapSpin spinner when API is loading, data will be used to render the data on UI as read only
            46. For actions column, use CapDropdown and CapMenu combination as per example, on both CapMenu and CapDropdown add a onClick handler to stop event propagation so that action item click does not trigger a row click action on the table
            47. For redux state managed components, always strictly adhere to the reducer pattern and do not deviate from it
            ## END instructions for generating component code ##
        """
    }
]

component_constructs = [
    {
        "role": "system",
        "content": """
            For Api call to be made from saga.js, you need to create an entry like this in api.js 
            `intouch` should be added between vulcan endpoint and actual endpoint from schema to make sure call goes to Intouch API via vulcan
            ## BEGIN entry in app/services/api.js ##
            export const fetchCustomFields = async (data) => {
              const url = `${endpoints.vulcan_endpoint}/intouch/v2/customFields`; // pattern - `${endpoints.vulcan_endpoint}/intouch/${schema.action.api}` mandatory to attach endpoints.vulcan_endpoint to the API endpoint given for a valid call from UI
              return httpRequest(url, getVulcanAPICallObject('GET', data));
            };
            ## End entry in app/services/api.js ##
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
                const response = yield call(Api.getCustomFields, payload);
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
                    offset_limit={{
                      limit: 10, // user can override this from prompt
                      pageNumber: 0,
                      order: "DESC"
                    }}
                    scroll={{ 
                      y: 500 
                    }}
                    infinteScroll={false}
                    showLoader={loading attribute from props}
                    onRow={(record) => ({
                      onMouseEnter: (event) => { /* handle Mouse enter event on row */ },
                      onMouseLeave: (event) => { /* handle Mouse leave event on row */ },
                      onClick: (event) => { /* handle Click event on row */ },
                    })}
                    rowClassName="row-class-name"
                />
            </CapSpin>
            For rendering rows and columns, define following functions in the component to be used in the table
            ## BEGIN pseudocode for table config rows and columns generation ##
            ## generate columns for table and rows for data source ##
            const convertToTitleCase = (str) => {
                const result = str.replace('_', ' ').replace(/([A-Z])/g, " $1");
                return result.charAt(0).toUpperCase() + result.slice(1);
            };
            const getCustomFieldsTableColumns = () => {
                const columns = [
                  { dataIndex: 'name', key: 'name_0', title: <CapHeading type="h5">Name</CapHeading> },
                  { dataIndex: 'type', key: 'type_1', title: <CapHeading type="h5">Field Type</CapHeading> },
                  { dataIndex: 'label', key: 'label_2', title: <CapHeading type="h5">Label</CapHeading> },
                  { dataIndex: 'dataType', key: 'dataType_3', title: <CapHeading type="h5">Data Type</CapHeading> },
                  { dataIndex: 'isMandatory', key: 'isMandatory_4', title: <CapHeading type="h5">Is Mandatory</CapHeading> },
                  { dataIndex: 'isPrimary', key: 'isPrimary_5', title: <CapHeading type="h5">Is Primary</CapHeading> }
                ];
                const columnWidth = `${Math.floor(100 / columns.length)}%`;
                return columns.map(col => ({
                  ...col,
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