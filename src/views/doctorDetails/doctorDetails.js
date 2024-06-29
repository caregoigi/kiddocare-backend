import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Constants } from 'src/Constants'
import { decode } from 'html-entities';

const CustomerDetails = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  const cleanHTML = (htmlString) => {
    // Decode HTML entities
    const decodedString = decode(htmlString);
    // Split the string into paragraphs
    return decodedString.split(/<\/?p>/).filter(text => text.trim().length > 0);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(Constants.doctorDetails +'?userId=' + id)
        if (response.ok) {
          const data = await response.json()
          setUserData(data)
        } else {
          console.error('Failed to fetch user details')
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserDetails()
  }, [id])

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col xs={12}>
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="text-info">
              <AiOutlineArrowLeft
                onClick={() => {
                  navigate(-1)
                }}
                className="mx-2"
              />
              DOCTOR DETAILS
            </h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card className="rounded-lg border-0 shadow">
            <Row className="g-0">
              <Col xs={12} md={4} lg={3}></Col>
              <Col xs={12} md={8} lg={9}>
              <Card.Body>
                <dl className="row">
                  <dt className="col-sm-4 col-lg-3 text-muted">Name:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.firstName} {userData?.lastName}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Contact Number:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.contactNumbers}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Email:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.emailAddresses}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Username:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.username}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Address:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.address}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">City:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.city}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">State:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.state}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Zipcode:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.zipcode}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Country:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.country}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Specialties:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.specialties?.join(', ')}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Clinic Name:</dt>
                  <dd className="col-sm-8 col-lg-9">{userData?.clinicName}</dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Professional Synopsis:</dt>
                  <dd className="col-sm-8 col-lg-9">
                    {cleanHTML(userData?.professionalSynopsis).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Awards:</dt>
                  <dd className="col-sm-8 col-lg-9">
                    {cleanHTML(userData?.awards).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Area of Interest:</dt>
                  <dd className="col-sm-8 col-lg-9">
                    {cleanHTML(userData?.areaOfInterest).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Academic Honours:</dt>
                  <dd className="col-sm-8 col-lg-9">
                    {cleanHTML(userData?.academicHonours).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Awards and Achievements:</dt>
                  <dd className="col-sm-8 col-lg-9">
                    {cleanHTML(userData?.awardsAndAchievements).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Publications:</dt>
                  <dd className="col-sm-8 col-lg-9">
                    {cleanHTML(userData?.publications).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </dd>

                  <dt className="col-sm-4 col-lg-3 text-muted">Qualifications:</dt>
                  <dd className="col-sm-8 col-lg-9">
                    {cleanHTML(userData?.qualifications).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </dd>
                </dl>
              </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CustomerDetails
