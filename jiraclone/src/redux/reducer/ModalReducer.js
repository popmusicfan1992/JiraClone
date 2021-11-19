import React from "react";

const initialState = {
    Component: <p>Nội dung </p>
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_FORM': {
            state.Component = action.Component;
            return { ...state };
        }




        default:
            return state;
    }
};
