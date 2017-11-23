/**
 * Action types
 */
export const INCREASE_SEARCH_COUNT = 'INCREASE_SEARCH_COUNT';
export const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
export const REQUEST_SOUNDS = 'REQUEST_SOUNDS';
export const RECEIVE_SOUNDS = 'RECEIVE_SOUNDS';
export const REJECT_SOUNDS = 'REJECT_SOUNDS';

/**
 * Action creators
 */
export function increaseSearchCount() {
    return { type: INCREASE_SEARCH_COUNT }
}

export function addToSearchHistory(queryString) {
    return { type: ADD_SEARCH_HISTORY, queryString: queryString }
}

export function requestSounds(queryString) {
    return {
        type: REQUEST_SOUNDS,
        queryString
    };
}

export function receiveSounds(queryString, json) {
    return {
        type: RECEIVE_SOUNDS,
        queryString,
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

export function fetchSounds(queryString) {
    const url = 'https://freesound.org/apiv2/search/text/',
        token = '97fXJpalkrThSLwam15I5FZBSqYOHvk3DUbwCj65',
        page = 1,
        fields = 'id,name,description,previews,images';
    return function(dispatch) {
        dispatch(requestSounds(queryString));
        return fetch(`${url}?format=json&query=${queryString}&token=${token}&page=${page}&fields=${fields}`)
            .then(
                response => response.json(),
                error => dispatch(rejectSounds(error))
            )
            .then(
                json => dispatch(receiveSounds(queryString, json)),
                error => dispatch(rejectSounds(error))
            )
    }
}
