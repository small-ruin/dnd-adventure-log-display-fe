export const baseUrl = '/small-ruin/';
export const Urls = {
    ADVENTURE: baseUrl + 'adventure/:id',
    LOG: baseUrl + 'log/:id',
    LOG_LIST: baseUrl + 'log/',
    getAdventureUrl: (id: string | number) => baseUrl + 'adventure/' + id,
    getLogUrl: (id: string | number) => baseUrl + 'log/' + id,

};
