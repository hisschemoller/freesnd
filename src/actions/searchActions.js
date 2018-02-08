
/**
 * Action creator generator.
 * @param  {String} type Action type for which to generate a creator function.
 * @param  {[type]} argNames [description]
 * @return {Function} Action creator function.
 */
function makeActionCreator(type, ...argNames) {
    return function (...args) {
        let action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action;
    }
}

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
export const REQUEST_SOUND = 'REQUEST_SOUND';
export const RECEIVE_SOUND = 'RECEIVE_SOUND';
export const REJECT_SOUND = 'REJECT_SOUND';

/**
 * Action creators
 */
export const addToSearchHistory = makeActionCreator(ADD_SEARCH_HISTORY);
export const setQuery = makeActionCreator(SET_QUERY, 'query');
export const setSort = makeActionCreator(SET_SORT, 'sort');
export const gotoPage = makeActionCreator(GOTO_PAGE, 'page');
export const selectSound = makeActionCreator(SELECT_SOUND, 'index');
export const nextSound = makeActionCreator(NEXT_SOUND);
export const previousSound = makeActionCreator(PREVIOUS_SOUND);
export const requestSounds = makeActionCreator(REQUEST_SOUNDS, 'query');
export const receiveSounds = makeActionCreator(RECEIVE_SOUNDS, 'query', 'sounds');
export const rejectSounds = makeActionCreator(REJECT_SOUNDS, 'error');
export const requestSound = makeActionCreator(REQUEST_SOUND, 'soundID');
export const receiveSound = makeActionCreator(RECEIVE_SOUND, 'id', 'sound');
export const rejectSound = makeActionCreator(REJECT_SOUND, 'error');

/**
 * Async actions
 */
export function fetchSounds() {
    return function(dispatch, getState, api) {
        const query = getState().searchState.query,
            sort = getState().searchState.sort,
            page = getState().searchState.page,
            pageSize = getState().searchState.pageSize,
            fields = 'id,name,previews,images,username,created,duration,num_downloads,avg_rating,tags';
        dispatch(requestSounds(query));
        return fetch(`${api.url}search/text/?format=json&query=${query}&sort=${sort}&page=${page}&page_size=${pageSize}&fields=${fields}&token=${api.token}`)
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

export function fetchSound(id) {
    return function(dispatch, getState, api) {
        // check if data already exists
        if (!getState().searchState.results.filter(sound => sound.id === id)[0].channels) {
            dispatch(requestSound(id));
            return fetch(`${api.url}sounds/${id}/?token=${api.token}`)
                .then(
                    response => response.json(),
                    error => dispatch(rejectSound(error))
                )
                .then(
                    json => dispatch(receiveSound(id, json)),
                    error => dispatch(rejectSound(error))
                )
        } else {
            return Promise.resolve();
        }
    }
}
