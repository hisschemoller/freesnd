
export const ADD_FAVOURITE = 'ADD_FAVOURITE';

export function addFavourite(sound) {
    return {
        type: ADD_FAVOURITE,
        sound: sound
    };
}

export function addToFavourites(id) {
    return function(dispatch, getState) {
        const sound = getState().searchState.results.filter(sound => sound.id === id)[0];
        dispatch(addFavourite(sound));
    }
}
