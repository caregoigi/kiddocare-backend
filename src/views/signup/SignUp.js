import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FaCamera, FaRegUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SignUp = () => {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({})
  const [user,setUSer] = useState([])

  const handleForm = (e)=> {
    setProfileData({
        ...profileData,
        [e.target.name]:e.target.value
    })
  }

  // const handleSubmit = async(e)=>{
  //   e.preventDefault();
  //   const response = await fetch('http://localhost:8080/signup', {
  //       method:'POST',
  //       body:JSON.stringify(profileData),
  //       headers:{
  //           'Content-Type':'application/json'
  //       }
  //   })
  //   const data = await response.json();
  //   console.log(data)
  //   navigate('/dashboard')
  // }
  // const getUSer = async()=>{
  //   const response = await fetch('http://localhost:8080/signup', {
  //       method:'GET'
  //   }) 
  //   const data = await response.json();
  //   setUSer(data)
  // }

  // useEffect(()=>{
  //   getUSer()
  // },[])
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   })
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
     
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

//   const handleSignUp = async () => {
//     try {
//       const response = await updateProfile(profileData)
    
//       console.log('Profile Update Response:', response)
//     } catch (error) {
//       console.error('Profile Update Error:', error)
//     }
//   }

//   const handleChangePassword = async () => {
//     try {
//       const response = await changePassword(passwordData)
//       console.log('Change Password Response:', response)
//     } catch (error) {
//       console.error('Change Password Error:', error)
//     }
//   }

  const handleProfileInputChange = (event) => {
    const { name, value } = event.target
    setProfileData((prevData) => ({ ...prevData, [name]: value }))
  }

//   const handlePasswordInputChange = (event) => {
//     const { name, value } = event.target
//     setPasswordData((prevData) => ({ ...prevData, [name]: value }))
//   }
  


  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 text-info">SIGN UP</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to='/' >Home</Link>
                      </li>
                      <li className="breadcrumb-item active text-info">Sign Up</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="card custom-shadow rounded-lg border my-3">
              <div className="card-body">
                <form >
                  <div className="row">
                    <div className="col-lg-2">
                      <figure className="group-dp">
                      <img id="profileIMG" src={selectedImage || './user-icon.jpg'} alt="" />
                        <label className="uploadprofileImg custom-shadow p-2">
                          <FaCamera />
                          <input type="file" />
                        </label>
                      </figure>
                    </div>
                    <div className="col-lg-10">
                      {/* <h5 className="h6 text-secondary mb-2">
                        Client ID: <span className="text-info">CI14545</span>
                      </h5> */}

                      <div className="mt-3">
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">First Name:</label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control font-size-13 custom-shadow"
                               // value={firstname}
                              
                                name="firstname"
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
                               // value={lastname}
                               
                                name="lastname"
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
                                //value={email}
                               
                                name="email"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">Password:</label>
                            <div className="col-lg-6">
                              <input
                                type="password"
                                className="form-control font-size-13 custom-shadow"
                               // value={password}
                               
                                name="password"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row align-items-center">
                            <label className="col-lg-3 fw-bold font-size-13">Confirm Password</label>
                            <div className="col-lg-6">
                              <input
                                type="password"
                                className="form-control font-size-13 custom-shadow"
                              //  value={confirmpassword}
                               
                                name="confirmpassword"
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
                               // value={contactNumber}
                             
                                name="contactnumber"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                              <button
                                className="btn btn-info custom-shadow"
                              
                              >
                               Sign Up
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {/* <form>
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
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
