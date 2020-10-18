import React, { useState } from 'react';
import { List } from 'immutable';
import { 
    Container,
    Grid,
    Box,
    CircularProgress
} from '@material-ui/core';
import Select from './Select';
import { statCategories, categoriesConfig, RUSHING, RUSHING_AND_RECEIVING } from '../constants/statCategories';
import useScoreboards from '../hooks/useScoreboards';
import useBoxscores from '../hooks/useBoxscores';

const NUM_WEEKS = 3;
const weekNums = function() {
    const weeks = [];
    for (let i = 1; i <= NUM_WEEKS; i++) weeks.push(i);

    return weeks;
}();

const App = () => {

    const [week, setWeek] = useState('');
    const [category, setCategory] = useState(RUSHING);
    const [scoreboards] = useScoreboards(setWeek, weekNums);
    const [weeklyStats, loadingMap] = useBoxscores(scoreboards, week);

    const handleChangeWeek = (event) => {
        setWeek(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const filterStats = () => {
        if (statsOfTheWeek) {
            return statsOfTheWeek.filter((player, id) => {
                if (category === RUSHING_AND_RECEIVING) return true;
                else return id.includes(category);
            }).toList();
        }

        return List();
    };

    const isLoadingWeek = !loadingMap.has(week) || loadingMap.get(week);
    const statsOfTheWeek = weeklyStats.get(week);
    const filteredStats = filterStats();

    const renderSelects = () => {

        const weekOptions = weekNums.map(num => ({ value: num, label: num }));
        const categoryOptions = statCategories.map(cat => ({ value: cat, label: categoriesConfig[cat].name }));

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Select label="Week" value={week} onChange={handleChangeWeek}>
                        {weekOptions}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select label="Category" value={category} onChange={handleChangeCategory}>
                        {categoryOptions}
                    </Select>
                </Grid>
            </Grid>
        );
    };

    return (
        <Container>
            <Box padding={2}>
                {renderSelects()}

                {
                    isLoadingWeek &&
                    <CircularProgress />
                }
            </Box>
        </Container>
    );
};

export default App;