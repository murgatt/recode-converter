import React from 'react';
import { useSelector } from 'react-redux';
import { getSourceIds } from '../store/source/source.selectors';

export default () => {
    const sourceIds = useSelector(getSourceIds);
    console.warn('sourceIds', sourceIds);

    return <div>TODO: converter page</div>;
};
