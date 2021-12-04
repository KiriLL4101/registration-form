const initialState = {
    params: {},
    user:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_PARAMS":
            return {
                ...state,
                params: {...action.payload}
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
};