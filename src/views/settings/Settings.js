import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Constants } from 'src/Constants'
import Swal from 'sweetalert2'
import useAuthStore from 'src/hooks/useAuthStore'

const Settings = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    linkedin: '',
    address: '',
  })
  const { token } = useAuthStore()
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMismatchError, setPasswordMismatchError] = useState('')

  // const token = "e.."

  useEffect(() => {
    // Fetch social links data when the component mounts
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(Constants.getAllSocialLinks)
        const data = await response.json()

        setSocialLinks(data)
      } catch (error) {
        console.error('Error fetching social links:', error)
      }
    }

    fetchSocialLinks()
  }, [])

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(Constants.getAdminDetails, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'admin-auth-token': token,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setAdminData(data)
        } else {
          console.error('Failed to fetch admin data')
        }
      } catch (error) {
        console.error('Error fetching admin data', error)
      }
    }

    if (token) {
      fetchAdminData()
    }
  }, [token])

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSaveProfileSettings = async () => {
    try {
      if (adminData?.password !== confirmPassword) {
        setPasswordMismatchError('* Password does not match')
        return
      }

      setPasswordMismatchError('Password matches')

      const response = await fetch(Constants.registerOrUpdateAdmin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'admin-auth-token': token,
        },
        body: JSON.stringify({
          username: adminData?.username,
          password: adminData?.password,
        }),
      })

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile details saved successfully',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save profile details',
        })
      }
    } catch (error) {
      console.error('Error saving profile details:', error)
    }
  }

  const handleSaveSettings = async () => {
    try {
      const response = await fetch(Constants.createAndUpdateSocialLinks, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(socialLinks),
      })

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Settings saved successfully',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save settings',
        })
      }
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }
  const handleUsernameChange = (e) => {
    setAdminData((prevData) => ({
      ...prevData,
      username: e.target.value,
    }))
  }

  const handlePasswordChange = (e) => {
    setAdminData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }))
  }

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <Row>
              <Col>
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 text-info">SETTINGS</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">Home</Link>
                      </li>
                      <li className="breadcrumb-item active text-info">Settings</li>
                    </ol>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={16}>
                <div className="card custom-shadow rounded-lg border my-2 mb-4">
                  <div className="card-body">
                    <h5 className="mb-4">Profile Settings</h5>
                    <Form>
                      <Form.Group controlId="username" className='mb-3'>
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                          type="email"
                          value={adminData?.username}
                          onChange={handleUsernameChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="password" className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={adminData?.password}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="confirmPassword" className='mb-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                        {passwordMismatchError && (
                          <p
                            style={{
                              color: passwordMismatchError.includes('not') ? 'red' : 'green',
                            }}
                          >
                            {passwordMismatchError}
                          </p>
                        )}
                      </Form.Group>

                      <Button
                        variant="primary"
                        className="my-2"
                        onClick={handleSaveProfileSettings}
                      >
                        Save
                      </Button>
                    </Form>
                  </div>
                </div>
                <div className="card custom-shadow rounded-lg border my-2">
                  <div className="card-body">
                    <h5 className="mb-4">Social Links Settings</h5>
                    <Form>
                      <Form.Group controlId="facebook" className='mb-3'>
                        <Form.Label>Facebook URL</Form.Label>
                        <Form.Control
                          type="url"
                          value={socialLinks?.facebook}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, facebook: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="twitter" className='mb-3'>
                        <Form.Label>Twitter URL</Form.Label>
                        <Form.Control
                          type="url"
                          value={socialLinks?.twitter}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, twitter: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="instagram" className='mb-3'>
                        <Form.Label>Instagram URL</Form.Label>
                        <Form.Control
                          type="url"
                          value={socialLinks?.instagram}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, instagram: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="youtube" className='mb-3'>
                        <Form.Label>Youtube URL</Form.Label>
                        <Form.Control
                          type="url"
                          value={socialLinks?.youtube}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, youtube: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="phoneNumber" className='mb-3'>
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control
                          type="text"
                          value={socialLinks?.phoneNumber}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, phoneNumber: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="whatsappNumber" className='mb-3'>
                        <Form.Label>Whatsapp No</Form.Label>
                        <Form.Control
                          type="text"
                          value={socialLinks?.whatsappNumber}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, whatsappNumber: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="emailLink" className='mb-3'>
                        <Form.Label>Email Link</Form.Label>
                        <Form.Control
                          type="email"
                          value={socialLinks?.email}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, email: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="linkedin" className='mb-3'>
                        <Form.Label>LinkedIn URL</Form.Label>
                        <Form.Control
                          type="url"
                          value={socialLinks?.linkedin}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, linkedin: e.target.value }))
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="address" className='mb-3'>
                        <Form.Label>Address </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={socialLinks?.address}
                          onChange={(e) =>
                            setSocialLinks((prev) => ({ ...prev, address: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Button variant="primary" className="my-2" onClick={handleSaveSettings}>
                        Save
                      </Button>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
