const initialState = {
    history: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY': {

            state.history = action.history;
            return { ...state };
        }

        default:
            return state;
    }
};
