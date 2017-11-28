/**
 * Action types
 */
export const INCREASE_SEARCH_COUNT = 'INCREASE_SEARCH_COUNT';
export const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
export const SET_QUERY = 'SET_QUERY';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE';
export const REQUEST_SOUNDS = 'REQUEST_SOUNDS';
export const RECEIVE_SOUNDS = 'RECEIVE_SOUNDS';
export const REJECT_SOUNDS = 'REJECT_SOUNDS';

/**
 * Action creators
 */
export function increaseSearchCount() {
    return { type: INCREASE_SEARCH_COUNT }
}

export function addToSearchHistory(query) {
    return { type: ADD_SEARCH_HISTORY, query: query }
}

export function setQuery(query) {
    return {
        type: SET_QUERY,
        query
    };
}

export function nextPage() {
    return {
        type: NEXT_PAGE
    };
}

export function previousPage() {
    return {
        type: PREVIOUS_PAGE
    };
}

export function requestSounds(query) {
    return {
        type: REQUEST_SOUNDS,
        query
    };
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
        fields = 'id,name,description,previews,images';
    return function(dispatch, getState) {
        const query = getState().searchState.query,
            page = getState().searchState.page;
        dispatch(requestSounds(query));
        return fetch(`${url}?format=json&query=${query}&token=${token}&page=${page}&fields=${fields}`)
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
