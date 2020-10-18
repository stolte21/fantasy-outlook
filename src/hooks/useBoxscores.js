import cheerio from 'cheerio';
import { useState, useEffect } from 'react';
import { Map } from 'immutable';
import { RUSHING, RECEIVING } from '../constants/statCategories';
import PlayerRecord from '../records/PlayerRecord';

const useBoxscores = (scoreboards, selectedWeek) => {

    const [weeklyStats, setWeeklyStats] = useState(Map());      // each week key will have as it's value an object
                                                                // that contains summarized boxscore data */ 

    const [loadingMap, setLoadingMap] = useState(Map());        // tracks the status of what weeks are currently
                                                                // being loaded where the week is the key

    useEffect(() => {
        if (scoreboards.length !== 0) {
            if (selectedWeek && !loadingMap.has(selectedWeek)) {

                setLoadingMap(loadingMap.set(selectedWeek, true));

                // Subtract 1 due to Week 1 being index-0 and so-forth
                const scoreboard = scoreboards[selectedWeek - 1];
                if (scoreboard) {
                    const boxscorePromises = scoreboard.events.flatMap(event => {
                        const linkObj = event.links.find(link => link.href.includes('boxscore'));
                        return linkObj ? fetch(linkObj.href.replace('http', 'https')) : [];
                    });

                    Promise.all(boxscorePromises)
                    .then(responses => responses.map(response => response.text()))
                    .then(htmlPromises => (
                        Promise.all(htmlPromises)
                        .then(boxScoresHtml => {

                            let playersData = Map();

                            boxScoresHtml.forEach(boxscore => {
                                const $ = cheerio.load(boxscore);
                                const rushingRows = $('#gamepackage-rushing tbody tr');
                                const receivingRows = $('#gamepackage-receiving tbody tr');

                                playersData = playersData.merge(extractStatsFromHtmlRows(rushingRows, true));
                                playersData = playersData.merge(extractStatsFromHtmlRows(receivingRows, false));
                            });

                            setLoadingMap(loadingMap.set(selectedWeek, false));
                            setWeeklyStats(weeklyStats.set(selectedWeek, playersData));
                        })
                    ));
                }
            }
        }
    }, [scoreboards, selectedWeek, loadingMap]);

    return [weeklyStats, loadingMap];
};

const extractStatsFromHtmlRows = (rows, isRushingBox) => {

    let dataMap = Map();
    const idKey = isRushingBox ? RUSHING : RECEIVING;

    rows.toArray().forEach(row => {
        // summarized team stats has 'highlight' css class
        if (row.attribs.class !== 'highlight') {
            const playerData = extractPlayerStatsFromHtmlRow(row, isRushingBox);
            dataMap = dataMap.set(`${playerData.id}_${idKey}`, playerData);
        }
    });

    return dataMap;
};

const extractPlayerStatsFromHtmlRow = (row, isRushingBox) => {
    const player = {};

    row.children.forEach(cell => {
        if (cell.attribs.class === 'name') {
            const re = /player\/_\/id\/([\d]+)\//
            player.id = re.exec(cell.firstChild.attribs.href)[1];

            // TODO: Better way to query this?
            player.name = cell.firstChild.firstChild.firstChild.data;
        } else {

            let attributeKey;

            switch(cell.attribs.class) {
                case 'car':
                    attributeKey = 'carries';
                    break;
                case 'rec':
                    attributeKey = 'receptions';
                    break;
                case 'yds':
                    attributeKey = isRushingBox ? 'yardsRushing' : 'yardsReceiving';
                    break;
                case 'avg':
                    attributeKey = isRushingBox ? 'yardsRushingAverage' : 'yardsReceivingAverage';
                    break;
                case 'td':
                    attributeKey = isRushingBox ? 'tdRushing' : 'tdReceiving';
                    break;
                case 'long':
                    attributeKey = isRushingBox ? 'longRushing' : 'longReceiving';
                    break;
                case 'tgts':
                    attributeKey = 'targets';
                    break;
                default:
                    console.log('Unknown Stat: ', cell.attribs.class);
            }

            if (attributeKey) player[attributeKey] = cell.firstChild.nodeValue;
        }
    });

    return PlayerRecord(player);
};

export default useBoxscores;
