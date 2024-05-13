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
                <CapColumn span={24} style={{ padding: '10px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Street</CapLabel>}
                        value={customerInfo.street}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, street: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={24} style={{ padding: '10px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Landmark</CapLabel>}
                        value={customerInfo.landmark}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, landmark: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={24} style={{ padding: '10px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>City</CapLabel>}
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={24} style={{ padding: '10px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>District</CapLabel>}
                        value={customerInfo.district}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, district: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={24} style={{ padding: '10px' }}>
                    <CapSelect
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Country</CapLabel>}
                        options={[{ value: 'india', label: 'India' }, { value: 'us', label: 'US' }, { value: 'uk', label: 'UK' }, { value: 'others', label: 'Others' }]}
                        value={customerInfo.country}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, country: value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={24} style={{ padding: '10px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Pincode</CapLabel>}
                        value={customerInfo.pincode}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
            </CapRow>

            <CapRow style={{ padding: '10px' }}>
                <CapColumn span={24}>
                    <CapHeading type="h2" style={{ color: '#5E6C84', marginTop: '10px', marginLeft: '8px', marginBottom: '10px', textAlign: 'left' }}>Other Information</CapHeading>
                </CapColumn>
                <CapColumn span={12} style={{ padding: '10px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport No</CapLabel>}
                        value={customerInfo.passportNo}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, passportNo: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={12} style={{ padding: '10px' }}>
                    <CapSelect
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Occupation</CapLabel>}
                        options={[{ value: 'artist', label: 'Artist' }, { value: 'banking', label: 'Banking' }, { value: 'business', label: 'Business' }, { value: 'education', label: 'Education' }, { value: 'services', label: 'Services' }, { value: 'others', label: 'Others' }]}
                        value={customerInfo.occupation}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, occupation: value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={12} style={{ padding: '10px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Parent FFN</CapLabel>}
                        value={customerInfo.parentFFN}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, parentFFN: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={12} style={{ padding: '10px' }}>
                    <CapSelect
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Nationality</CapLabel>}
                        options={[{ value: 'indian', label: 'Indian' }, { value: 'american', label: 'American' }, { value: 'british', label: 'British' }, { value: 'others', label: 'Others' }]}
                        value={customerInfo.nationality}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, nationality: value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={12} style={{ padding: '10px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport Issual Country</CapLabel>}
                        value={customerInfo.passportIssualCountry}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, passportIssualCountry: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={12} style={{ padding: '10px' }}>
                    <CapDatePicker
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Passport Expiry</CapLabel>}
                        value={customerInfo.passportExpiry}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, passportExpiry: value })}
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