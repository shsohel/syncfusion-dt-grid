import {
    ColumnDirective,
    ColumnsDirective, CommandColumn, Edit, Filter,
    Freeze,
    GridComponent,
    Inject, Page, Reorder,
    Resize,
    Sort
} from '@syncfusion/ej2-react-grids';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { getCostingByQuery } from '../redux/costing/actions';
import './dt.css';
import TablePagination from './Pagination';
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
    const [rowPerPage, setRowPerPage] = useState( 10 );
    const [sortedBy, setSortedBy] = useState( 'costingNumber' );
    const [orderBy, setOrderBy] = useState( 'desc' );
    const [selectedRowId, setSelectedRowId] = useState( [] );
    const [clearSelectedRow, setClearSelectedRow] = useState( false );

    let gridInstance;

    const paramsObj = {
        page: currentPage,
        perPage: rowPerPage,
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
    }, [currentPage, rowPerPage] )





    const pageSettings = {
        pageSize: false,

    }
    //Pagination
    //The action will  work when the page change
    const handlePagination = ( page ) => {
        console.log( page.selected )
        setCurrentPage( page.selected + 1 );
    };

    //Pagination
    //The action will  work when the row change
    const handleRowPerPage = ( perPageRow ) => {
        const rowNo = Number( perPageRow );
        setRowPerPage( rowNo );
        setCurrentPage( 1 )
    };



    const dataStateChange = ( props ) => {
        console.log( props )
        console.log( 'sohel' )
    }
    const dataSourceChanged = ( props ) => {
        console.log( props )
    }
    const actionBegin = ( props ) => {
        console.log( props )
        if ( props.requestType === "beginEdit" ) {
            console.log( gridInstance['isEdit'] );
            console.log( gridInstance )
            gridInstance['isEdit'] = false
        } else if ( props.requestType === "refresh" ) {
            //   console.log( console.log( 'props', JSON.stringify( props, null, 2 ) ) )
            console.log( gridInstance )

        } else {
            console.log( props )
            console.log( gridInstance )

            gridInstance['isEdit'] = false
        }
    }

    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: true, };

    const commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat', click: dataStateChange } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];

    const CommandTemplate = ( props ) => {
        console.log( props )
        return (
            <div>
                <Button >
                    Hello
                </Button>
            </div>
        );
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
                editSettings={editSettings}
                // allowPaging={true}
                name="DT"
                // pagerTemplate={pageTemplate}
                // pagerTemplate={<PaginationTemplate />}
                // pageSettings={{
                //     // pageCount: 100,
                //     // pageSizes: ['5', '10', '20', '40'],
                //     //  pageSize: rowsPerPage,
                //     // currentPage: currentPage,
                //     // totalRecordsCount: total
                // }}
                pageSettings={pageSettings}
                height='400'
                // dataSourceChanged={dataSourceChanged}
                //  dataStateChange={dataStateChange.bind( this )}
                // pagerTemplate={pagerTemplate}
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
                    <ColumnDirective field='currency' headerText='Currency' width='100' />
                    <ColumnDirective field='costingUom' headerText='Uom' width='100' />

                    <ColumnDirective headerText='Manage Records' width='160' commands={commands} ></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Resize, Reorder, Freeze, Sort, Filter, Page, CommandColumn, Edit]} />
            </GridComponent>
            <div>
                <TablePagination handlePagination={handlePagination} currentPage={currentPage} rowPerPage={rowPerPage} totalRecord={total} handleRowPerPage={handleRowPerPage} />
            </div>
        </div>
    </div > );
}
export default DataTable;