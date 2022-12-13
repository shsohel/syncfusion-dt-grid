import {
    ColumnDirective,
    ColumnsDirective,
    Filter,
    Freeze,
    GridComponent,
    Inject, Page, Reorder,
    Resize,
    Sort
} from '@syncfusion/ej2-react-grids';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCostingByQuery } from '../redux/costing/actions';

import './dt.css';
function DataTable() {
    const defaultFilteredArrayValue = [
        {
            column: "costingNumber",
            value: ''
        },

        {
            column: "buyerId",
            value: ''
        },
        {
            column: "styleId",
            value: ''
        },
        {
            column: "orderId",
            value: ''
        },
        {
            column: "status",
            value: ''
        }
    ];
    const defaultFilterValue = {
        costingNumber: '',
        buyer: null,
        style: null,
        order: null,
        status: null
    };
    const dispatch = useDispatch();
    const { isCostingDataLoaded,
        queryData,
        queryObj,
        total,
        params, } = useSelector( ( { costings } ) => costings );

    const [isActive, setIsActive] = useState( true );
    const [filterObj, setFilterObj] = useState( defaultFilterValue );
    const [filteredArray, setFilteredArray] = useState( defaultFilteredArrayValue );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [rowsPerPage, setRowsPerPage] = useState( 40 );
    const [sortedBy, setSortedBy] = useState( 'costingNumber' );
    const [orderBy, setOrderBy] = useState( 'desc' );
    const [selectedRowId, setSelectedRowId] = useState( [] );
    const [clearSelectedRow, setClearSelectedRow] = useState( false );

    let gridInstance;

    const paramsObj = {
        page: currentPage,
        perPage: rowsPerPage,
        sortedBy,
        orderBy,
        isActive,
        isSetStyle: false
    };

    const filteredData = filteredArray.filter( filter => filter.value?.length );

    const getAllCostings = () => {
        const filteredData = filteredArray.filter( filter => filter.value?.length );
        dispatch( getCostingByQuery( paramsObj, filteredData ) )
    }

    useEffect( () => {
        getAllCostings();
        // return () => {
        // }
    }, [] )


    const handlePageChange = ( page ) => {
        console.log( page )
        setCurrentPage( page.currentPage )
        setRowsPerPage( page.pageSize )
        dispatch(
            getCostingByQuery( {
                ...paramsObj,
                page: page.currentPage,
                perPage: page.pageSize,

            }, filteredData )
        );
        // setCurrentPage( page.selected + 1 );

    }
    console.log( total )


    function actionBegin( args ) {
        console.log( args )
        if ( args.requestType === "paging" ) {
            console.log( gridInstance.pageSettings.properties )
            console.log( gridInstance )
            handlePageChange( gridInstance.pageSettings.properties )
        }
        if ( args.requestType === "refresh" ) {


            ///pagination
            //  console.log( args );
            // console.log( gridInstance.pageSettings.properties )
        }
        // console.log( gridInstance.pageSettings.properties )
        // if ( args.requestType === 'save' ) {
        //     if ( gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top' ) {
        //         args.index = ( gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize ) - gridInstance.pageSettings.pageSize;
        //     }
        //     else if ( gridInstance.editSettings.newRowPosition === 'Bottom' ) {
        //         args.index = ( gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize ) - 1;
        //     }
        // }
    }
    return ( <div className='control-pane'>
        <div className='control-section '>
            <GridComponent
                ref={grid => gridInstance = grid}
                dataSource={queryData}
                allowSorting={true}
                allowResizing={true}
                allowReordering={true}
                allowFiltering={true}
                allowPaging={true}
                name="DT"

                filterSettings={{ columns: [] }}
                // pagerTemplate={<PaginationTemplate />}
                pageSettings={{
                    pageCount: 4,
                    pageSizes: ['5', '10', '20', '40'],
                    pageSize: rowsPerPage,
                    currentPage: currentPage,
                    totalRecordsCount: total
                }}
                height='400'
                actionBegin={actionBegin.bind( this )}

            >
                <ColumnsDirective>
                    <ColumnDirective
                        freeze='Left'
                        allowResizing={false}
                        allowReordering={false}
                        allowFiltering={false}
                        field='sysId'
                        headerText='SYS ID'
                        minWidth='40'
                        width='150'
                        maxWidth='300'
                    />
                    <ColumnDirective field='costingNumber' headerText='COST NO' minWidth={80} width='140' />
                    <ColumnDirective field='buyerName' headerText='Buyer' minWidth={80} width='120' />
                    <ColumnDirective field='styles' headerText='Style' minWidth={80} width='120' />
                    <ColumnDirective field='email' headerText='E-mail' width='100' />
                    <ColumnDirective field='gender' headerText='Gender' width='100' />
                    <ColumnDirective field='phoneNumber' headerText='Phone' width='100' />
                    <ColumnDirective field='state' headerText='State' width='100' />
                    <ColumnDirective field='postalCode' headerText='Postal Code' width='100' />
                    <ColumnDirective field='country' headerText='Country' width='100' />
                    <ColumnDirective field='university' headerText='University' width='200' />

                </ColumnsDirective>
                <Inject services={[Resize, Reorder, Freeze, Sort, Filter, Page]} />
            </GridComponent>
        </div>
    </div > );
}
export default DataTable;