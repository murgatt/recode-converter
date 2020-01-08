import React from 'react';
import { useSelector } from 'react-redux';
import { getSourceIds } from '../store/source/source.selectors';
import FileList from '../components/FileList';

export default () => {
    const sourceIds = useSelector(getSourceIds);
    console.warn('sourceIds', sourceIds);

    return (
        <div>
            <FileList />
        </div>
    );
};
