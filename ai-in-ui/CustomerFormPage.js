import React, { useState } from 'react';
import moment from 'moment';
import PageTemplate from '../../templates/PageTemplate';
import {
    CapRow,
    CapColumn,
    CapInput,
    CapRadioGroup,
    CapSelect,
    CapDatePicker,
    CapButton,
    CapLabel
} from '@capillarytech/cap-ui-library';

const CustomerFormPage = () => {
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
        contactInfo: {
            houseNo: '',
            street: '',
            landmark: '',
            city: '',
            district: '',
            country: 'india',
            pincode: ''
        },
        otherInfo: {
            passportNo: '',
            occupation: 'artist',
            parentFFN: '',
            nationality: 'indian',
            passportIssualCountry: '',
            passportExpiry: moment()
        }
    });

    const saveDataForCustomer = () => {
        // Call API to save customerInfo
        console.log(customerInfo);
    };

    const clearData = () => {
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
            contactInfo: {
                houseNo: '',
                street: '',
                landmark: '',
                city: '',
                district: '',
                country: 'india',
                pincode: ''
            },
            otherInfo: {
                passportNo: '',
                occupation: 'artist',
                parentFFN: '',
                nationality: 'indian',
                passportIssualCountry: '',
                passportExpiry: moment()
            }
        });
    };

    return (
        <PageTemplate>
            <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                <CapColumn span={24}>
                    <CapHeading type="h3" style={{ color: '#5E6C84', marginTop: '20px', marginLeft: '16px', marginBottom: '10px', textAlign: 'left' }}>
                        Personal Information
                    </CapHeading>
                </CapColumn>
            </CapRow>
            <CapRow style={{ padding: '4px' }}>
                <CapColumn span={12} style={{ padding: '8px' }}>
                    <CapSelect
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>Title</CapLabel>}
                        options={[{ value: 'mr', label: 'Mr' }, { value: 'mrs', label: 'Mrs' }]}
                        value={customerInfo.personalInfo.title}
                        onChange={(value) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, title: value } })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
                <CapColumn span={12} style={{ padding: '8px' }}>
                    <CapInput
                        label={<CapLabel type="label2" style={{ textAlign: 'left' }}>First Name</CapLabel>}
                        value={customerInfo.personalInfo.firstName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, personalInfo: { ...customerInfo.personalInfo, firstName: e.target.value } })}
                        style={{ width: '100%' }}
                    />
                </CapColumn>
            </CapRow>
            {/* Add other personal information fields similarly */}
            
            {/* Contact Information Section */}
            <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                <CapColumn span={24}>
                    <CapHeading type="h3" style={{ color: '#5E6C84', marginTop: '20px', marginLeft: '16px', marginBottom: '10px', textAlign: 'left' }}>
                        Contact Information
                    </CapHeading>
                </CapColumn>
            </CapRow>
            {/* Add contact information fields similarly */}
            
            {/* Other Information Section */}
            <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                <CapColumn span={24}>
                    <CapHeading type="h3" style={{ color: '#5E6C84', marginTop: '20px', marginLeft: '16px', marginBottom: '10px', textAlign: 'left' }}>
                        Other Information
                    </CapHeading>
                </CapColumn>
            </CapRow>
            {/* Add other information fields similarly */}
            
            {/* Actions Section */}
            <CapRow style={{ padding: '4px', marginBottom: '6px' }}>
                <CapColumn span={12} style={{ padding: '8px' }}>
                    <CapButton type="primary" onClick={saveDataForCustomer}>Save</CapButton>
                </CapColumn>
                <CapColumn span={12} style={{ padding: '8px' }}>
                    <CapButton type="secondary" onClick={clearData}>Cancel</CapButton>
                </CapColumn>
            </CapRow>
        </PageTemplate>
    );
};

export default CustomerFormPage;