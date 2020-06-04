import _ from 'lodash-es';
import { FILE_STATUS } from './file.constants';

export const getAreAllFilesComplete = ({ file: { filesById } }) =>
    _.every(
        filesById,
        fileObject => fileObject.status === FILE_STATUS.complete || fileObject.status === FILE_STATUS.error,
    );
export const getDestination = ({ file: { destination } }) => destination;
export const getFileIds = ({ file: { fileIds } }) => fileIds;
export const getFilesById = ({ file: { filesById } }) => filesById;
export const getFilesToConvert = ({ file: { filesById } }) => {
    return Object.values(filesById).filter(fileObject => {
        return fileObject.status === FILE_STATUS.initial || fileObject.status === FILE_STATUS.error;
    });
};
export const getHasFilesToConvert = state => getFilesToConvert(state).length > 0;
export const getIsDestinationManuallySet = ({ file: { isDestinationManuallySet } }) => isDestinationManuallySet;
