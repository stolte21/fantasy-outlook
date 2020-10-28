import { useState, useEffect } from 'react';
import { List, Map } from 'immutable';
import outlookAPI from '../api/outlookAPI';

const useWeeklyStats = (selectedWeek) => {

    const [weeklyStats, setWeeklyStats] = useState(Map());      // each week key will have as it's value an object
                                                                // that contains summarized boxscore data */ 

    const [loadingMap, setLoadingMap] = useState(Map());        // tracks the status of what weeks are currently
                                                                // being loaded where the week is the key

    useEffect(() => {
        
        if (selectedWeek && !loadingMap.has(selectedWeek)) {

            setLoadingMap(loadingMap.set(selectedWeek, true));

            outlookAPI.get(`/week/${selectedWeek}`)
            .then(({ data }) => {
                const playerList = List(data);
                setWeeklyStats(stats => stats.set(selectedWeek, playerList));
                setLoadingMap(loadingMap.set(selectedWeek, false));
            });
        }

    }, [selectedWeek, loadingMap]);

    return [weeklyStats, loadingMap];
};

export default useWeeklyStats;