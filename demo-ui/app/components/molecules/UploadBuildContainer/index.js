import React from 'react';
import {
  CapUploader,
  CapInput,
  CapRow,
  CapColumn,
  CapButton,
  CapIcon,
  CapNotification,
  CapSpin,
} from '@capillarytech/cap-ui-library';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';

import messages from './messages';
import styles from './styles';
const { TextArea } = CapInput;

import { REQUEST } from '../../pages/App/constants';

import {
  MAX_BUILD_SIZE_IN_MB,
  MAX_BUILD_SIZE_IN_BYTES,
  UPLOAD_BUILD_DESCRIPTION_MAX_CHAR,
} from './constants';

function UploadBuild({
  formatMessage,
  applicationId,
  uploadBuildAction,
  uploadBuildStatus,
  className,
}) {
  const [buildDescription, setBuildDescription] = React.useState('');
  const [fileList, setFileList] = React.useState(null);

  const beforeUpload = file => {
    const isSizeValid = file.size < MAX_BUILD_SIZE_IN_BYTES;
    if (!isSizeValid) {
      CapNotification.error({
        message: formatMessage(messages.fileSizeExceed, {
          value: MAX_BUILD_SIZE_IN_MB,
        }),
        duration: 3,
      });
    }
    return isSizeValid;
  };

  const showSpinner = uploadBuildStatus === REQUEST;

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const handleUploadButtonClick = () => {
    const selectedFile = fileList[0].originFileObj;
    CapNotification.info({
      message: formatMessage(messages.uploadingBuild),
      duration: 1.5,
    });
    uploadBuildAction({
      file: selectedFile,
      applicationId,
      description: buildDescription,
      successMsg: formatMessage(messages.uploadBuildSuccess),
      errorMsg: formatMessage(messages.uploadBuildFailure),
      formatMessage,
    });
  };

  return (
    <div className={className}>
      <CapSpin spinning={showSpinner}>
        {/* Build Description */}
        <CapRow type="layout" gutter={16}>
          <CapColumn>
            <TextArea
              label={formatMessage(messages.enterBuildDescription)}
              maxLength={UPLOAD_BUILD_DESCRIPTION_MAX_CHAR}
              size="large"
              value={buildDescription}
              onChange={e => setBuildDescription(e.target.value)}
            />
          </CapColumn>
        </CapRow>

        {/* File Size Info */}
        <CapRow type="flex">
          <div className="file-size-info-text">
            {formatMessage(messages.fileSizeTypeInfo, {
              value: MAX_BUILD_SIZE_IN_MB,
            })}
          </div>
        </CapRow>

        {/* File Upload */}
        <CapRow type="flex">
          <CapColumn>
            <CapUploader
              type="upload"
              accept=".zip"
              customRequest={() => {}}
              fileList={fileList}
              onChange={handleFileChange}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <CapButton
                type="secondary"
                disabled={!buildDescription || fileList}
              >
                {/* Attach Icon */}
                <CapRow
                  type="flex"
                  justify="space-between"
                  align="middle"
                  gutter={4}
                >
                  <CapColumn className="attach-icon">
                    <CapIcon type="attachment" size="s" />
                  </CapColumn>
                  <CapColumn>{formatMessage(messages.selectZip)}</CapColumn>
                </CapRow>
              </CapButton>
            </CapUploader>
          </CapColumn>
        </CapRow>

        {/* Selected File */}
        {fileList && (
          <CapRow type="layout">
            <CapRow
              type="flex"
              justify="space-between"
              align="middle"
              className="selected-file"
            >
              <CapColumn>
                {formatMessage(messages.selectedFileWithSize, {
                  fileName: fileList[0].name,
                  fileSize: (fileList[0].size / 1024 / 1024).toFixed(2),
                })}
              </CapColumn>
              <CapColumn className="remove-selection-icon">
                <CapIcon
                  type="close"
                  size="s"
                  onClick={() => setFileList(null)}
                />
              </CapColumn>
            </CapRow>

            {/* Confirm Upload Button */}
            <CapRow type="flex" className="confirm-upload-button">
              <CapButton
                type="primary"
                disabled={fileList[0]?.size > MAX_BUILD_SIZE_IN_BYTES}
                onClick={handleUploadButtonClick}
              >
                {formatMessage(messages.confirmUpload)}
              </CapButton>
            </CapRow>
          </CapRow>
        )}
        <br />
      </CapSpin>
    </div>
  );
}

export default withStyles(UploadBuild, styles);
