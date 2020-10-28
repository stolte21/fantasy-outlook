import React, { useState, useEffect} from 'react';
import { BounceLoader } from 'react-spinners';
import { Typography, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles({
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderText: {
        fontStyle: 'italic',
        margin: 12
    }
});

const LoadingSpinner = () => {

    const { loaderContainer, loaderText } = useStyles();
    const [loadingText, setLoadingText] = useState('Fetching week data...');
    const theme = useTheme();

    useEffect(() => {

        const timeout = setTimeout(() => {
            setLoadingText('Compiling week data...');
        }, 2000);

        return () => {
            clearTimeout(timeout);
        }

    }, []);

    return (
        <div className={loaderContainer}>
            <BounceLoader
                size={50}
                color={theme.palette.primary.main}
                loading={true}
            />
            <Typography className={loaderText}>{loadingText}</Typography>
        </div>
    );
};

export default LoadingSpinner;