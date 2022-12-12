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
import * as React from 'react';
import person from '../assets/data/data.json';
function DataTable() {

    let gridInstance;
    function actionBegin( args ) {
        console.log( args )
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
                dataSource={person}
                allowSorting={true}
                allowResizing={true}
                allowReordering={true}
                allowFiltering={true}
                allowPaging={true}
                filterSettings={{ columns: [] }}
                // pagerTemplate={<PaginationTemplate />}
                pageSettings={{ pageCount: 4, pageSizes: ['All', '5', '10', '20', '40'], pageSize: '10' }}
                height='400'
                actionBegin={actionBegin.bind( this )}
            >
                <ColumnsDirective>
                    <ColumnDirective
                        freeze='Left'
                        allowResizing={false}
                        allowReordering={false}
                        allowFiltering={false}
                        field='id'
                        headerText='ID'
                        minWidth='40'
                        width='50'
                        maxWidth='300'
                    />
                    <ColumnDirective field='firstName' headerText='Name' minWidth={80} width='80' />
                    <ColumnDirective field='lastName' headerText='Last Name' minWidth={80} width='80' />
                    <ColumnDirective field='dateOfBirth' headerText='Birth Date' minWidth={80} width='80' format='yMd' />
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