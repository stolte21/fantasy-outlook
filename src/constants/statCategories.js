export const RUSHING = 'RUSHING';
export const RECEIVING = 'RECEIVING';
export const RUSHING_AND_RECEIVING = 'RUSHING_AND_RECEIVING';

export const statCategories = [
    RUSHING,
    RECEIVING,
    RUSHING_AND_RECEIVING
];

export const categoriesConfig = {
    [RUSHING]: {
        name: 'Rushing'
    },
    [RECEIVING]: {
        name: 'Receiving'
    },
    [RUSHING_AND_RECEIVING]: {
        name: 'Rushing and Receiving'
    }
};