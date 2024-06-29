import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const EditCustomer = () => {
  const [customerData, setCustomerData] = useState({})
  const [customer, setCustomer] = useState([])
  const formref = useRef()

  const handleForm = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    })
  }

  const handleReset = () => {
    formref.current.reset()
    setCustomerData({})
  }

  const handleAddCustomer = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/addNewCustomer', {
        method: 'POST',
        body: JSON.stringify(customerData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log(data)

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Customer added successfully!',
      })

      handleReset()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the customer. Please try again later.',
      })

      console.error('Error:', error)
    }
  }

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 text-info">EDIT USER</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item active text-info">Edit User</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card custom-shadow rounded-lg border my-2">
                  <div className="card-body">
                    <form onSubmit={handleAddCustomer} ref={formref}>
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="form-group mb-3">
                            <label>Title *</label>
                            <select
                              className="form-control form-select"
                              name="title"
                              onChange={handleForm}
                            >
                              <option>Mr.</option>
                              <option>Mrs.</option>
                              <option>Miss.</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="form-group mb-3">
                            <label>First Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstname"
                              onChange={handleForm}
                            />
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="form-group mb-3">
                            <label>Last Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="lastname"
                              onChange={handleForm}
                            />
                          </div>
                        </div>
                        

                        <div className="col-lg-5">
                          <div className="form-group mb-3">
                            <label>Type of User *</label>
                            <select
                              className="form-control form-select"
                              name="customertype"
                              onChange={handleForm}
                            >
                               <option>Choose Type</option>
                              <option>Farmer</option>
                              <option>Veterinarian</option>
                              <option>Licensed User</option>
                              <option>Normal User</option>
                            </select>
                          </div>
                        </div>
                        {/* <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <label>Company Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="companyname"
                              onChange={handleForm}
                            />
                          </div>
                        </div> */}
                        <div className="col-lg-12">
                          <hr />
                        </div>
                      </div>
                      <div>
                        <div className="col-lg-12">
                          <label>Contact Number(s) *</label>
                        </div>

                        <div className="row">
                          <div className="col-lg-2">
                            <div className="form-group mb-3">
                              <select
                                className="form-control form-select form-select-sm"
                                name="contactnumbertype"
                                onChange={handleForm}
                              >
                                <option>Choose Type</option>
                                <option>Work</option>
                                <option>Personal</option>
                                <option>Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group mb-3">
                              <input
                                type="number"
                                className="form-control"
                                name="contactnumber"
                                onChange={handleForm}
                                placeholder="Contact Number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <div className="col-lg-12">
                          <label>Email Address(es) *</label>
                        </div>

                        <div className="row">
                          <div className="col-lg-2">
                            <div className="form-group mb-3">
                              <select
                                className="form-control form-select form-select-sm"
                                name="emailtype"
                                onChange={handleForm}
                              >
                                <option>Choose Type</option>
                                <option>Work</option>
                                <option>Personal</option>
                                <option>Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group mb-3">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={handleForm}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="d-flex justify-content-between">
                            <label className="fw-bold">Shipping Address</label>
                            <div></div>
                          </div>
                        </div>
                      </div>
                      <div className="addresbox">
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="form-group mb-3">
                              <label>Address Type</label>
                              <select
                                className="form-control form-select form-select-sm"
                                name="addresstype"
                                onChange={handleForm}
                              >
                                <option>Address Type</option>
                                <option>Home</option>
                                <option>Office</option>
                                <option>Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group mb-3">
                              <label>Street Address *</label>
                              <input
                                type="text"
                                className="form-control"
                                name="streetaddress"
                                placeholder=""
                                onChange={handleForm}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group mb-3">
                              <label>City *</label>
                              <input
                                type="text"
                                className="form-control"
                                name="city"
                                placeholder=""
                                onChange={handleForm}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group mb-3">
                              <label>State *</label>
                              <input
                                type="text"
                                className="form-control"
                                name="state"
                                placeholder=""
                                onChange={handleForm}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group mb-3">
                              <label>Country *</label>
                              <input
                                type="text"
                                className="form-control"
                                name="country"
                                placeholder=""
                                onChange={handleForm}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group mb-3">
                              <label>Pin Code *</label>
                              <input
                                type="number"
                                className="form-control"
                                name="pincode"
                                placeholder=""
                                onChange={handleForm}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <button className="btn btn-outline-info m-2" onClick={handleReset}>
                          Cancel
                        </button>
                        <button
                          className="btn btn-info m-2"
                          type="submit"
                          onClick={handleAddCustomer}
                        >
                          Edit Customer
                        </button>
                      </div>
                    </form>
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

export default EditCustomer
