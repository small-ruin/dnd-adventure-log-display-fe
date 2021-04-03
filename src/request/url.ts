export const baseUrl = '/small-ruin';
export const Urls = {
    ROOT: baseUrl + '/',
    ADVENTURE_LIST: baseUrl + '/adventure',
    ADVENTURE: baseUrl + '/adventure/:id',
    LOG: baseUrl + '/log/:id',
    NOT_FOUND: baseUrl + '/404',
    ERROR: baseUrl + '/error',
    // link
    getAdventureUrl: (id: string | number) => baseUrl + '/adventure/' + id,
    getLogUrl: (id: string | number) => baseUrl + '/log/' + id,
};
