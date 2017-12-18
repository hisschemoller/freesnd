
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';

export function removeFavourite(id) {
    return { type: REMOVE_FAVOURITE, id };
}

export function addFavourite(sound) {
    return { type: ADD_FAVOURITE, sound };
}

export function addToFavourites(id) {
    return function(dispatch, getState) {
        const sound = getState().searchState.results.filter(sound => sound.id === id)[0];
        dispatch(addFavourite(sound));
    }
}
