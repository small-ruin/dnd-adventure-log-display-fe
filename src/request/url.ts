export const baseUrl = '/small-ruin/';
export const Urls = {
    ADVENTURE_LIST: baseUrl + 'adventure',
    ADVENTURE: baseUrl + 'adventure/:id',
    LOG: baseUrl + 'log/:id',
    // LOG_LIST: baseUrl + 'log/',
    NOT_FOUND: baseUrl + '404',
    ERROR: baseUrl + 'error',
    getAdventureUrl: (id: string | number) => baseUrl + 'adventure/' + id,
    getLogUrl: (id: string | number) => baseUrl + 'log/' + id,
};
