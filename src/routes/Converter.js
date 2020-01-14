import React from 'react';
import { makeStyles } from '@material-ui/core';
import FileList from '../components/FileList';
import BottomBar from '../components/BottomBar';

const useStyles = makeStyles({
    converter: {
        height: '100%',
    },
    fileListWrapper: {
        height: 'calc(100% - 48px)',
    },
});

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.converter}>
            <div className={classes.fileListWrapper}>
                <FileList />
            </div>
            <BottomBar />
        </div>
    );
};
