import { baseAxios } from "../../../services";
import { GET_COSTINGS_BY_QUERY } from "../action-types";
/// Convert Query String
export const convertQueryString = ( params ) => {
    const searchParams = new URLSearchParams( params );
    return searchParams;
};
export const getCostingByQuery = ( params, queryData ) => async dispatch => {
    // dispatch( costingDataLoaded() );
    await baseAxios.post( `costings/Grid?${convertQueryString( params )}`, queryData )
        .then( response => {

            if ( response.status === 200 ) {
                dispatch( {
                    type: GET_COSTINGS_BY_QUERY,
                    costings: response.data.data,
                    totalPages: response?.data?.totalRecords,
                    params,
                    queryObj: queryData
                } );
                //  dispatch( costingDataLoaded() );
            }

        } ).catch( ( response ) => {

            // dispatch( costingDataLoaded() );

        } );
};