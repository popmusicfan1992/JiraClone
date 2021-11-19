const initialState = {
    projectEdit: {
        id: 0,
        projectName: "string",
        creator: 0,
        description: "string",
        categoryId: "2"
    },
    projectDetails: {

    }
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_PROJECT': {
            return { ...state, projectEdit: action.projectEdit };
        }
        case 'PUT_PROJECT_DETAILS': {
            return { ...state, projectDetails: action.projectDetails };
        }

        default:
            return { ...state };
    }
};
