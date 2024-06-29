import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Constants } from 'src/Constants';

const TrainingCentre = () => {
  const [fileInputs, setFileInputs] = useState([
    { name: 'imageFile1', label: 'File 1' },
    { name: 'imageFile2', label: 'File 2' },
    { name: 'imageFile3', label: 'File 3' },
    { name: 'pdfFile1', label: 'File 4' },
    { name: 'pdfFile2', label: 'File 5' },
    { name: 'pdfFile3', label: 'File 6' },
    { name: 'videoFile1', label: 'File 7' },
    { name: 'videoFile2', label: 'File 8' },
    { name: 'videoFile3', label: 'File 9' },
  ]);

 
  let formData = new FormData();

  const fetchExistingData = async () => {
    try {
      const response = await fetch(Constants.getTrainingData);
      if (response.ok) {
        const existingData = await response.json();
      
        existingData.forEach((data) => {
          formData.set(data.name, data.value);
        });
      }
    } catch (error) {
      console.error('Error fetching existing data:', error);
    }
  };

  useEffect(() => {
   
    fetchExistingData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      const response = await fetch(Constants.uploadOrUpdateTrainingData, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
      
        Swal.fire('Success', 'Training data uploaded successfully', 'success');
      } else {
       
        Swal.fire('Error', 'Failed to upload training data', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="main-content">
    
      <div className="row m-2">
      <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-info">TRAINING CENTRE</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active text-info">Training Centre</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        <div className="col-xl-12">
          <div className="card custom-shadow rounded-lg border">
            <div className="card-body">
              <h5>Upload or Update Files (Image, Video , PDF etc)</h5>
              <Form onSubmit={handleSubmit}>
                {fileInputs.map((input, index) => (
                  <Row key={index}>
                    <Col md={6}>
                      <Form.Group controlId={input.name}>
                        <Form.Label>{input.label}</Form.Label>
                        <Form.Control
                          type="file"
                          name={input.name}
                          onChange={(e) => {
                            formData.set(input.name, e.target.files[0]);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ))}
                <Button variant="primary" type="submit" className='my-2'>
                  Save
                </Button>
              </Form>
             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCentre;
