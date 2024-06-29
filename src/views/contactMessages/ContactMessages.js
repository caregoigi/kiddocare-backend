import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Constants } from 'src/Constants'

const ContactMessages = () => {
  const [contactMessages, setContactMessages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState({
    field: 'timestamp',
    ascending: false,
  })
  const [showSortButtons, setShowSortButtons] = useState(false)

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const response = await fetch('https://mastitisapi.goigi.me/api/contact/contact-messages')
        const data = await response.json()
        setContactMessages(data)
      } catch (error) {
        console.error('Error fetching contact messages:', error.message)
      }
    }

    fetchContactMessages()
  }, [])

  const handleDeleteMessage = async (messageId) => {
    try {
      await fetch(`https://mastitisapi.goigi.me/api/contact/delete-message/${messageId}`, {
        method: 'DELETE',
      })

      setContactMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== messageId),
      )

      Swal.fire('Success', 'Contact message deleted successfully.', 'success')
    } catch (error) {
      console.error('Error deleting contact message:', error.message)

      Swal.fire('Error', 'An error occurred while deleting the contact message.', 'error')
    }
  }

  const handleDeleteAllMessages = async () => {
    try {
      await fetch('https://mastitisapi.goigi.me/api/contact/delete-all-messages', {
        method: 'DELETE',
      })

      setContactMessages([])

      Swal.fire('Success', 'All contact messages deleted successfully.', 'success')
    } catch (error) {
      console.error('Error deleting all contact messages:', error.message)

      Swal.fire('Error', 'An error occurred while deleting all contact messages.', 'error')
    }
  }

  const handleSort = (field) => {
    if (sortOrder.field === field) {
      setSortOrder((prevSortOrder) => ({ ...prevSortOrder, ascending: !prevSortOrder.ascending }))
    } else {
      setSortOrder({ field, ascending: true })
    }

    setShowSortButtons(true)
  }

  const hideSortButtons = () => {
    setShowSortButtons(false)
  }

  const sortedContactMessages = [...contactMessages].sort((a, b) => {
    const fieldValueA = a[sortOrder.field]
    const fieldValueB = b[sortOrder.field]

    if (sortOrder.ascending) {
      if (fieldValueA > fieldValueB) return 1
      if (fieldValueA < fieldValueB) return -1
    } else {
      if (fieldValueA < fieldValueB) return 1
      if (fieldValueA > fieldValueB) return -1
    }

    return 0
  })

  const filteredContactMessages = sortedContactMessages.filter((message) => {
    const searchString = searchTerm.toLowerCase()
    return (
      message.name.toLowerCase().includes(searchString) ||
      message.email.toLowerCase().includes(searchString) ||
      new Date(message.timestamp).toLocaleString().includes(searchString)
    )
  })

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-info">CONTACT MESSAGES</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active text-info">Contact Messages</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-2">
            <div className="col-xl-12">
              <div className="card custom-shadow rounded-lg border">
                <div className="card-body">
                  <div className="mb-3" style={{ width: '30%' }}>
                    <input
                      type="text"
                      placeholder="Search by Name, Email, or Date"
                      className="form-control"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>
                            Name
                            <button
                              className="btn btn-link btn-sm"
                              onClick={() => handleSort('name')}
                            >
                              {sortOrder.field === 'name' && sortOrder.ascending ? '▲' : '▼'}
                            </button>
                          </th>
                          <th>
                            Email
                            <button
                              className="btn btn-link btn-sm"
                              onClick={() => handleSort('email')}
                            >
                              {sortOrder.field === 'email' && sortOrder.ascending ? '▲' : '▼'}
                            </button>
                          </th>
                          <th>
                            Phone Number
                            <button
                              className="btn btn-link btn-sm"
                              onClick={() => handleSort('phoneNumber')}
                            >
                              {sortOrder.field === 'phoneNumber' && sortOrder.ascending ? '▲' : '▼'}
                            </button>
                          </th>
                          <th>
                            Message
                            <button
                              className="btn btn-link btn-sm"
                              onClick={() => handleSort('message')}
                            >
                              {sortOrder.field === 'message' && sortOrder.ascending ? '▲' : '▼'}
                            </button>
                          </th>
                          <th>
                            Date
                            <button
                              className="btn btn-link btn-sm"
                              onClick={() => handleSort('timestamp')}
                            >
                              {sortOrder.field === 'timestamp' && sortOrder.ascending ? '▲' : '▼'}
                            </button>
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContactMessages.map((message) => (
                          <tr key={message._id}>
                            <td>{message.name}</td>
                            <td>{message.email}</td>
                            <td>{message.phoneNumber}</td>
                            <td>{message.message}</td>
                            <td>
                              {new Date(message.timestamp).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                              ,{' '}
                              {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteMessage(message._id)}
                              >
                                <FaTrashAlt />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-danger" onClick={handleDeleteAllMessages}>
                      Delete All Messages
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactMessages
