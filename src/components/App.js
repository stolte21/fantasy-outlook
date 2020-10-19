import React, { useState } from 'react';
import { List } from 'immutable';
import { 
    Container,
    Grid,
    Box,
    makeStyles,
    useMediaQuery
} from '@material-ui/core';
import Select from './Select';
import StatsList from './StatsList';
import StatsTable from './StatsTable';
import { statCategories, categoriesConfig, RUSHING, RUSHING_AND_RECEIVING } from '../constants/statCategories';
import useScoreboards from '../hooks/useScoreboards';
import useBoxscores from '../hooks/useBoxscores';

const NUM_WEEKS = 3;
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
    content: {
        flexGrow: 1
    }
}));

const App = () => {

    const { container, box, content } = useStyles();
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

    const isMobile =  useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Container className={container}>
            <Box className={box} padding={2}>
                {renderSelects()}
                <div className={content}>
                    {isMobile ? (
                        <StatsList />
                    ) : (
                        <StatsTable />
                    )}
                </div>
            </Box>
        </Container>
    );
};

export default App;