const initialState = {
    visible: false,
    ComponentContent: <p>Hello</p>,
    callBackSubmit: (propsValue) => { alert('123'); },
    title: ''

};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER': {

            return { ...state, visible: true };
        }
        case 'CLOSE_DRAWER': {
            return { ...state, visible: false };
        }
        case 'OPEN_FORM_EDIT': {
            state.title = 'Edit Project';
            return { ...state, visible: true, ComponentContent: action.ComponentContent };
        }
        case 'SUBMIT_FORM': {
            return { ...state, callBackSubmit: action.callBackSubmit };
        }
        case 'OPEN_CREATE_TASK': {
            state.title = 'Create Task';
            return { ...state, visible: true, ComponentContent: action.ComponentContentDrawer };
        }
        case 'SUBMIT_FORM_CREATE_TASK': {
            return { ...state, callBackSubmit: action.callBackSubmit };
        }
        case 'OPEN_CREATE_USER': {
            state.title = 'Create User';
            return { ...state, visible: true, ComponentContent: action.ComponentContentDrawer };
        }
        case 'OPEN_EDIT_USER': {
            state.title = 'Edit User';
            return { ...state, visible: true, ComponentContent: action.ComponentContentDrawer };
        }

        default:
            return state;
    }
};
