import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Constants } from 'src/Constants'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(Constants.getAllUsers)
        if (response.ok) {
          const data = await response.json()
          setUsers(data)
        } else {
          console.error('Failed to fetch user data')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(Constants.getAllProduct)
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        } else {
          console.error('Failed to fetch product data')
        }
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    fetchProducts()
  }, [])
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

  const countUserType = (userType) => {
    return users.filter((user) => user.userType === userType).length
  }

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 text-info">DASHBOARD </h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="text-info breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="card custom-shadow rounded-lg border my-3">
                  <div className="card-body">
                    <Row className="mt-4">
                      <Col>
                        <div className="dashboard-card ">
                          <div>
                            <h5>Total Doctors</h5>
                            <div className="text-center">
                              <Link
                                to=""
                              >
                                <b style={{ color: 'black' }}>0</b>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="dashboard-card">
                          <div>
                            <h5>Total Patients</h5>
                            <div className="text-center">
                              <Link
                                to=""
                              >
                                <b style={{ color: 'black' }}> 0</b>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="dashboard-card">
                          <div>
                            <h5>Total Appointments</h5>
                            <div className="text-center">
                              <Link
                                to=""
                              >
                                <b style={{ color: 'black' }}>0</b>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    {/* <Row className="mt-4">
                      <Col>
                        <div className="dashboard-card">
                          <div>
                            <h5>Normal users</h5>
                            <div className="text-center">
                              <Link
                                to={{
                                  pathname: '/customerList',
                                  state: { selectedUserType: 'Normal User' },
                                }}
                              >
                                <b style={{ color: 'black' }}>{countUserType('Normal User')}</b>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="dashboard-card">
                          <div>
                            <h5>Total Products</h5>
                            <div className="text-center">
                              {' '}
                              <b>{products?.length}</b>{' '}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="dashboard-card">
                          <div>
                            <h5>Total Orders</h5>
                            <div className="text-center">
                              {' '}
                              <b>{orders?.length}</b>{' '}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row> */}

                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="card custom-shadow rounded-lg border my-3">
                  <div className="card-body">
                    <Row className="mt-4">
                      <Col>
                        <div className="dashboard-card">
                          <Card.Body>
                            <h4>Doctor Mgmt</h4>
                            <Link to="/doctorList" className="btn btn-primary btn-sm">
                              Manage Doctors
                            </Link>
                          </Card.Body>
                        </div>
                      </Col>
                      <Col>
                        <div className="dashboard-card">
                          <Card.Body>
                            <h4>Patient Mgmt</h4>
                            <Link to="/doctorList" className="btn btn-primary btn-sm">
                              Manage Patients
                            </Link>
                          </Card.Body>
                        </div>
                      </Col>
                      <Col>
                        <div className="dashboard-card">
                          <Card.Body>
                            <h4>Specialities Mgmt</h4>
                            <Link to='' className="btn btn-primary btn-sm">
                              Manage Specialities
                            </Link>
                          </Card.Body>
                        </div>
                      </Col>
                      <Col>
                        <div className="dashboard-card">
                          <Card.Body>
                            <h4>Booking Mgmt</h4>
                            <Link to='' className="btn btn-primary btn-sm">
                              Manage Booking
                            </Link>
                          </Card.Body>
                        </div>
                      </Col>
                    </Row>
                    {/* <Row className="mt-4">
                      <Col>
                        <div className="dashboard-card">
                          <Card.Body>
                            <h4>Content Mgmt</h4>
                            <Link to='' className="btn btn-primary btn-sm">
                              Manage Content
                            </Link>
                          </Card.Body>
                        </div>
                      </Col>
                      <Col>
                        <div className="dashboard-card">
                          <Card.Body>
                            <h4>Subscriptions Mgmt </h4>
                            <Link to='' className="btn btn-primary btn-sm">
                              Manage Subscription
                            </Link>
                          </Card.Body>
                        </div>
                      </Col>

                    </Row> */}
                    <Row className="mt-4"></Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
