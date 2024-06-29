import React, { useState, useEffect } from 'react'
import { Card, ListGroup, ListGroupItem, Button, Spinner, Modal, Form } from 'react-bootstrap'
import './OrderDetails.css'
import { Link, useParams } from 'react-router-dom'
import { Constants } from 'src/Constants'
import Swal from 'sweetalert2'

const OrderDetails = () => {
  const [order, setOrder] = useState(null)
  const { id } = useParams()

  // State variables for the modal
  const [showModal, setShowModal] = useState(false)
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch('https://mastitisapi.goigi.me/api/order/order/' + id)
        const data = await response.json()
        setOrder(data)
      } catch (error) {
        console.error('Error fetching order details:', error)
      }
    }

    fetchOrderDetails()
  }, [id])

  // Function to handle opening and closing the modal
  const handleModalShow = () => setShowModal(true)
  const handleModalClose = () => setShowModal(false)

  // Function to handle updating the order status
  const handleStatusChange = async () => {
    try {
      const response = await fetch(Constants.changeOrderStatus + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      if (response.ok) {
        Swal.fire({
          text: 'Order status updated successfully!',
          icon: 'success',
          timer: 1000,
        })
        const updatedOrderResponse = await fetch('https://mastitisapi.goigi.me/api/order/order/' + id)
        const updatedOrderData = await updatedOrderResponse.json()

        setOrder(updatedOrderData)

        handleModalClose()
      } else {
        console.error('Failed to update order status:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const calculateProductPrice = (product) => {
    const userType = order?.user?.userType

    switch (userType) {
      case 'Normal User':
        return product?.productId?.price
      case 'Licensed User':
        return product?.productId?.licencedUserPrice
      case 'Farmer':
        return product?.productId?.farmerPrice
      case 'Veterinarian':
        return product?.productId?.veterinarianPrice
      default:
        return 0
    }
  }

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              {order ? (
                <div className="card custom-shadow rounded-lg border my-2">
                  <div className="card-body">
                    <h4 className="mb-4 text-info">Order Details</h4>
                    <div className="row">
                      <div className="dataTables_length">
                        <div></div>
                        <div className="search-box mb-2">
                          {/* Button to trigger the modal */}
                         
                         {order?.cartId?.products?.length > 0 && (
                           <Button variant="info" onClick={handleModalShow}>
                           Change Order Status
                         </Button>
                         )}
                          <Modal show={showModal} onHide={handleModalClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Change Order Status</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group controlId="newStatus">
                                  <Form.Label>New Status</Form.Label>
                                  <Form.Control
                                    as="select"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                  </Form.Control>
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleModalClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleStatusChange}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <Card className="mb-2">
                          <Card.Header as="h5" className=" text-info">
                            User Details
                          </Card.Header>
                          <ListGroup variant="flush">
                            <ListGroupItem>
                              Name: {order?.user?.firstName} {order?.user?.lastName}
                            </ListGroupItem>
                            <ListGroupItem>User Type: {order?.user?.userType}</ListGroupItem>
                            <ListGroupItem>Contact: {order?.user?.contactNumbers}</ListGroupItem>
                            <ListGroupItem>Email: {order?.user?.emailAddresses}</ListGroupItem>
                            <ListGroupItem>
                              Address: {order?.user?.streetAddress}, {order?.user?.city},{' '}
                              {order?.user?.state}, {order?.user?.country}, {order?.user?.zipCode}
                            </ListGroupItem>
                          </ListGroup>
                        </Card>
                      </div>
                      <div className="col-md-6">
                        <Card>
                          <Card.Header as="h5" className=" text-info">
                            Order Details
                          </Card.Header>
                          <ListGroup variant="flush">
                            <ListGroupItem>Status: { order?.cartId?.products?.length > 0? order?.deliveryStatus: order?.status}</ListGroupItem>
                            <ListGroupItem>
                              Order Date: {new Date(order?.createdAt).toLocaleString()}
                            </ListGroupItem>
                          </ListGroup>
                        </Card>
                        <Card className="mt-4">
                          <Card.Header as="h5" className=" text-info">
                            Products
                          </Card.Header>
                          <ListGroup variant="flush">
                            {order?.cartId?.products?.length > 0 ? (
                              order.cartId.products.map((product) => (
                                <ListGroupItem key={product._id}>
                                  {product.productId.name} (Qty: {product.quantity}) - $
                                  {calculateProductPrice(product) * product.quantity}
                                </ListGroupItem>
                              ))
                            ) : (
                              <ListGroupItem>Donation / Investment</ListGroupItem>
                            )}
                          </ListGroup>
                        </Card>
                        <Card className="mt-4">
                          <Card.Header as="h5" className=" text-info">
                            Total Payment
                          </Card.Header>
                          <ListGroup variant="flush">
                            <ListGroupItem>Total: ${order?.amount / 100}</ListGroupItem>
                          </ListGroup>
                          <ListGroup variant="flush">
                            <ListGroupItem>Payment Mode: {order?.paymentMethod}</ListGroupItem>
                          </ListGroup>
                          <ListGroup variant="flush">
                            <ListGroupItem>Payment Status: {order?.paymentStatus}</ListGroupItem>
                          </ListGroup>
                        </Card>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link to={'/orderList'}>
                        <Button variant="info">Back to Orders</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Spinner animation="border" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
