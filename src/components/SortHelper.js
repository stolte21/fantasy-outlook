import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, Menu, MenuItem, Chip, makeStyles } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { displayConfig } from '../constants/statAttributes';

const useStyles = makeStyles({
    button: {
        display: 'flex',
        width: '100%'
    },
    directionDesc: {
        transform: 'rotate(0deg)'
    },
    directionAsc: {
        transform: 'rotate(180deg)'
    },
    hidden: {
        display: 'none'
    },
    menuItem: {
        '&:hover': {
            backgroundColor: 'unset',
            cursor: 'unset'
        }
    }
});

const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center'
};

const transformOrigin = {
    vertical: 'top',
    horizontal: 'center'
};

const SortChip = ({ attribute, sortBy, sortDirection, onSort }) => {

    const attributeText = displayConfig[attribute].text;
    const { hidden, directionDesc, directionAsc } = useStyles();

    return (
        <Chip
            label={attributeText}
            onClick={() => onSort(attribute)}
            color={attribute === sortBy ? 'primary' : 'default'}
            clickable
            onDelete={() => onSort(attribute)}
            deleteIcon={(
                <ArrowDownwardIcon 
                    className={clsx({
                        [directionDesc]: sortDirection === 'desc',
                        [directionAsc]: sortDirection === 'asc',
                        [hidden]: attribute !== sortBy
                    })}
                />
            )}
        />
    );
};

const SortHelper = ({ attributes, sort, onSort }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const { button, directionDesc, directionAsc, menuItem } = useStyles();
    const { sortBy, sortDirection } = sort;
    const sortText = displayConfig[sortBy].text;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                className={button}
                variant="contained"
                color="primary"
                onClick={handleClick}
                startIcon={<SortIcon />}
                endIcon={
                    <ArrowDownwardIcon 
                        className={clsx({
                            [directionDesc]: sortDirection === 'desc',
                            [directionAsc]: sortDirection === 'asc'
                        })}
                    />
                }
            >
                {sortText}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                getContentAnchorEl={null}
            >
                {attributes.map(attribute => (
                    <MenuItem
                        key={attribute}
                        classes={{
                            root: menuItem
                        }}
                    >
                        <SortChip
                            attribute={attribute}
                            sortBy={sortBy}
                            sortDirection={sortDirection}
                            onSort={onSort}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
};

export default SortHelper;