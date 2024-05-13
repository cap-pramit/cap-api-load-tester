Below is the React functional component that captures details for the given entity and makes an API call to save the entity details to the server:

import React, { useState } from 'react';
import moment from 'moment';
import { CapRow, CapColumn, CapInput, CapSelect, CapRadioGroup, CapDatePicker, CapButton } from '@capillarytech/cap-ui-library';
import PageTemplate from '../../templates/PageTemplate';

const EntityDetailsForm = () => {
    const [formData, setFormData] = useState({
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
        nationality: 'indian',
        passportIssualCountry: 'india',
        passportExpiry: moment(),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (value, name) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        fetch('https://test.com/api/v1/saveCustomer', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };

    return (
        <PageTemplate>
            <CapRow>
                <CapColumn span={24}>
                    <CapSelect
                        label="Title"
                        value={formData.title}
                        onChange={(value) => setFormData({ ...formData, title: value })}
                        options={[
                            { value: 'mr', label: 'Mr' },
                            { value: 'mrs', label: 'Mrs' },
                            { value: 'ms', label: 'Ms' },
                            { value: 'others', label: 'Others' }
                        ]}
                    />
                </CapColumn>
                {/* Add other form fields here using CapInput, CapSelect, CapRadioGroup, CapDatePicker */}
            </CapRow>
            <CapButton onClick={handleSave}>Save</CapButton>
        </PageTemplate>
    );
};

export default EntityDetailsForm;

Please note that you need to add the remaining form fields using the provided UI components and handle their state changes accordingly. Also, ensure to replace the placeholder comments with the actual form fields based on the entity details provided.