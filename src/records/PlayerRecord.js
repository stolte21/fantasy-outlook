import { Record } from 'immutable';
import {
    ID,
    NAME,
    TEAM,
    PLAYER_TYPE,
    CARRIES,
    YARDS_RUSHING,
    YARDS_RUSHING_AVERAGE,
    TD_RUSHING,
    LONG_RUSHING,
    RECEPTIONS,
    YARDS_RECEIVING,
    YARDS_RECEIVING_AVERAGE,
    TD_RECEIVING,
    LONG_RECEIVING,
    TARGETS,
    TOTAL_YARDS,
    TOTAL_TDS
} from '../constants/statAttributes';

export default Record({
    [ID]: '',
    [NAME]: '',
    [TEAM]: '',
    [PLAYER_TYPE]: '',
    [CARRIES]: 0,
    [YARDS_RUSHING]: 0,
    [YARDS_RUSHING_AVERAGE]: 0,
    [TD_RUSHING]: 0,
    [LONG_RUSHING]: 0,
    [RECEPTIONS]: 0,
    [YARDS_RECEIVING]: 0,
    [YARDS_RECEIVING_AVERAGE]: 0,
    [TD_RECEIVING]: 0,
    [LONG_RECEIVING]: 0,
    [TARGETS]: 0,
    [TOTAL_YARDS]: 0,
    [TOTAL_TDS]: 0,
});