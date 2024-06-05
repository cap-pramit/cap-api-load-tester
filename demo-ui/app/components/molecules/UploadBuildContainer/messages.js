/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.molecules.UploadBuildContainer';

export default defineMessages({
  enterBuildDescription: {
    id: `${scope}.enterBuildDescription`,
    defaultMessage: 'Enter build description.',
  },
  uploadingBuild: {
    id: `${scope}.uploadingBuild`,
    defaultMessage: 'Uploading build...',
  },
  selectZip: {
    id: `${scope}.selectZip`,
    defaultMessage: 'Select zip',
  },
  uploadBuildSuccess: {
    id: `${scope}.uploadBuildSuccess`,
    defaultMessage: 'Build uploaded successfully. Refreshing deployments...',
  },
  uploadBuildFailure: {
    id: `${scope}.uploadBuildFailure`,
    defaultMessage: 'Failed to upload build.',
  },

  fileSizeTypeInfo: {
    id: `${scope}.fileSizeTypeInfo`,
    defaultMessage:
      'Please upload a zip file with a maximum size of {value}MB.',
  },
  fileSizeExceed: {
    id: `${scope}.fileSizeExceed`,
    defaultMessage:
      'File size should not exceed {value}MB. Remove this file and try upload again.',
  },
  confirmUpload: {
    id: `${scope}.confirmUpload`,
    defaultMessage: 'Confirm upload',
  },
  selectedFileWithSize: {
    id: `${scope}.selectedFileWithSize`,
    defaultMessage: 'Selected: {fileName} with size {fileSize}MB',
  },
});
