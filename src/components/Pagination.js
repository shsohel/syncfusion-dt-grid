import ReactPaginate from 'react-paginate';
import { Col, Input, Label, Row } from 'reactstrap';

function TablePagination( { handlePagination, currentPage, rowPerPage, totalRecord, handleRowPerPage, rows = ["5", "10", "20", "50", "100"] } ) {
    const count = Number( Math.ceil( totalRecord / rowPerPage ) );
    return (
        <div>

            <div className="d-flex  justify-content-between align-items-center">
                <ReactPaginate
                    previousLabel={'Pre'}
                    nextLabel={'Next'}
                    pageCount={count || 1}
                    activeClassName="active"
                    forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                    onPageChange={( page ) => handlePagination( page )}
                    pageClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    nextClassName={'page-item next'}
                    previousClassName={'page-item prev'}
                    previousLinkClassName={'page-link'}
                    pageLinkClassName={'page-link'}
                    containerClassName={
                        'pagination react-paginate justify-content-end my-2 pr-1'
                    }
                />
                <div >
                    <Row>
                        <Col className='d-flex align-items-center'>
                            <Label for='rows-per-page' className='mb-0 me-1'>Row Per page:</Label>
                            <Input
                                bsSize="sm"
                                className='form-control'
                                type='select'
                                id='rows-per-page'
                                value={rowPerPage}
                                onChange={( e ) => {
                                    handleRowPerPage( e.target.value );
                                }}
                                name="rowPerPage"
                                style={{
                                    width: '5rem',

                                    backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                }}
                            >
                                {rows?.map( ( row, index ) => (
                                    <option key={index + 1} value={row}>
                                        {row}
                                    </option>
                                ) )}
                            </Input>


                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    )
}

export default TablePagination;