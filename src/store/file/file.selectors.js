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
export const getHasFilesToConvert = ({ file: { fileIds, filesById } }) =>
    fileIds.length > 0 && _.some(filesById, ['status', FILE_STATUS.initial]);
