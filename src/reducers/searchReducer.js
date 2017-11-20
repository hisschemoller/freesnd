
const initialState = {
    count: 0,
    value: ''
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case 'COUNT':
            return Object.assign({}, state, {
                count: state.count + 1
            });
        default:
            return state;
    }
}