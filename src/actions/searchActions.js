/**
 * Action types
 */
export const INCREASE_SEARCH_COUNT = 'INCREASE_SEARCH_COUNT';
export const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
export const FETCH_SOUNDS = 'FETCH_SOUNDS';

/**
 * Action creators
 */
export function increaseSearchCount() {
    return { type: INCREASE_SEARCH_COUNT }
}

export function addToSearchHistory(queryString) {
    return { type: ADD_SEARCH_HISTORY, queryString: queryString }
}

export function fetchSounds(text) {
    return { type: FETCH_SOUNDS, text }
}