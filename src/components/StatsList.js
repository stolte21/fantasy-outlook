import React from 'react';
import clsx from 'clsx';
import { AutoSizer, List as VirtualizedList } from 'react-virtualized';
import { 
    Paper,
    ListItem,
    ListItemText,
    Typography,
    makeStyles
} from '@material-ui/core';
import SortHelper from './SortHelper';
import {
    ID,
    NAME,
    TEAM,
    CARRIES,
    YARDS_RUSHING,
    YARDS_RUSHING_AVERAGE,
    TD_RUSHING,
    TD_RECEIVING,
    YARDS_RECEIVING,
    YARDS_RECEIVING_AVERAGE,
    RECEPTIONS,
    TARGETS,
    TOTAL_YARDS,
    TOTAL_TDS
} from '../constants/statAttributes';
import { RUSHING, RECEIVING, RUSHING_AND_RECEIVING } from '../constants/statCategories';

const useStyles = makeStyles({
    paper: {
        height: '100%',
        width: '100%',
    },
    stats: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        textAlign: 'right'
    },
    tidbit: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 16
    },
    text: {
        fontSize: '0.75rem'
    },
    bold: {
        fontWeight: 'bold'
    },
    noContent: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Tidbit = ({ primary, secondary, tertiary }) => {

    const { tidbit, text, bold } = useStyles();

    return (
        <div className={tidbit}>
            <Typography className={clsx(text, bold)}>{primary}</Typography>
            <Typography className={clsx(text)}>{secondary} {tertiary && <span>({tertiary})</span>}</Typography>
        </div>
    );
};

const StatsList = ({
    category,
    attributes,
    data,
    sort,
    onSort
}) => {

    const { paper, text, stats, noContent } = useStyles();

    const rowRenderer = ({ style, index }) => {

        const player = data.get(index);
        let tidbits = [];

        if (category === RUSHING) {
            tidbits.push(
                <Tidbit
                key={`${RUSHING}_1`}
                    primary={`${player[YARDS_RUSHING]} yards`}
                    secondary={`${player[CARRIES]} carries`}
                    tertiary={`${player[YARDS_RUSHING_AVERAGE]} y/a`}
                />
            );

            tidbits.push(
                <Tidbit
                    key={`${RUSHING}_2`}
                    primary={`${player[TD_RUSHING]} TDs`}
                />
            );
        }

        if (category === RECEIVING) {
            tidbits.push(
                <Tidbit
                    key={`${RECEIVING}_1`}
                    primary={`${player[YARDS_RECEIVING]} yards`}
                    secondary={`${player[RECEPTIONS]} rec / ${player[TARGETS]} tgt`}
                    tertiary={`${player[YARDS_RECEIVING_AVERAGE]} y/c`}
                />
            );

            tidbits.push(
                <Tidbit
                    key={`${RECEIVING}_2`}
                    primary={`${player[TD_RECEIVING]} TDs`}
                />
            );
        }

        if (category === RUSHING_AND_RECEIVING) {
            tidbits.push(
                <Tidbit
                    key={`${RUSHING_AND_RECEIVING}_1`}
                    primary={`${player[TOTAL_YARDS]} total yards`}
                    secondary={`${player[CARRIES]} car + ${player[RECEPTIONS]} rec`}
                />
            );

            tidbits.push(
                <Tidbit
                    key={`${RUSHING_AND_RECEIVING}_2`}
                    primary={`${player[TOTAL_TDS]} total TDs`}
                />
            )
        }

        return (
            <ListItem key={player[ID]} style={style}>
                <ListItemText
                    primary={player[NAME]}
                    primaryTypographyProps={{
                        className: text
                    }}
                    secondary={player[TEAM]}
                    secondaryTypographyProps={{
                        className: text
                    }}
                />
                <div className={stats}>
                    {tidbits}
                </div>
            </ListItem>
        );
    };

    const noRowsRenderer = () => {
        return (
            <div className={noContent}>
                No Weekly Stats
            </div>
        );
    };

    return (
        <Paper className={paper}>
            <SortHelper
                sort={sort}
                onSort={onSort}
                attributes={attributes}
            />
            <AutoSizer>
                {({ height, width }) => (
                    <VirtualizedList
                        height={height - 36}    // subtract height of the SortHelper component
                        width={width}
                        rowCount={data.size}
                        rowHeight={75}
                        rowRenderer={rowRenderer}
                        noRowsRenderer={noRowsRenderer}
                    >
                    </VirtualizedList>
                )}
            </AutoSizer>
        </Paper>
    );
};

export default StatsList;