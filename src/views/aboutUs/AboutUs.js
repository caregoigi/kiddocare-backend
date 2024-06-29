import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Constants } from 'src/Constants'
import Swal from 'sweetalert2'

const AboutUsForm = () => {
  const [formData, setFormData] = useState({
    heading: '',
    shortDescription: '',
    longDescription: '',
    image: null,
  })

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchAboutUsData()
  }, [])

  const fetchAboutUsData = async () => {
    try {
      const response = await fetch(Constants.getAboutUs)
      if (response.ok) {
        const aboutUsData = await response.json()
        setFormData({
          heading: aboutUsData.heading || '',
          shortDescription: aboutUsData.shortDescription || '',
          longDescription: aboutUsData.longDescription || '',
          image: null,
        })
        setIsEditing(true)
      } else {
        console.error('Failed to fetch About Us data')
      }
    } catch (error) {
      console.error('Error fetching About Us data:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !formData.heading ||
      !formData.shortDescription ||
      // !formData.longDescription ||
      !formData.image
    ) {
      Swal.fire({
        icon: 'error',

        text: 'All fields are mandatory. Please fill in all the fields.',
      })
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('heading', formData.heading)
      formDataToSend.append('shortDescription', formData.shortDescription)
      formDataToSend.append('longDescription', formData.longDescription)
      formDataToSend.append('image', formData.image)

      const response = await fetch(Constants.addOrUpdateAboutUs, {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'About Us data updated successfully',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update About Us data',
        })
      }
    } catch (error) {
      console.error('Error submitting About Us data:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating About Us data',
      })
    }
  }

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-info">About-Us</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active text-info">About-Us</li>
                  </ol>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={16}>
              <div className="card custom-shadow rounded-lg border my-2">
                <div className="card-body">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formHeading" className="my-2">
                      <h5>Heading</h5>
                      <Form.Control
                        type="text"
                        placeholder="Enter heading"
                        name="heading"
                        value={formData?.heading}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formShortDescription" className="my-2">
                      <h5> Description</h5>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter short description"
                        name="shortDescription"
                        value={formData?.shortDescription}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    {/* <Form.Group controlId="formLongDescription" className="my-2">
                      <h5>Long Description</h5>
                      <Form.Control
                        as="textarea"
                        rows={7}
                        placeholder="Enter long description"
                        name="longDescription"
                        value={formData?.longDescription}
                        onChange={handleChange}
                      />
                    </Form.Group> */}

                    <Form.Group controlId="formImage" className="my-2">
                      <h5>Image Upload</h5>
                      <Form.Control type="file"  name="image" onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="my-1">
                      {isEditing ? 'Update' : 'Create'}
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default AboutUsForm
