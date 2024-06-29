import React, { useState, useEffect } from 'react'
import { Col, Container, Pagination, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Constants } from 'src/Constants'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Constants.getAllOrders)
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  const displayOrderID = (orderID) => {
    return orderID.substring(orderID.length - 6)
  }

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getClassNamesFor = (name) => {
    if (!sortConfig.key) {
      return
    }
    return sortConfig.key === name ? (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽') : undefined
  }

  const sortedOrders = () => {
    const sortableOrders = [...orders]
    if (sortConfig.direction === 'asc') {
      sortableOrders.sort((a, b) => (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1))
    } else if (sortConfig.direction === 'desc') {
      sortableOrders.sort((a, b) => (a[sortConfig.key] > b[sortConfig.key] ? -1 : 1))
    }
    return sortableOrders
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredOrders = () => {
    return sortedOrders().filter((order) => {
      const userFullName = `${order?.user?.firstName} ${order?.user?.lastName}`.toLowerCase()
      const productNames = order?.products
        ?.map((product) => product?.product?.name.toLowerCase())
        .join(' ')
      const orderId = displayOrderID(order?._id).toLowerCase()

      return (
        userFullName.includes(searchTerm.toLowerCase()) ||
        productNames.includes(searchTerm.toLowerCase()) ||
        orderId.includes(searchTerm.toLowerCase()) // Include this condition for Order ID search
      )
    })
  }
  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage
  const currentOrders = filteredOrders().slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const totalPages = Math.ceil(filteredOrders().length / itemsPerPage);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-info">ORDER LIST</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active text-info">Order List</li>
                  </ol>
                </div>
              </div>
            </Col>
          </Row>
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-shadow rounded-lg border my-2">
                <div className="card-body">
                  <Row>
                    <Col md={4} xs={12} className="mb-3 text-center">
                      <h3 className="fw-bolder text-info mb-0"> {orders?.length} </h3>
                      <p className="text-secondary">Total Orders</p>
                    </Col>
                  </Row>
                  <div className="dataTables_length my-1">
                    <div className="search-box">
                      <input
                        type="text"
                        id="search"
                        placeholder="Search "
                        name="search"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>

                  <Table striped bordered hover responsive className="my-2">
                    <thead>
                      <tr>
                        <th
                          onClick={() => requestSort('user._id')}
                          className={getClassNamesFor('user._id')}
                        >
                          Order ID {getClassNamesFor('user._id')}
                        </th>
                        <th
                          onClick={() => requestSort('user.firstName')}
                          className={getClassNamesFor('user.firstName')}
                        >
                          User {getClassNamesFor('user.firstName')}
                        </th>
                        <th
                          onClick={() => requestSort('products.length')}
                          className={getClassNamesFor('products.length')}
                        >
                          Products {getClassNamesFor('products.length')}
                        </th>
                        <th
                          onClick={() => requestSort('status')}
                          className={getClassNamesFor('status')}
                        >
                          Status {getClassNamesFor('status')}
                        </th>
                        <th
                          onClick={() => requestSort('orderDate')}
                          className={getClassNamesFor('orderDate')}
                        >
                          Order Date {getClassNamesFor('orderDate')}
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders
                        .filter((order) => order?.user)
                        .map((order, index) => (
                          <tr key={order?._id}>
                            <td>{displayOrderID(order?.orderId)}</td>
                            <td>
                              {order?.user?.firstName} {order?.user?.lastName}
                            </td>
                            <td>
                              {order?.cartId?.products?.length > 0 ? (
                                order.cartId.products.map((product) => (
                                  <div key={product._id}>
                                    {product.productId?.name} (Quantity: {product.quantity})
                                  </div>
                                ))
                              ) : (
                                <div>Donation/Investor</div>
                              )}
                            </td>
                            <td>{ order?.cartId?.products?.length > 0? order?.deliveryStatus: order?.status}</td>
                            <td>{new Date(order?.createdAt).toLocaleString()}</td>
                            <td>
                              <div className="icon-container">
                                <Link
                                  className="btn btn-sm btn-info text-white"
                                  to={`/orderDetails/${order?._id}`}
                                >
                                  <FaEye />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  {/* Pagination controls */}
                  <div className="d-flex justify-content-center">
                  <Pagination>
                    <Pagination.First onClick={() => paginate(1)} />
                    <Pagination.Prev
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {[...Array(totalPages).keys()].map((index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last onClick={() => paginate(totalPages)} />
                  </Pagination>
                </div>
                </div>
                {/* <Container>
                  <div className="col-sm-12 col-md-5">
                    <div className="dataTables_length">Showing 1 to 9 of 9 entries</div>
                  </div>
                  <div>
                    <button type="button" className="btn-outline-info m-1 btn-sm">
                      1
                    </button>
                  </div>
                </Container> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList
