import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';

const initialState = {
    showAlert: false,
};

const firstReducer = (state = initialState, action) => {
    console.log(action, 'mmmmmmmm');
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return { ...state, ...action.payload.firstReducer };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export default firstReducer;
