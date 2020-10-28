export const RUSHING = 'rusher';
export const RECEIVING = 'receiver';
export const RUSHING_AND_RECEIVING = 'both';

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