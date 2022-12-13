import { GET_COSTINGS_BY_QUERY } from "../action-types";
const initialState = {
    isCostingDataLoaded: true,
    queryData: [],
    queryObj: [],
    total: 1,
    params: {},

};

const costingReducers = ( state = initialState, action ) => {
    switch ( action.type ) {

        case GET_COSTINGS_BY_QUERY:
            return {
                ...state,
                queryData: action.costings,
                total: action.totalPages,
                params: action.params,
                queryObj: action.queryObj
            };

        default:
            return state;
    }
};

export default costingReducers;