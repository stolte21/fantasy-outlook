export const CARRIES = 'CARRIES';
export const YARDS_RUSHING = 'YARDS_RUSHING';
export const YARDS_RUSHING_AVERAGE = 'YARDS_RUSHING_AVERAGE';
export const TD_RUSHING = 'TD_RUSHING';
export const LONG_RUSHING = 'LONG_RUSHING';

export const RECEPTIONS = 'RECEPTIONS';
export const YARDS_RECEIVING = 'YARDS_RECEIVING';
export const YARDS_RECEIVING_AVERAGE = 'YARDS_RECEIVING_AVERAGE';
export const TD_RECEIVING = 'TD_RECEIVING';
export const LONG_RECEIVING = 'LONG_RECEIVING';
export const TARGETS = 'TARGETS';

export const RUSHING_ATTRIBUTES = [
    CARRIES,
    YARDS_RUSHING,
    YARDS_RUSHING_AVERAGE,
    TD_RUSHING,
    LONG_RUSHING
];

export const RECEIVING_ATTRIBUTES = [
    RECEPTIONS,
    YARDS_RECEIVING,
    YARDS_RECEIVING_AVERAGE,
    TD_RECEIVING,
    LONG_RECEIVING,
    TARGETS
];

export const displayConfig = {
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
    [TARGETS]: {
        text: 'Targets'
    }
};