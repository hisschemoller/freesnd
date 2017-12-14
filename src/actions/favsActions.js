
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';

export function addToFavourites(sound) {
    return { type: ADD_TO_FAVOURITES, sound };
}