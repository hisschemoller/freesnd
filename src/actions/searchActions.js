/**
 * Action types
 */
export const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
export const SET_QUERY = 'SET_QUERY';
export const SET_SORT = 'SET_SORT';
export const GOTO_PAGE = 'GOTO_PAGE';
export const SELECT_SOUND = 'SELECT_SOUND';
export const NEXT_SOUND = 'NEXT_SOUND';
export const PREVIOUS_SOUND = 'PREVIOUS_SOUND';
export const REQUEST_SOUNDS = 'REQUEST_SOUNDS';
export const RECEIVE_SOUNDS = 'RECEIVE_SOUNDS';
export const REJECT_SOUNDS = 'REJECT_SOUNDS';

/**
 * Action creators
 */
export function addToSearchHistory() {
    return { type: ADD_SEARCH_HISTORY }
}

export function setQuery(query) {
    return { type: SET_QUERY, query };
}

export function setSort(sort) {
    return { type: SET_SORT, sort };
}

export function gotoPage(page) {
    return { type: GOTO_PAGE, page };
}

export function selectSound(index) {
    return { type: SELECT_SOUND, index };
}

export function nextSound() {
    return { type: NEXT_SOUND };
}

export function previousSound() {
    return { type: PREVIOUS_SOUND };
}

export function requestSounds(query) {
    return { type: REQUEST_SOUNDS, query };
}

export function receiveSounds(query, json) {
    return {
        type: RECEIVE_SOUNDS,
        query,
        // sounds: json.data.children.map(child => child.data),
        sounds: json,
        receivedAt: Date.now()
    };
}

export function rejectSounds(error) {
    return {
        type: REJECT_SOUNDS,
        error: error
    };
}

export function fetchSounds() {
    const url = 'https://freesound.org/apiv2/search/text/',
        token = '97fXJpalkrThSLwam15I5FZBSqYOHvk3DUbwCj65',
        fields = 'id,name,description,previews,images,username,created,duration,num_downloads,avg_rating,tags';
    return function(dispatch, getState) {
        const query = getState().searchState.query,
            sort = getState().searchState.sort,
            page = getState().searchState.page,
            pageSize = getState().searchState.pageSize;
        dispatch(requestSounds(query));
        return fetch(`${url}?format=json&query=${query}&sort=${sort}&page=${page}&page_size=${pageSize}&fields=${fields}&token=${token}`)
            .then(
                response => response.json(),
                error => dispatch(rejectSounds(error))
            )
            .then(
                json => dispatch(receiveSounds(query, json)),
                error => dispatch(rejectSounds(error))
            )
    }
}
