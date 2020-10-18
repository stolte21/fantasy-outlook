import { Record } from 'immutable';

export default new Record({

    id: '',     // espn player id
    name: '',

    // rushing
    carries: 0,
    yardsRushing: 0,
    yardsRushingAvg: 0,
    tdRushing: 0,
    longRushing: 0,

    // receiving
    receptions: 0,
    yardsReceiving: 0,
    yardsReceivingAvg: 0,
    tdReceiving: 0,
    longReceiving: 0,
    targets: 0

});