export const ID = 'id';
export const NAME = 'name';
export const TEAM = 'team';
export const PLAYER_TYPE = 'type';

export const CARRIES = 'carries';
export const YARDS_RUSHING = 'yardsRushing';
export const YARDS_RUSHING_AVERAGE = 'yardsRushingAverage';
export const TD_RUSHING = 'tdRushing';
export const LONG_RUSHING = 'longRushing';

export const RECEPTIONS = 'receptions';
export const YARDS_RECEIVING = 'yardsReceiving';
export const YARDS_RECEIVING_AVERAGE = 'yardsReceivingAverage';
export const TD_RECEIVING = 'tdReceiving';
export const LONG_RECEIVING = 'longReceiving';
export const TARGETS = 'targets';

export const TOTAL_YARDS = 'totalYards';
export const TOTAL_TDS = 'totalTds';

export const COMMON_ATTRIBUTES = [
    NAME
];

export const RUSHING_ATTRIBUTES = [
    CARRIES,
    YARDS_RUSHING,
    YARDS_RUSHING_AVERAGE,
    TD_RUSHING,
    LONG_RUSHING
];

export const RECEIVING_ATTRIBUTES = [
    TARGETS,
    RECEPTIONS,
    YARDS_RECEIVING,
    YARDS_RECEIVING_AVERAGE,
    TD_RECEIVING,
    LONG_RECEIVING,
];

export const RUSHING_AND_RECEIVING_ATTRIBUTES = [
    CARRIES,
    YARDS_RUSHING,
    TARGETS,
    RECEPTIONS,
    YARDS_RECEIVING,
    TOTAL_YARDS,
    TOTAL_TDS
];

export const displayConfig = {
    [NAME]: {
        text: 'Player'
    },
    [TEAM]: {
        text: 'Team'
    },
    [CARRIES]: {
        text: 'Carries'
    },
    [YARDS_RUSHING]: {
        text: 'Rushing'
    },
    [YARDS_RUSHING_AVERAGE]: {
        text: 'Rushing (Avg)'
    },
    [TD_RUSHING]: {
        text: 'TD Rushes'
    },
    [LONG_RUSHING]: {
        text: 'Longest Rush'
    },
    [TARGETS]: {
        text: 'Targets'
    },
    [RECEPTIONS]: {
        text: 'Receptions'
    },
    [YARDS_RECEIVING]: {
        text: 'Receiving'
    },
    [YARDS_RECEIVING_AVERAGE]: {
        text: 'Receiving (Avg)'
    },
    [TD_RECEIVING]: {
        text: 'TD Catches'
    },
    [LONG_RECEIVING]: {
        text: 'Longest Catch'
    },
    [TOTAL_YARDS]: {
        text: 'Total Yards'
    },
    [TOTAL_TDS]: {
        text: 'Total TDs'
    }
};