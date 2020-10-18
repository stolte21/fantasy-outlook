import { useState, useEffect } from 'react';

const useScoreboards = (setActiveWeek, weekNums) => {

    const [scoreboards, setScoreboards] = useState([]);

    useEffect(() => {
        const scoreboardURL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
        const promises = weekNums.map(week => fetch(`${scoreboardURL}?week=${week}`));

        Promise.all(promises)
        .then(responses => responses.map(response => response.json()))
        .then(scoreboardsPromises => (
            Promise.all(scoreboardsPromises)
            .then(scoreboardsJSON => setScoreboards(scoreboardsJSON))
        ));
            
        // hit the scoreboard API without week parameter to determine active week
        fetch(scoreboardURL)
        .then(response => response.json())
        .then(scoreboard => setActiveWeek(scoreboard.week.number - 1));

    }, [setActiveWeek, weekNums]);

    return [scoreboards];
}

export default useScoreboards;