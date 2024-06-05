import React from 'react';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import {
  CapRow,
  CapIcon,
  CapModal,
  CapButton,
  CapColumn,
} from '@capillarytech/cap-ui-library';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import messages from './messages';
import styles from './styles';

function DeleteConfirmationModal({
  yesCb = () => {},
  noCb = () => {},
  defaultCountdown = 5,
  intl,
  modalTitle,
  modalContentMsg,
}) {
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = React.useState(false);
  const [countdown, setCountdown] = React.useState(defaultCountdown);

  const { formatMessage } = intl;

  React.useEffect(
    () => {
      let timer;
      if (countdown > 0) {
        timer = setInterval(() => {
          setCountdown(prevCountdown => {
            if (prevCountdown === 1) {
              clearInterval(timer);
              setIsButtonEnabled(true);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);
      }

      return () => clearInterval(timer);
    },
    [countdown],
  );

  const handleDeleteBuildNo = () => {
    noCb();
    setDeleteModalVisible(false);
  };

  const handleDeleteBuildYes = () => {
    yesCb();
    setDeleteModalVisible(false);
  };

  return (
    <CapModal
      title={modalTitle}
      visible={deleteModalVisible}
      onCancel={handleDeleteBuildNo}
      onOk={handleDeleteBuildYes}
      footer={[
        <CapButton type="secondary" onClick={handleDeleteBuildNo}>
          {formatMessage(messages.noButton)}
        </CapButton>,
        <CapButton disabled={!isButtonEnabled} onClick={handleDeleteBuildYes}>
          {formatMessage(messages.yesButton, {
            value: countdown ? `(${countdown})` : '',
          })}
        </CapButton>,
      ]}
    >
      <CapRow type="layout">
        <CapColumn>{modalContentMsg}</CapColumn>
        <CapColumn>
          {countdown ? (
            <CapRow type="flex" align="middle" gutter={12}>
              <CapColumn>
                {formatMessage(messages.btnEnabledInSec, { value: countdown })}
              </CapColumn>
              <CapIcon
                type="refreshCircle"
                className="rotate-continuous"
                size="s"
              />
            </CapRow>
          ) : (
            <></>
          )}
        </CapColumn>
      </CapRow>
    </CapModal>
  );
}

export default injectIntl(withStyles(DeleteConfirmationModal, styles));
