import React, { useState, useEffect } from 'react'
import { FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { Constants } from 'src/Constants'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
const MySwal = withReactContent(Swal)

const UserList = () => {
  const [customers, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(Constants.getAllUsers)
        if (response.ok) {
          const data = await response.json()
          setCustomers(data)
        } else {
          console.error('Failed to fetch customers')
        }
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }

    fetchCustomers()
  }, [])

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }
  // Filter customers based on the search term
  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    const columnA = a[sortColumn]
    const columnB = b[sortColumn]

    if (columnA && columnB) {
      const valueA = typeof columnA === 'string' ? columnA : String(columnA)
      const valueB = typeof columnB === 'string' ? columnB : String(columnB)

      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB)
      } else {
        return valueB.localeCompare(valueA)
      }
    }

    return 0
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${Constants.deleteDoctor}?userId=${userId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        // Remove the deleted user from the local state
        setCustomers(customers.filter((customer) => customer.id !== userId))
        MySwal.fire({
          icon: 'success',
          title: 'User Deleted!',
          text: 'The user has been successfully deleted.',
        })
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div className="main-content">
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-info">DOCTOR LIST</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item text-info active">Doctor List</li>
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
                      <p className="text-secondary">Total Doctors</p>
                    </Col>
                  </Row>

                  <div className="dataTables_length mb-2">
                    <label>
                      <Link
                          className="btn btn-sm btn-primary text-white"
                          to={`/addNewDoctor`}
                        >
                          <FaPlus title="Add Doctor" /> Add New
                        </Link>
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
                    <Table responsive bordered22 hover>
                      <thead>
                        <tr>
                          <th onClick={() => handleSort('doctorId')}>
                            Doctor Id
                            {sortColumn === 'doctorId' && (
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

                          {/* <th onClick={() => handleSort('city')}>
                            City
                            {sortColumn === 'city' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th> */}

                          <th onClick={() => handleSort('contactNumbers')}>
                            Contact Numbers
                            {sortColumn === 'contactNumbers' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>
                          <th onClick={() => handleSort('username')}>
                            Username
                            {sortColumn === 'username' && (
                              <span>{sortOrder === 'asc' ? ' 🔽' : ' 🔼'}</span>
                            )}
                          </th>

                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems?.map((customer, index) => (
                          <tr key={customer?._id}>
                            <td>{customer?.doctorId}</td>
                            <td>{customer?.firstName}</td>
                            <td>{customer?.lastName}</td>

                            <td>{customer?.email}</td>
                            <td>{customer?.contactNumbers}</td>
                            <td>{customer?.username}</td>
                            <td>
                              <div className="icon-container">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  title="Delete Doctor"
                                  onClick={() => {
                                    MySwal.fire({
                                      title: 'Are you sure?',
                                      text: 'Once deleted, you will not be able to recover this user!',
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonText: 'Yes, delete it!',
                                      cancelButtonText: 'No, cancel!',
                                      reverseButtons: true,
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleDeleteUser(customer.id)
                                      }
                                    })
                                  }}
                                >
                                  <FaTrash />
                                </Button>
                                <Link
                                  className="btn btn-sm btn-info text-white"
                                  to={`/doctorDetails/${customer.id}`}
                                >
                                  <FaEye title="View User" />
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
      </div>
    </div>
  )
}

export default UserList
