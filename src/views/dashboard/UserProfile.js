import React from 'react'
import { useState, useRef } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import { ImCross } from 'react-icons/im'

import Stepper from 'react-stepper-horizontal'
import { useDebounceEffect } from 'src/components/useDebounceEffect'
import { canvasPreview } from 'src/components/canvasPreview'

const UserProfile = () => {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    alternateContactNumber: '',
    photo: [],
    video: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // const handleImageUpload = (e) => {
  //   const { name, files } = e.target
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: files[0],
  //   }))
  // }

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1)
  }
  const [workData, setWorkData] = useState([
    { workExperience: '', jobRole: '', workExperiencePeriod: '' },
  ])

  const handleAddMore = () => {
    setWorkData((prevData) => [...prevData, { workExperience: '', workExperiencePeriod: '' }])
  }

  const handleWorkInputChange = (index, e) => {
    const { name, value } = e.target
    const updatedWorkData = [...workData]
    updatedWorkData[index][name] = value
    setWorkData(updatedWorkData)
  }

  const [educationData, setEducationData] = useState([
    { education: '', institutionName: '', educationPeriod: '' },
  ])

  const handleAddMoreEducation = () => {
    setEducationData((prevData) => [
      ...prevData,
      { education: '', institutionName: '', educationPeriod: '' },
    ])
  }
  const handleEducationInputChange = (index, e) => {
    const { name, value } = e.target
    const updateEducationData = [...educationData]
    updateEducationData[index][name] = value
    setEducationData(updateEducationData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      // alert('Password doest not match!!!')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password does not match!!!',
      })
      return
    }
    if (formData.email === '') {
      //alert('Email is mandatory!')
      Swal.fire('Email is mandatory!')
      return
    }
    if (formData.username === '') {
      //alert('Username is mandatory!')
      Swal.fire('Username is mandatory!')
      return
    }
    if (formData.password === '') {
      //alert('Email is mandatory!')
      Swal.fire('Password is mandatory!')
      return
    }
    if (formData.firstName === '') {
      //alert('First Name is mandatory!')
      Swal.fire('First name is mandatory!')
      return
    }
    if (formData.lastName === '') {
      //alert('Last Name is mandatory!')
      Swal.fire('Last name is mandatory!')
      return
    }
    if (formData.contactNumber === '') {
      //alert('Contact Number is mandatory!')
      Swal.fire('Contact number is mandatory!')
      return
    }

    console.log(formData)
    console.log(workData, educationData)
    Swal.fire('Good job!', ' You have successfully sign up!', 'success')
    setStep(5)
  }
  // const [selectedImages, setSelectedImages] = useState([])

  // const handleImageUpload = (event) => {
  //   const newImages = Array.from(event.target.files)
  //   setSelectedImages((prevImages) => [...prevImages, ...newImages])
  //  // console.log(selectedImages)
  // }

  // const handleDeleteImage = (index) => {
  //   setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index))
  // }
  //Handle Images---------------------------------------------
  const [imgSrc, setImgSrc] = useState('')
  const [selectedImages, setSelectedImages] = useState([])
  const [crop, setCrop] = useState({ aspect: 1 })
  const [completedCrop, setCompletedCrop] = useState(null)
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const blobUrlRef = useRef('')
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imgRef.current, crop, 'cropped-image.png')
      // Add the cropped image to the selectedImages array
      setSelectedImages([...selectedImages, croppedImageUrl])
      // Clear the current image
      setImgSrc('')
      setFormData((prev) => {
        return {
          ...prev,
          photo: selectedImages,
        }
      })
    }
  }
  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty')
          return
        }
        blob.name = fileName
        resolve(window.URL.createObjectURL(blob))
      }, 'image/png')
    })
  }
  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages]
      updatedImages.splice(index, 1)
      return updatedImages
    })
  }
  //--------------------------------------
  const [selectedVideos, setSelectedVideos] = useState([])

  const handleVideoUpload = (event) => {
    const newVideos = Array.from(event.target.files)
    setSelectedVideos((prevVideos) => [...prevVideos, ...newVideos])
  }

  const handleDeleteVideo = (index) => {
    setSelectedVideos((prevVideos) => prevVideos.filter((_, i) => i !== index))
  }

  const steps = [
    { title: 'Account Information' },
    { title: 'Personal Information' },
    { title: 'Experience and Education' },
    { title: 'File Upload' },
    { title: 'Finish' },
  ]

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <div>
                  <h4 className=" text-info m-1">SIGN UP FOR USER ACCOUNT</h4>
                  <h6 className="mx-2">Fill all the form to go to next step</h6>
                </div>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Home</a>
                    </li>
                    <li className="breadcrumb-item ">Customer List</li>
                    <li className="breadcrumb-item active text-info">User Profile Update</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-shadow rounded-lg border my-2">
                <div className="card-body">
                  <Stepper
                    steps={steps}
                    activeStep={step - 1}
                    activeColor="#0DCAF0" // Change this color to match your active step color
                    completeColor="#0DCAF0" // Change this color to match your completed step color
                    defaultBarColor="#E0E0E0" // Change this color to match your step bar color
                    completeBarColor="#0DCAF0" // Change this color to match your completed step bar color
                    circleTop={0} // Adjust the vertical alignment of the circle icons
                    activeStepCircleSize={40} // Adjust the size of the active step circle
                  />
                  {/* <div className="step-content">
                    <div className={`step ${step === 1 ? 'active' : ''}`}></div>
                    <div className={`step ${step === 2 ? 'active' : ''}`}></div>
                    <div className={`step ${step === 3 ? 'active' : ''}`}></div>
                    <div className={`step ${step === 4 ? 'active' : ''}`}></div>
                    <div className={`step ${step === 5 ? 'active' : ''}`}></div>
                  </div> */}
                  {step === 5 ? (
                    <div className="m-4 p-">
                      <div
                        className="progress m-3"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated  bg-info"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      <h4></h4>
                      <div className="step">
                        <h1></h1>
                        <p>Step 5 of 5</p>
                      </div>
                      <h2 className="text-success text-center">
                        <strong>SUCCESS !</strong>
                      </h2>
                      <br />
                      <div className="row justify-content-center">
                        <div className="col-3">
                          <img
                            src="https://i.imgur.com/GwStPmg.png"
                            style={{ height: '150px', width: '150px' }}
                            className="fit-image"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                        <div className="col-7 text-center">
                          <h5 className="purple-text text-center">
                            You Have Successfully Signed Up
                          </h5>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {step === 1 && (
                        <div className="m-4">
                          <div
                            className="progress m-3"
                            role="progressbar"
                            aria-label="Animated striped example"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated  bg-info"
                              style={{ width: '20%' }}
                            ></div>
                          </div>
                          <div className="step">
                            <h4>Account Information</h4>
                            <p>Step 1 of 5</p>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                              <label>Email *</label>
                              <input
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email Id"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                              <label>User Name *</label>
                              <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="User Name"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                              <label>Password *</label>
                              <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                              <label>Confirm Password *</label>
                              <input
                                type="password"
                                name="confirmPassword"
                                onChange={handleInputChange}
                                value={formData.confirmPassword}
                                placeholder="Confirm Password"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                required
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn btn-outline-info m-2 p-2 align-right"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        </div>
                      )}
                      {step === 2 && (
                        <div className="m-4">
                          <div
                            className="progress m-3"
                            role="progressbar"
                            aria-label="Animated striped example"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated  bg-info"
                              style={{ width: '40%' }}
                            ></div>
                          </div>
                          <div className="step">
                            <h4>Personal Information</h4>
                            <p>Step 2 of 5</p>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                              <label>First Name*</label>
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                              <label>Last Name *</label>
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                              <label>Contact Number *</label>
                              <input
                                type="number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                placeholder="Contact Number"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                              <label>Alternate Contact Number </label>
                              <input
                                type="number"
                                name="alternateContactNumber"
                                value={formData.alternateContactNumber}
                                onChange={handleInputChange}
                                placeholder="Alternate Contact Number"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                              />
                            </div>
                          </div>

                          <div className="button-container">
                            <button
                              type="button"
                              className="btn btn-outline-info m-2 p-2"
                              onClick={handlePrevious}
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-info m-2 p-2"
                              onClick={handleNext}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                      {step === 3 && (
                        <div className="m-4">
                          <div
                            className="progress m-3"
                            role="progressbar"
                            aria-label="Animated striped example"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated  bg-info"
                              style={{ width: '60%' }}
                            ></div>
                          </div>
                          <div className="step">
                            <h4>Experience and Education</h4>
                            <p>Step 3 of 5</p>
                          </div>

                          <div className="card custom-shadow rounded-lg border my-3">
                            <div className="card-body">
                              <h6>Add Your Work Experience Here</h6>
                              <div className="row">
                                <div className="col-sm-4">Company Name</div>
                                <div className="col-sm-4">Job Role</div>
                                <div className="col-sm-4">From-To (Year)</div>
                              </div>
                              {workData.map((data, index) => (
                                <div key={index} className="work-input input-group mb-3 ">
                                  <div className="education">
                                    <input
                                      type="text"
                                      name="workExperience"
                                      value={data.workExperience}
                                      onChange={(e) => handleWorkInputChange(index, e)}
                                      className=" form-control "
                                      placeholder="Company Name"
                                    />
                                  </div>
                                  <div className="education">
                                    <input
                                      type="text"
                                      name="jobRole"
                                      value={data.jobRole}
                                      onChange={(e) => handleWorkInputChange(index, e)}
                                      className=" form-control "
                                      placeholder="Job Role"
                                    />
                                  </div>
                                  <div className="education">
                                    <input
                                      type="text"
                                      name="workExperiencePeriod"
                                      value={data.workExperiencePeriod}
                                      onChange={(e) => handleWorkInputChange(index, e)}
                                      className="form-control"
                                      placeholder="Time"
                                    />
                                  </div>
                                </div>
                              ))}

                              <button
                                type="button"
                                className="btn btn-outline-info btn-sm"
                                onClick={handleAddMore}
                              >
                                Add More
                              </button>
                            </div>
                          </div>

                          <div className="card custom-shadow rounded-lg border my-3">
                            <div className="card-body">
                              <h6>Add Your Education Details Here</h6>

                              <div className="row">
                                <div className="col-sm-4">Education Details</div>
                                <div className="col-sm-4">Institution Name</div>
                                <div className="col-sm-4">From-To</div>
                              </div>
                              {educationData.map((data, index) => (
                                <div key={index} className="input-group mb-3 work-input">
                                  <div className="education">
                                    <input
                                      type="text"
                                      name="education"
                                      value={data.education}
                                      onChange={(e) => handleEducationInputChange(index, e)}
                                      className="form-control"
                                      placeholder="Qualification Name"
                                    />
                                  </div>

                                  <div className="education">
                                    <input
                                      type="text"
                                      name="institutionName"
                                      value={data.institutionName}
                                      onChange={(e) => handleEducationInputChange(index, e)}
                                      className="form-control"
                                      placeholder="Institution Name"
                                    />
                                  </div>

                                  <div className="education">
                                    <input
                                      type="text"
                                      name="educationPeriod"
                                      value={data.educationPeriod}
                                      onChange={(e) => handleEducationInputChange(index, e)}
                                      className="form-control"
                                      placeholder="Year of Passing"
                                    />
                                  </div>
                                </div>
                              ))}

                              <button
                                type="button"
                                className="btn btn-outline-info btn-sm"
                                onClick={handleAddMoreEducation}
                              >
                                Add More
                              </button>
                            </div>
                          </div>

                          <div className="button-container">
                            <button
                              type="button"
                              className="btn btn-outline-info m-2 p-2"
                              onClick={handlePrevious}
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-info m-2 p-2"
                              onClick={handleNext}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="m-4">
                          <div
                            className="progress m-3"
                            role="progressbar"
                            aria-label="Animated striped example"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated  bg-info"
                              style={{ width: '80%' }}
                            ></div>
                          </div>
                          <div className="step">
                            <h4>File Upload</h4>
                            <p>Step 4 of 5</p>
                          </div>

                          <div className="card custom-shadow rounded-lg border my-3">
                            <div className="card-body">
                              <nav className="navbar bg-body-tertiary">
                                <div className="container-fluid">
                                  <span className="navbar-brand mb-0 h1">Upload Image</span>
                                </div>
                              </nav>

                              <div>
                                <div className="input-group">
                                  <input
                                    type="file"
                                    name="photo"
                                    onChange={handleImageUpload}
                                    required
                                    className="form-control"
                                  />
                                </div>
                                <div>
                                  {!!imgSrc && (
                                    <ReactCrop
                                      crop={crop}
                                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                                      onComplete={setCompletedCrop}
                                      aspect={1}
                                    >
                                      <img ref={imgRef} alt="Crop me" src={imgSrc} />
                                    </ReactCrop>
                                  )}
                                  {!!completedCrop && (
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-outline-info m-2"
                                        onClick={() => makeClientCrop(completedCrop)}
                                      >
                                        Crop
                                      </button>
                                    </div>
                                  )}
                                  <div className="selected-images">
                                    {selectedImages.map((imageUrl, index) => (
                                      <div key={index} className="selected-image">
                                        <img src={imageUrl} alt={`Cropped ${index}`} />

                                        <span
                                          className="delete-icon"
                                          onClick={() => handleDeleteImage(index)}
                                        >
                                          <ImCross />
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card custom-shadow rounded-lg border my-3">
                            <div div className="card-body">
                              <nav className="navbar bg-body-tertiary">
                                <div className="container-fluid">
                                  <span className="navbar-brand mb-0 h1">Upload Video</span>
                                </div>
                              </nav>

                              <div className="input-group">
                                <input
                                  type="file"
                                  name="video"
                                  onChange={handleVideoUpload}
                                  value={formData.video}
                                  required
                                  className="form-control"
                                  id="inputGroupFile04"
                                  aria-describedby="inputGroupFileAddon04"
                                  aria-label="Upload"
                                  multiple
                                />
                              </div>
                              <div className="selected-images">
                                {selectedVideos.map((video, index) => (
                                  <div key={index} className="selected-video my-2">
                                    {/* controls (add controls tag to play pause video) */}
                                    <video width="100%" height="100%">
                                      <source src={URL.createObjectURL(video)} type="video/mp4" />
                                      Your browser does not support the video tag.
                                    </video>
                                    <span
                                      className="delete-icon"
                                      onClick={() => handleDeleteVideo(index)}
                                    >
                                      <ImCross />
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="button-container">
                            <button
                              type="button"
                              className="btn btn-outline-info m-2 p-2"
                              onClick={handlePrevious}
                            >
                              Previous
                            </button>
                            <button type="submit" className="btn btn-outline-info m-2 p-2">
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
