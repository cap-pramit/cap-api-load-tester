import React from 'react';
import PropTypes from 'prop-types';
import { CapHeading, CapInput, CapRow } from '@capillarytech/cap-ui-library';

const CreateEditAppInputRow = ({
  value,
  changeHandler,
  placeholder,
  label,
  isTextArea,
  errorMessage,
  disabled,
  focusOutHandler,
}) => {
  const WrapperComponent = isTextArea ? CapInput.TextArea : CapInput;
  return (
    <CapRow className="application-detail-row">
      <CapHeading type="h3">
        {label}
      </CapHeading>
      <WrapperComponent
        placeholder={placeholder}
        onChange={changeHandler}
        value={value}
        errorMessage={errorMessage}
        disabled={disabled}
        onBlur={focusOutHandler}
      />
    </CapRow>
  );
}

CreateEditAppInputRow.defaultProps = {
  value: '',
  changeHandler: () => { },
  placeholder: '',
  label: '',
  isTextArea: false,
  disabled: false,
  focusOutHandler: () => { },
};

CreateEditAppInputRow.propTypes = {
  value: PropTypes.string,
  changeHandler: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  isTextArea: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  focusOutHandler: PropTypes.func,
};

export default CreateEditAppInputRow;
