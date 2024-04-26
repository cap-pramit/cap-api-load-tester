import React, { useState } from 'react';
import moment from 'moment';
import PageTemplate from '../../templates/PageTemplate';
import { CapRow, CapColumn, CapInput, CapSelect, CapRadioGroup, CapRadio, CapDatePicker, CapButton, CapLabel } from '@capillarytech/cap-ui-library';

const CustomerFormPage = ({ saveDataForCustomer }) => {
    const [customerInfo, setCustomerInfo] = useState({
        personalInfo: {
            title: 'mr',
            firstName: '',
            middleName: '',
            lastName: '',
            dob: moment(),
            gender: 'male',
            mobile: ''
        },
        addressInfo: {
            houseNo: '',
            street: '',
            landmark: '',
            city: '',
            district: '',
            country: 'india',
            pincode: ''
        },
        passportInfo: {
            passportNo: '',
            parentFFN: '',
            passportIssualCountry: '',
            passportExpiry: moment()
        }
    });

    const clearForm = () => {
        setCustomerInfo({
            personalInfo: {
                title: 'mr',
                firstName: '',
                middleName: '',
                lastName: '',
                dob: moment(),
                gender: 'male',
                mobile: ''
            },
            addressInfo: {
                houseNo: '',
                street: '',
                landmark: '',
                city: '',
                district: '',
                country: 'india',
                pincode: ''
            },
            passportInfo: {
                passportNo: '',
                parentFFN: '',
                passportIssualCountry: '',
                passportExpiry: moment()
            }
        });
    };

    return (
        <PageTemplate>
            <CapRow>
                <CapColumn span={24}>
                    <CapHeading type="h3">Personal Information</CapHeading>
                </CapColumn>
            </CapRow>
            <CapRow>
                <CapColumn span={8}>
                    <CapSelect
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Title</CapLabel>}
                        options={[{ value: 'mr', label: 'Mr' }, { value: 'mrs', label: 'Mrs' }]}
                        value={customerInfo.personalInfo.title}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, title: value } })}
                        style={{ width: '150px' }}
                    />
                </CapColumn>
                <CapColumn span={8}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>First Name</CapLabel>}
                        value={customerInfo.personalInfo.firstName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, firstName: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={8}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Middle Name</CapLabel>}
                        value={customerInfo.personalInfo.middleName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, middleName: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={8}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Last Name</CapLabel>}
                        value={customerInfo.personalInfo.lastName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, lastName: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={8}>
                    <CapDatePicker
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>DOB</CapLabel>}
                        value={customerInfo.personalInfo.dob}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, dob: value } })}
                        style={{ width: '300px' }}
                    />
                </CapColumn>
                <CapColumn span={8}>
                    <CapRadioGroup
                        value={customerInfo.personalInfo.gender}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, gender: e.target.value } })}
                    >
                        <CapRow>
                            <CapColumn span={8}>
                                <CapLabel type="label2" style={{ textAlign: 'left' }}>Gender</CapLabel>
                            </CapColumn>
                            <CapColumn span={8}>
                                <CapRadio value="male">Male</CapRadio>
                            </CapColumn>
                            <CapColumn span={8}>
                                <CapRadio value="female">Female</CapRadio>
                            </CapColumn>
                            <CapColumn span={8}>
                                <CapRadio value="others">Others</CapRadio>
                            </CapColumn>
                        </CapRow>
                    </CapRadioGroup>
                </CapColumn>
                <CapColumn span={8}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Mobile</CapLabel>}
                        value={customerInfo.personalInfo.mobile}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, mobile: e.target.value } })}
                    />
                </CapColumn>
            </CapRow>

            <CapRow>
                <CapColumn span={24}>
                    <CapHeading type="h3">Address Information</CapHeading>
                </CapColumn>
            </CapRow>
            <CapRow>
                <CapColumn span={24}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>House / Flat No</CapLabel>}
                        value={customerInfo.addressInfo.houseNo}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, addressInfo: { ...customerInfo.addressInfo, houseNo: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={24}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Street</CapLabel>}
                        value={customerInfo.addressInfo.street}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, addressInfo: { ...customerInfo.addressInfo, street: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={24}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Landmark</CapLabel>}
                        value={customerInfo.addressInfo.landmark}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, addressInfo: { ...customerInfo.addressInfo, landmark: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={24}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>City</CapLabel>}
                        value={customerInfo.addressInfo.city}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, addressInfo: { ...customerInfo.addressInfo, city: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={24}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>District</CapLabel>}
                        value={customerInfo.addressInfo.district}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, addressInfo: { ...customerInfo.addressInfo, district: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={24}>
                    <CapSelect
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Country</CapLabel>}
                        options={[{ value: 'india', label: 'India' }, { value: 'us', label: 'US' }, { value: 'uk', label: 'UK' }, { value: 'others', label: 'Others' }]}
                        value={customerInfo.addressInfo.country}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, addressInfo: { ...customerInfo.addressInfo, country: value } })}
                        style={{ width: '200px' }}
                    />
                </CapColumn>
                <CapColumn span={24}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Pincode</CapLabel>}
                        value={customerInfo.addressInfo.pincode}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, addressInfo: { ...customerInfo.addressInfo, pincode: e.target.value } })}
                    />
                </CapColumn>
            </CapRow>

            <CapRow>
                <CapColumn span={24}>
                    <CapHeading type="h3">Passport Information</CapHeading>
                </CapColumn>
            </CapRow>
            <CapRow>
                <CapColumn span={12}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport No</CapLabel>}
                        value={customerInfo.passportInfo.passportNo}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, passportInfo: { ...customerInfo.passportInfo, passportNo: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={12}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Parent FFN</CapLabel>}
                        value={customerInfo.passportInfo.parentFFN}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, passportInfo: { ...customerInfo.passportInfo, parentFFN: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={12}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport Issual Country</CapLabel>}
                        value={customerInfo.passportInfo.passportIssualCountry}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, passportInfo: { ...customerInfo.passportInfo, passportIssualCountry: e.target.value } })}
                    />
                </CapColumn>
                <CapColumn span={12}>
                    <CapDatePicker
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport Expiry</CapLabel>}
                        value={customerInfo.passportInfo.passportExpiry}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, passportInfo: { ...customerInfo.passportInfo, passportExpiry: value } })}
                    />
                </CapColumn>
            </CapRow>

            <CapRow>
                <CapColumn span={12}>
                    <CapButton
                        type="primary"
                        onClick={() => saveDataForCustomer(customerInfo)}
                    >
                        Save
                    </CapButton>
                </CapColumn>
                <CapColumn span={12}>
                    <CapButton
                        type="secondary"
                        onClick={clearForm}
                    >
                        Cancel
                    </CapButton>
                </CapColumn>
            </CapRow>
        </PageTemplate>
    );
};

export default CustomerFormPage;