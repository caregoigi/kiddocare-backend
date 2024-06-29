import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Constants } from 'src/Constants';
import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Use the classic build

const PolicyAndServices = () => {
  const [formData, setFormData] = useState({
    serviceHeading: '',
    serviceDescription: '',
    policyHeading: '',
    policyDescription: '',
  });

  useEffect(() => {
    // Fetch the existing data from the API
    fetch(Constants.getpolicy)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to update the terms of service and privacy policy
    fetch(Constants.addOrUpdatePolicy, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Data updated successfully:', data)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data updated successfully',
        });
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update  data',
        });
      });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-info">Terms of Services and Privacy Policy</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active text-info">Services and Policies</li>
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
                    <Form.Group controlId="serviceHeading">
                      <h5>Service Heading</h5>
                      <Form.Control
                        type="text"
                        name="serviceHeading"
                        value={formData?.serviceHeading}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="serviceDescription">
                      <h5>Service Description</h5>
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData?.serviceDescription}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setFormData((prevData) => ({
                            ...prevData,
                            serviceDescription: data,
                          }));
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="policyHeading">
                      <h5>Policy Heading</h5>
                      <Form.Control
                        type="text"
                        name="policyHeading"
                        value={formData?.policyHeading}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="policyDescription">
                      <h5>Policy Description</h5>
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData?.policyDescription}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setFormData((prevData) => ({
                            ...prevData,
                            policyDescription: data,
                          }));
                        }}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-2">
                      Save Changes
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PolicyAndServices;
