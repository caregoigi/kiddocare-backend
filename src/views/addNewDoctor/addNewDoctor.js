import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Constants } from 'src/Constants'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Use the classic build
import Select from 'react-select';

const MySwal = withReactContent(Swal)

const AddNewDoctor = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    contactNumbers: '',
    email: '',
    username: "",
    address: '',
    city: '',
    state: '',
    zipcode: '',
    specialties: [],
    clinicName: '',
    professionalSynopsis: '',
    awards: '',
    areaOfInterest: '',
    academicHonours: '',
    awardsAndAchievements: '',
    publications: '',
    qualifications: '',
  })

  const options = [
    { value: 'Electrophysiology', label: 'Electrophysiology' },
    { value: 'Cardiothoracic Surgery', label: 'Cardiothoracic Surgery' },
    { value: 'Emergency Medicine', label: 'Emergency Medicine' },
    { value: 'Surgical Oncology', label: 'Surgical Oncology' },
    { value: 'Nuclear Medicine', label: 'Nuclear Medicine' },
    { value: 'Geriatric', label: 'Geriatric' },
    { value: 'Radiology', label: 'Radiology' },
    { value: 'Infectious Diseases', label: 'Infectious Diseases' },
    { value: 'Multiorgan Transplants', label: 'Multiorgan Transplants' },
    { value: 'Dental', label: 'Dental' },
    { value: 'Pediatric Surgery', label: 'Pediatric Surgery' },
    { value: 'Nursing At Aig', label: 'Nursing At Aig' },
    { value: 'Psychiatry', label: 'Psychiatry' },
    { value: 'Paediatrics', label: 'Paediatrics' },
    { value: 'Gynecology', label: 'Gynecology' },
    { value: 'Rheumatology', label: 'Rheumatology' },
    { value: 'Rheumatology', label: 'Rheumatology' },
    { value: 'Pathology', label: 'Pathology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Andrology', label: 'Andrology' },
    { value: 'Endocrinology And Diabetology', label: 'Endocrinology And Diabetology' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (selected) => {
    setFormData((prevData) => ({
      ...prevData,
      specialties: selected ? selected.map(option => option.value) : []
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'password') {
      setConfirmPassword('')
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      MySwal.fire({
        icon: 'error',
        title: 'Passwords do not match!',
        text: 'Please make sure the passwords match.',
      })
      return
    }

    try {
      const response = await fetch(Constants.addNewDoctor, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          contactNumbers: formData.contactNumbers,
          email: formData.email,
          username: formData.username,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          specialties: formData.specialties,
          clinicName: formData.clinicName,
          professionalSynopsis: formData.professionalSynopsis,
          awards: formData.awards,
          areaOfInterest: formData.areaOfInterest,
          academicHonours: formData.academicHonours,
          awardsAndAchievements: formData.awardsAndAchievements,
          publications: formData.publications,
          qualifications: formData.qualifications,
        }),
      })

      if (response.ok) {
        MySwal.fire({
          icon: 'success',
          title: 'User Registered Successfully!',
        })

        navigate('/doctorList')
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: 'An error occurred while registering the user.',
        })
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  const editorConfiguration = {
    height: '120px' // Adjust the height value as needed
  }

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 text-info">ADD NEW DOCTOR</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item active text-info">Add New Doctor</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card custom-shadow rounded-lg border my-2">
                  <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                      <div className="row">
                        <Form.Group className="col-lg-8 mb-3" controlId="firstName">
                          <Form.Label>Speciality</Form.Label>
                          <Select
                            id="multiSelect"
                            name="specialties"
                            isMulti
                            value={formData.specialties.map(value => options.find(option => option.value === value))}
                            onChange={handleSelectChange}
                            options={options}
                          />
                          <div>
                            <ul>
                              {selectedOptions.map(option => (
                                <li key={option.value}>{option.label}</li>
                              ))}
                            </ul>
                          </div>

                        </Form.Group>

                        <Form.Group className="col-lg-4 mb-3" controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-3" controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-3" controlId="mobile">
                          <Form.Label>Mobile</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Mobile"
                            name="contactNumbers"
                            value={formData.contactNumbers}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-3" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-3" controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="col-lg-6 mb-3" controlId="confirmPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter Password Again"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-3" controlId="username">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}

                          />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-3" controlId="address">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}

                          />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-3" controlId="city">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}

                          />
                        </Form.Group>

                        <Form.Group className="col-lg-4 mb-3" controlId="state">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}

                          />
                        </Form.Group>

                        <Form.Group className="col-lg-4 mb-3" controlId="state">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}

                          />
                        </Form.Group>

                        <Form.Group className="col-lg-4 mb-3" controlId="zipcode">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Zip Code"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}

                          />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-3" controlId="clinicName">
                          <Form.Label>Clinic Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter clinic Name"
                            name="clinicName"
                            value={formData.clinicName}
                            onChange={handleChange}

                          />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-3" controlId="professionalSynopsis">
                          <Form.Label>Professional Synopsis</Form.Label>
                          <CKEditor
                            editor={ClassicEditor}
                            config={editorConfiguration}
                            data={formData?.professionalSynopsis}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData((prevData) => ({
                                ...prevData,
                                professionalSynopsis: data,
                              }));
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-3" controlId="awards">
                          <Form.Label>Awards</Form.Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={formData?.awards}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData((prevData) => ({
                                ...prevData,
                                awards: data,
                              }));
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-3" controlId="areaOfInterest">
                          <Form.Label>Area Of Interest</Form.Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={formData?.areaOfInterest}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData((prevData) => ({
                                ...prevData,
                                areaOfInterest: data,
                              }));
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-3" controlId="academicHonours">
                          <Form.Label>Academic Honours</Form.Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={formData?.academicHonours}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData((prevData) => ({
                                ...prevData,
                                academicHonours: data,
                              }));
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-3" controlId="awardsAndAchievements">
                          <Form.Label>Awards And Achievements</Form.Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={formData?.awardsAndAchievements}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData((prevData) => ({
                                ...prevData,
                                awardsAndAchievements: data,
                              }));
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-3" controlId="publications">
                          <Form.Label>Publications</Form.Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={formData?.publications}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData((prevData) => ({
                                ...prevData,
                                publications: data,
                              }));
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-3" controlId="qualifications">
                          <Form.Label>Qualifications</Form.Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={formData?.qualifications}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData((prevData) => ({
                                ...prevData,
                                qualifications: data,
                              }));
                            }}
                          />
                        </Form.Group>

                        <div className="text-end">
                          <Button
                            variant="btn"
                            className="btn btn-secondary text-white m-2"
                            as={Link}
                            to="/dashboard"
                          >
                            Cancel
                          </Button>
                          <Button variant="info" className="btn btn-primary text-white m-2" type="submit">
                            Save
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewDoctor
