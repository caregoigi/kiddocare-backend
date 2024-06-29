import React, { useState, useEffect } from 'react';
import { FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { Constants } from 'src/Constants';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const MySwal = withReactContent(Swal);

const UserList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(Constants.getPatients);
      if (response.ok) {
        const data = await response.json();
        setCustomers(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch patient');
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(Constants.importPatientCsv, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        MySwal.fire({
          icon: 'success',
          title: 'Import Successful',
          text: 'Patients imported successfully.',
        });
        setShowModal(false);
        setSelectedFile(null);
        // Fetch updated customers list
        fetchCustomers();
      } else {
        console.error('Failed to import patients');
      }
    } catch (error) {
      console.error('Error importing patients:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${Constants.deletePatient}?userId=${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.id !== userId));
        MySwal.fire({
          icon: 'success',
          title: 'User Deleted!',
          text: 'The user has been successfully deleted.',
        });
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredCustomers = Array.isArray(customers) ? customers.filter((customer) =>
    Object.values(customer).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) : [];

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (columnA && columnB) {
      const valueA = typeof columnA === 'string' ? columnA : String(columnA);
      const valueB = typeof columnB === 'string' ? columnB : String(columnB);

      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }

    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-content">
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-info">PATIENT LIST</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item text-info active">Patient List</li>
                  </ol>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="card custom-shadow rounded-lg border my-3">
                <div className="card-body">
                  <Row>
                    <Col md={4} xs={12} className="mb-3 text-center">
                      <h3 className="fw-bolder text-info mb-0">{customers.length}</h3>
                      <p className="text-secondary">Total Patients</p>
                    </Col>
                  </Row>

                  <div className="dataTables_length mb-2">
                    <label>
                      <Link className="btn btn-sm btn-primary text-white" to={`/dashboard`}>
                        <FaPlus title="Add Patient" /> Add New
                      </Link>
                      <Button
                        className="btn btn-sm btn-info text-white ms-3"
                        onClick={() => setShowModal(true)}
                      >
                        <FaPlus title="Import Patients" /> Import Patient
                      </Button>
                    </label>
                    <div className="search-box">
                      <input
                        type="text"
                        id="search"
                        placeholder="Search "
                        name="search"
                        className="form-control "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="table-responsive">
                    <Table responsive bordered hover>
                      <thead>
                        <tr>
                          <th onClick={() => handleSort('doctorId')}>
                            Doctor Id
                            {sortColumn === 'doctorId' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('patientId')}>
                            Patient Id
                            {sortColumn === 'patientId' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('parentName')}>
                            Parent Name
                            {sortColumn === 'parentName' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('parentEmail')}>
                            Parent Email
                            {sortColumn === 'parentEmail' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('parentPhone')}>
                            Parent Phone
                            {sortColumn === 'parentPhone' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('firstName')}>
                            First Name
                            {sortColumn === 'firstName' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('lastName')}>
                            Last Name
                            {sortColumn === 'lastName' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('email')}>
                            Email
                            {sortColumn === 'email' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('dateOfBirth')}>
                            Date Of Birth
                            {sortColumn === 'dateOfBirth' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('address')}>
                            Address
                            {sortColumn === 'address' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems?.map((customer, index) => (
                          <tr key={customer?.id}>
                            <td>{customer?.doctorId}</td>
                            <td>{customer?.patientId}</td>
                            <td>{customer?.parentName}</td>
                            <td>{customer?.parentEmail}</td>
                            <td>{customer?.parentPhone}</td>
                            <td>{customer?.firstName}</td>
                            <td>{customer?.lastName}</td>
                            <td>{customer?.email}</td>
                            <td>{customer?.dateOfBirth}</td>
                            <td>{customer?.address}</td>
                            <td>
                              <div className="icon-container">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  title="Delete Patient"
                                  onClick={() => {
                                    MySwal.fire({
                                      title: 'Are you sure?',
                                      text: 'Once deleted, you will not be able to recover this patient!',
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonText: 'Yes, delete it!',
                                      cancelButtonText: 'No, cancel!',
                                      reverseButtons: true,
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleDeleteUser(customer.id);
                                      }
                                    });
                                  }}
                                >
                                  <FaTrash />
                                </Button>
                                <Link
                                  className="btn btn-sm btn-info text-white"
                                  to={`/doctorDetails/${customer.id}`}
                                >
                                  <FaEye title="View Patient" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Container>
                    <div className="col-sm-12 col-md-5">
                      <div className="dataTables_length">
                        Showing {indexOfFirstItem + 1} to{' '}
                        {Math.min(indexOfLastItem, customers.length)} of {customers.length} entries
                      </div>
                    </div>
                    <div>
                      {Array.from({
                        length: Math.ceil(customers.length / itemsPerPage),
                      }).map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`btn ${
                            currentPage === index + 1
                              ? 'btn-info rounded-circle text-white m-1'
                              : 'btn-outline-info m-1 btn-sm'
                          }`}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </Container>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Import Patients</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFile">
                <Form.Label>
                  Choose CSV File
                  <a
                    className="btn btn-sm btn-primary text-white ms-2"
                    href="/patient_sample_template.csv"
                    download
                  >
                    <FaPlus title="Download Patient CSV Sample" /> Sample Template
                  </a>
                </Form.Label>
                <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleFileUpload}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;
