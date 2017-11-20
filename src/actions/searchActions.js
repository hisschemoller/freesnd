/**
 * Action types
 */
export const COUNT = 'COUNT';
export const FETCH_SOUNDS = 'FETCH_SOUNDS';

/**
 * Action creators
 */
export function count() {
    return { type: COUNT }
}

export function fetchSounds(text) {
    return { type: FETCH_SOUNDS, text }
}