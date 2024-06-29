import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { Constants } from 'src/Constants'

const Calculation = () => {
  const [formData, setFormData] = useState({
    cdiCoefficientITD: '',
    productPriceITD: '',
    serviceFeeITD: '',
    dryCowCostPerCowDPLUG: '',
    cleaningMaintainanceCostDPLUG: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(Constants.getCalculationData)
      const data = await response.json()
      setFormData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(Constants.uploadOrUpdateCalculationdata, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setFormData(data)
      Swal.fire('Success', 'Data uploaded/updated successfully!', 'success')
    } catch (error) {
      console.error('Error uploading data:', error)
      Swal.fire('Error', 'An error occurred while uploading data.', 'error')
    }
  }

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-info">CALCULATION INPUTS</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active text-info">Calculation Inputs</li>
                  </ol>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Form onSubmit={handleSubmit}>
              <Col md={16}>
                <div className="card custom-shadow rounded-lg border my-2 mb-4">
                  <div className="card-body">
                    <h5 className="mb-4">Intra Teat Device Inputs</h5>

                    <Form.Group controlId="cdiCoefficientITD">
                      <Form.Label>CDI Co-efficient</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.cdiCoefficientITD}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="productPriceITD">
                      <Form.Label>Product Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.productPriceITD}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="serviceFeeITD">
                      <Form.Label>Service Fee</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.serviceFeeITD}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="card custom-shadow rounded-lg border my-2">
                  <div className="card-body">
                    <h5 className="mb-4">DPLUG Inputs</h5>

                    <Form.Group controlId="dryCowCostPerCowDPLUG">
                      <Form.Label>Dry Cow Cost Per Cow</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.dryCowCostPerCowDPLUG}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="cleaningMaintainanceCostDPLUG">
                      <Form.Label>Cleaning and Maintenance Cost</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.cleaningMaintainanceCostDPLUG}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <Button type="submit" className="btn btn-info my-1">
                  Save
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Calculation
