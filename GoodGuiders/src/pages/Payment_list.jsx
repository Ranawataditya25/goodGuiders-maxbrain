import React, { useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import FeatherIcon from 'feather-icons-react';

import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, InputGroup, Modal, Button } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Payment_list() {
    const [show, setShow] = useState(false);

    const Close_btn = () => setShow(false);
    const emailcreat = () => setShow(true);
    //  Inuut value start 
    const [formData, setFormData] = useState({
      fristname: '',
      lastname: '',
      Billno: '',
      Billdate: '',
      doctorname: '',
      admitdate: '',
      Discharge: '',
      Payment: '',
      PaymentStatus: '',
     
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    // Data Table 
    const sales = [
      {  "Bill No":"01","Student Name": "Brielle Williamson", "Mentor Name":"Dr. Anna Mull","Bill Date": "28/12/2022","Payment Method":"Cash","inventoryStatus": "paid","Amout":"$150" },
      {  "Bill No":"02","Student Name": "Cedric Kelly", "Mentor Name":"Dr. Hal Appeno","Bill Date": "25/10/2022","Payment Method":"Cheque","inventoryStatus": "panding","Amout":"$200" },
      {  "Bill No":"03","Student Name": "Charde Marshall", "Mentor Name":"Dr. Pat Agonia","Bill Date": "11/05/2022","Payment Method":"Credit Card","inventoryStatus": "paid","Amout":"$350" },
      {  "Bill No":"04","Student Name": "Dai Rios", "Mentor Name":"Dr. Paul Molive","Bill Date": "03/01/2023","Payment Method":"Debit Card","inventoryStatus": "unpaid","Amout":"$280" },
      {  "Bill No":"05","Student Name": "Garrett Winters", "Mentor Name":"Dr. Polly Tech","Bill Date": "28/12/2022","Payment Method":"Net Bancking","inventoryStatus": "unpaid","Amout":"$150" },
      {  "Bill No":"06","Student Name": "Gloria Little", "Mentor Name":"Dr. Poppa Cherry","Bill Date": "30/07/2022","Payment Method":"Insurence","inventoryStatus": "panding","Amout":"$260" },
      {  "Bill No":"07","Student Name": "Jena Gaines", "Mentor Name":"Dr. Saul T. Balls","Bill Date": "20/09/2022","Payment Method":"Cash","inventoryStatus": "panding","Amout":"$80" },
      {  "Bill No":"08","Student Name": "Pat Agonia", "Mentor Name":"Dr. Terry Aki","Bill Date": "28/09/2022","Payment Method":"Chaque","inventoryStatus": "unpaid","Amout":"$500" },
      {  "Bill No":"09","Student Name": "Paul Byrd", "Mentor Name":"Dr. Tiger Nixon","Bill Date": "20/06/2022","Payment Method":"Credit Card","inventoryStatus": "paid","Amout":"$620" },
      {  "Bill No":"10","Student Name": "Polly Tech", "Mentor Name":"Dr.William Stephin","Bill Date": "16/03/2022","Payment Method":"Debit Card","inventoryStatus": "paid","Amout":"$802" },
  
    ];
   
    const statusBodyTemplate = (rowData) => {
      return <span className={`badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }
    //  SearchFilter 
    const [filters1, setFilters1] = useState({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'representative': { value: null, matchMode: FilterMatchMode.IN },
      'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });
    const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const AmoutBodyTemplate = (rowData) => {
    return formatCurrency(rowData.Amout);
    }

    const filtersMap = {
      'filters1': { value: filters1, callback: setFilters1 },
    };
    const onGlobalFilterChange = (event, filtersKey) => {
      const value = event.target.value;
      let filters = { ...filtersMap[filtersKey].value };
      filters['global'].value = value;
      filtersMap[filtersKey].callback(filters);
    }
  
    const renderHeader = (filtersKey) => {
      const filters = filtersMap[`${filtersKey}`].value;
      const value = filters['global'] ? filters['global'].value : '';
  
      return (
        <div className="d-flex justify-content-end align-align-items-baseline">
          <Form.Group className="d-flex align-items-center">
            <Form.Label className="pe-3 mb-0"> Search</Form.Label>
            <InputGroup className=" px-2">
              <Form.Control type="search" className="form-control px-2" value={value || ''} onChange={(e) => onGlobalFilterChange(e, filtersKey)} placeholder="Global Search" />
            </InputGroup>
          </Form.Group>
        </div>
      );
    }
    const header1 = renderHeader('filters1');
  
  
    const actionBodyTemplate = () => {
      return (
        <React.Fragment>
          <div className="cart-action">
            <Link className="edit" to="/edit-patient">
              <FeatherIcon icon="edit" className="w-18" />
            </Link>
            <Link className="delete text-danger" to="">
              <FeatherIcon icon="trash-2" className="w-18" />
            </Link>
          </div>
        </React.Fragment>
      );
    }
  return (
    <>
      <div className="themebody-wrap">
        {/* Breadcrumb Start */}
        <PageBreadcrumb pagename="Payment" />
        {/* Breadcrumb End */}
        {/* theme body start */}
        <div className="theme-body">
          <Container fluid>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Row className="Product_list">
                      <Col md={12}>
                        <Link className="btn btn-primary float-end mb-15" onClick={emailcreat}>
                        Add new Appoitment
                        </Link>
                      </Col>
                      <DataTable value={sales} rows={10} header={header1} filters={filters1} onFilter={(e) => setFilters1(filters1)}
                        stateStorage="session" paginator rowsPerPageOptions={[5, 10, 50]}
                        paginatorTemplate="CurrentPageReport  FirstPageLink  PageLinks LastPageLink  RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" className="p-datatable-customers" >
                        <div field="Bill No" header="Bill No"  sortable></div>
                        <div field="Student Name" header="Student Name"  sortable></div>
                        <div field="Mentor Name" header="Mentor Name"  sortable></div>
                        <div field="Bill Date" header="Bill Date"  sortable></div>
                        <div field="Payment Method" header="Payment Method"  sortable></div>
                        
                        <div header="Status" body={statusBodyTemplate} sortable></div>
                        <div field="Amout" header="Amout" body={AmoutBodyTemplate} sortable></div>
                        <div field="Action" header="Action" sortable body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></div>
                      </DataTable>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {/* theme body end */}
      </div>
      {/* Modal Start  */}
      <Modal show={show} onHide={Close_btn}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Add New Payment</h5>
          </Modal.Title>
          <span className="close-modal" onClick={Close_btn}>
            <FeatherIcon icon="x" />
          </span>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Frist Name</Form.Label>
                  <Form.Control type="text" name="fristname" placeholder="Student First Name" value={formData.fristname} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastname" placeholder="Student Last Name" value={formData.lastname} onChange={handleInputChange} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Bill No</Form.Label>
                  <Form.Control type="text" name="Billno"  placeholder="Bill No" value={formData.Billno} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Bill Date</Form.Label>
                  <Form.Control type="text" name="Billdate"  placeholder="Bill Date" value={formData.Billdate} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Mentor Name</Form.Label>
                  <Form.Control type="text" name="doctorname"  placeholder="Mentor Name" value={formData.doctorname} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Admit Date</Form.Label>
                  <Form.Control type="text" name="admitdate"  placeholder="Admit Date" value={formData.admitdate} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Discharge Date</Form.Label>
                  <Form.Control type="text" name="Discharge"  placeholder="Discharge Date" value={formData.Discharge} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Payment Method</Form.Label>
                  <select className="form-select " name="Payment" value={formData.Payment} onChange={handleInputChange}>
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="CreditCard">Credit Card</option>
                    <option value="DebitCard">Debit Card</option>
                    <option value="NetBancking">Net Bancking</option>
                    <option value="Insurence">Insurence                         </option>
                    </select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Payment Status</Form.Label>
                  <select className="form-select hidesearch" name="PaymentStatus"  value={formData.PaymentStatus} onChange={handleInputChange}>
                    <option value="">Select Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid                         </option>
                    <option value="Partial">Partial</option>
                    </select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="btn btn-primary">Save</Button>
          <Button className="btn btn-danger" onClick={Close_btn}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* Modal End  */}
    </>
  )
}

