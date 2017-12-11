
export const getPreviewURL = state => {
    const hasResults = state.results && state.results.length > 0;
    const hasPreview = state.selectedIndex !== null && state.results[state.selectedIndex];
    const previewURL = hasPreview ? state.results[state.selectedIndex].previews['preview-lq-mp3'] : null;
    return Object.assign({}, state, {
        previewURL: previewURL
    };
});