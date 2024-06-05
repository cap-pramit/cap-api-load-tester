import React from 'react';
import PropTypes from 'prop-types';
import { CapButton, CapColumn, CapIcon, CapInput, CapRow } from '@capillarytech/cap-ui-library';
import CreateEditAppInputRow from '../CreateEditAppInputRow/CreateEditAppInputRow';
import { isEmpty } from 'lodash';
import { REQUEST } from '../../pages/App/constants';

const CreateEditAppInputRowWithValidate = ({
  value,
  changeHandler,
  placeholder,
  label,
  errorMessage,
  disabled,
  btnType,
  btnDisabled,
  btnOnClick,
  btnClassName,
  btnLabel,
  validateStatus,
  validValue,
  editMode,
  focusOutHandler,
  showValidateButton,
}) => {

  return (
    <CapRow className="app-name-container">
      <CapColumn span={showValidateButton ? 19 : 23}>
        <CreateEditAppInputRow
          value={value}
          changeHandler={changeHandler}
          disabled={disabled}
          placeholder={placeholder}
          label={label}
          errorMessage={errorMessage}
          focusOutHandler={focusOutHandler}
        />
      </CapColumn>
      <CapColumn span={1}>
        {(!isEmpty(validateStatus) || editMode) &&
          <CapIcon
            type={validateStatus === REQUEST ?
              'in-progress' :
              ((validValue || editMode) ?
                "tick-outlined" :
                "warning-circle"
              )}
            className={showValidateButton ? "app-name-verification" : "app-name-verification-no-btn"}
          />
        }
      </CapColumn>
      {showValidateButton &&
        <CapColumn span={4}>
          <CapButton
            type={btnType}
            disabled={btnDisabled}
            onClick={btnOnClick}
            className={btnClassName}
          >
            {btnLabel}
          </CapButton>
        </CapColumn>}
    </CapRow>
  );
}

CreateEditAppInputRowWithValidate.defaultProps = {
  value: '',
  changeHandler: () => { },
  placeholder: '',
  label: '',
  errorMessage: '',
  disabled: false,
  btnType: 'secondary',
  btnDisabled: false,
  btnOnClick: () => { },
  btnClassName: '',
  btnLabel: '',
  validateStatus: '',
  validValue: '',
  editMode: false,
  focusOutHandler: () => { },
  showValidateButton: true,
};

CreateEditAppInputRowWithValidate.propTypes = {
  value: PropTypes.string,
  changeHandler: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  btnType: PropTypes.string,
  btnDisabled: PropTypes.bool,
  btnOnClick: PropTypes.func,
  btnClassName: PropTypes.string,
  btnLabel: PropTypes.string,
  validateStatus: PropTypes.string,
  validValue: PropTypes.string,
  editMode: PropTypes.bool,
  focusOutHandler: PropTypes.func,
  showValidateButton: PropTypes.bool,
};

export default CreateEditAppInputRowWithValidate;
