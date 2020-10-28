import React, { useState, useMemo } from 'react';
import { List } from 'immutable';
import { 
    Container,
    Grid,
    Box,
    TextField,
    InputAdornment,
    makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import Select from './Select';
import DataDisplay from './DataDisplay';
import {
    RUSHING,
    RECEIVING,
    RUSHING_AND_RECEIVING,
    statCategories,
    categoriesConfig,
} from '../constants/statCategories';
import {
    PLAYER_TYPE,
    COMMON_ATTRIBUTES,
    RUSHING_ATTRIBUTES,
    RECEIVING_ATTRIBUTES,
    RUSHING_AND_RECEIVING_ATTRIBUTES,
} from '../constants/statAttributes';
import useActiveWeek from '../hooks/useActiveWeek';
import useWeeklyStats from '../hooks/useWeeklyStats';

const NUM_WEEKS = 17;
const weekNums = function() {
    const weeks = [];
    for (let i = 1; i <= NUM_WEEKS; i++) weeks.push(i);

    return weeks;
}();

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
    },
    box: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    controls: {
        padding: 8
    },
    searchBar: {
        marginTop: 8
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8
    }
}));

const App = () => {

    const { container, box, controls, searchBar, content } = useStyles();
    const [category, setCategory] = useState(RUSHING);
    const [searchTerm, setSearchTerm] = useState('');
    const [week, setWeek] = useActiveWeek();
    const [weeklyStats, loadingMap] = useWeeklyStats(week);

    const handleChangeWeek = (event) => {
        setWeek(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleChangeSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };

    const determineIfLoading = () => {
        return !loadingMap.has(week) || loadingMap.get(week);
    };

    const filterStats = () => {
        const statsOfTheWeek = weeklyStats.get(week);
        if (statsOfTheWeek) {
            return statsOfTheWeek.filter((player, id) => {
                if (category === RUSHING) return player[PLAYER_TYPE] === RUSHING || player[PLAYER_TYPE] === RUSHING_AND_RECEIVING;
                else if (category === RECEIVING) return player[PLAYER_TYPE] === RECEIVING || player[PLAYER_TYPE] === RUSHING_AND_RECEIVING;
                else return true;
            });
        }

        return List();
    };

    const getDisplayedAttributes = () => {
        if (category === RUSHING_AND_RECEIVING) return [...COMMON_ATTRIBUTES, ...RUSHING_AND_RECEIVING_ATTRIBUTES];
        else if (category === RUSHING) return [...COMMON_ATTRIBUTES, ...RUSHING_ATTRIBUTES];
        else if (category === RECEIVING) return [...COMMON_ATTRIBUTES, ...RECEIVING_ATTRIBUTES];
        else return [];
    };

    const isLoadingWeek = useMemo(determineIfLoading, [loadingMap, week]);
    const filteredStats = useMemo(filterStats, [weeklyStats, week, category]);
    const attributes = useMemo(getDisplayedAttributes, [category]);

    const renderSelects = () => {

        const weekOptions = weekNums.map(num => ({ value: num, label: num }));
        const categoryOptions = statCategories.map(cat => ({ value: cat, label: categoriesConfig[cat].name }));

        return (
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Select label="Week" value={week} onChange={handleChangeWeek}>
                        {weekOptions}
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <Select label="Category" value={category} onChange={handleChangeCategory}>
                        {categoryOptions}
                    </Select>
                </Grid>
            </Grid>
        );
    };

    const renderSearchField = () => {
        return (
            <TextField
                className={searchBar}
                value={searchTerm}
                onChange={handleChangeSearchTerm}
                label="Player Filter"
                placeholder="Search for a player"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        );
    };

    return (
        <Container className={container}>
            <Box className={box} padding={0}>
                <div className={controls}>
                    {renderSelects()}
                    {renderSearchField()}
                </div>
                
                <div className={content}>
                    <DataDisplay
                        loading={isLoadingWeek}
                        category={category}
                        attributes={attributes}
                        data={filteredStats}
                        searchTerm={searchTerm}
                    />
                </div>
            </Box>
        </Container>
    );
};

export default App;