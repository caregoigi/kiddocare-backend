import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCamera, FaRegUser } from 'react-icons/fa'
import useAuthStore from 'src/hooks/useAuthStore'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Profile = () => {
  const { token } = useAuthStore()
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
  })
  const [last4Digits, setLast4Digits] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  useEffect(() => {
    ;(async function fetchProfile() {
      try {
        const response = await fetch('http://localhost:8080/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
         
          setProfileData({
            firstName: data.user.firstname,
            lastName: data.user.lastname,
            email: data.user.email,
            contactNumber: data.user.contactnumber,
          })
          const id = data.user._id;
          setLast4Digits(id.substr(id.length - 4))
        } else {
          
          console.error('Error fetching profile data')
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    })()
  }, [token])
console.log(profileData)

  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/profile/:${userId}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization: ` Bearer ${token}`,
        },
        body:JSON.stringify({
          firstName:profileData.firstName,
          lastName:profileData.lastName,
          email:profileData.email,
          contactNumber:profileData.contactNumber
        })
      })
      if (response.ok) {
       console.log("Profile data updated successfully")
      }else{
        console.error("Error updating profile data")
      }
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  }

  const handleChangePassword = async () => {}

  const handleProfileInputChange = (event) => {
    const { name, value } = event.target
    setProfileData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target
    setPasswordData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 text-info">PROFILE</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">Home</Link>
                      </li>
                      <li className="breadcrumb-item active text-info">My Profile</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="card custom-shadow rounded-lg border my-3">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-lg-2">
                      <figure className="group-dp">
                        <img id="profileIMG" src={selectedImage || './user-icon.jpg'} alt="" />
                        <label className="uploadprofileImg custom-shadow p-2">
                          <FaCamera />
                          <input type="file" onChange={handleImageChange} />
                        </label>
                      </figure>
                    </div>
                    <div className="col-lg-10">
                      <h5 className="h6 text-secondary mb-2">
                        Client ID: <span className="text-info">{last4Digits}</span>
                      </h5>

                      <div className="mt-3">
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">First Name:</label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control font-size-13 custom-shadow"
                                value={profileData.firstName}
                                onChange={handleProfileInputChange}
                                name="firstName"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">Last Name:</label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control font-size-13 custom-shadow"
                                value={profileData.lastName}
                                onChange={handleProfileInputChange}
                                name="lastName"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">Email ID:</label>
                            <div className="col-lg-6">
                              <input
                                type="email"
                                className="form-control font-size-13 custom-shadow"
                                value={profileData.email}
                                onChange={handleProfileInputChange}
                                name="email"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">Contact Number:</label>
                            <div className="col-lg-6">
                              <input
                                type="number"
                                className="form-control font-size-13 custom-shadow"
                                value={profileData.contactNumber}
                                onChange={handleProfileInputChange}
                                name="contactNumber"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                              <button
                                className="btn btn-info custom-shadow"
                                onClick={handleProfileUpdate()}
                              >
                                Update Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <form>
                  <div className="row">
                    <div className="col-lg-10 offset-lg-2">
                      <div className="mt-4">
                        <h3 className="h5 mb-3 text-uppercase fw-bold">Change Password</h3>
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">
                              Current Password:
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordInputChange}
                                name="currentPassword"
                                className="form-control font-size-13 custom-shadow"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">New Password:</label>
                            <div className="col-lg-6">
                              <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={handlePasswordInputChange}
                                name="newPassword"
                                className="form-control font-size-13 custom-shadow"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">
                              Confirm Password:
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordInputChange}
                                name="confirmPassword"
                                className="form-control font-size-13 custom-shadow"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                              <button
                                className="btn btn-info custom-shadow"
                                onClick={handleChangePassword}
                              >
                                Change Password
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
