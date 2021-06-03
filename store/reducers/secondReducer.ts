import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';

const initialState = {
    name: 'pitter',
};

const secondReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return { ...state, ...action.payload.seconeReducer };
        case 'rotate111':
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};
export default secondReducer;
