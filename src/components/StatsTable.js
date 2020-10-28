import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { 
    makeStyles,
    Paper,
    TableCell,
    TableSortLabel
} from '@material-ui/core';
import { AutoSizer, Table, Column } from 'react-virtualized';
import { displayConfig, NAME, TEAM } from '../constants/statAttributes';

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box'
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200]
        }
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
        cursor: 'pointer'
    },
    tableCell: {
        flex: 1
    },
    sortLabel: {
        color: 'white'
    },
    noContent: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const ROW_HEIGHT = 48;
const rowHeightStyle = {
    height: ROW_HEIGHT
};

class MuiVirtualizedTable extends React.PureComponent {

    createSortHandler = (property) => (event) => {
        this.props.onSort(property);
    };
  
    getRowClassName = ({ index }) => {
        const { classes } = this.props;
        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1
        });
    };

    headerRenderer = ({ label, columnIndex, dataKey }) => {
        const { classes, sortProperties } = this.props;
        const { sortBy, sortDirection } = sortProperties;

        return (
            <TableCell
                style={rowHeightStyle}
                className={clsx(classes.tableHeader, classes.tableCell, classes.flexContainer)}
                component="div"
                variant="head"
                align={columnIndex === 0 ? 'left': 'right'}
                sortDirection={sortBy === dataKey ? sortDirection : false}
            >
                <TableSortLabel
                    className={classes.sortLabel}
                    active={sortBy === dataKey}
                    direction={sortBy === dataKey ? sortDirection : 'desc'}
                    onClick={this.createSortHandler(dataKey)}
                >
                    {label}
                </TableSortLabel>
            </TableCell>
        );
    };
  
    cellRenderer = ({ cellData, dataKey, rowData, columnIndex }) => {
        const { classes } = this.props;
        const displayTeam = dataKey === NAME;
        
        return (
            <TableCell
                style={rowHeightStyle}
                className={clsx(classes.tableCell, classes.flexContainer)}
                component="div"
                variant="body"
                align={columnIndex === 0 ? 'left': 'right'}
            >
                {`${cellData} ${displayTeam ? `(${rowData[TEAM]})` : ''}`}
            </TableCell>
        );
    };

    noRowsRenderer = () => {
        const { classes } = this.props;

        return (
            <div className={classes.noContent}>
                No Weekly Stats
            </div>
        );
    };
  
    render() {
        const {
            classes,
            columns,
            ...tableProps
        } = this.props;

        const columnComponents = columns.map(({ dataKey, ...other }, index) => {
            return (
                <Column
                    key={dataKey}
                    width={150}
                    flexGrow={dataKey === NAME ? 2 : 1}
                    className={classes.flexContainer}
                    headerRenderer={(headerProps) => (
                        this.headerRenderer({
                            ...headerProps,
                            columnIndex: index
                        })
                    )}
                    cellRenderer={this.cellRenderer}
                    dataKey={dataKey}
                    {...other}
                />
            );
        });

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={ROW_HEIGHT}
                        headerHeight={ROW_HEIGHT}
                        rowClassName={this.getRowClassName}
                        noRowsRenderer={this.noRowsRenderer}
                        {...tableProps}
                    >
                        {columnComponents}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

const useStyles = makeStyles({
    paper: {
        height: '100%',
        width: '100%'
    }
});

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const StatsTable = ({
    attributes,
    data,
    sort,
    onSort
}) => {

    const { paper } = useStyles();

    const rowGetter = useCallback(({ index }) => data.get(index), [data]);
    const columns = useMemo(() => (
        attributes.map(attribute => ({
            label: displayConfig[attribute].text,
            dataKey: attribute
        }))
    ), [attributes]);

    return (
        <Paper className={paper}>
            <VirtualizedTable
                rowCount={data.size}
                rowGetter={rowGetter}
                sortProperties={sort}
                onSort={onSort}
                columns={columns}
            />
        </Paper>
    );
};

export default StatsTable;