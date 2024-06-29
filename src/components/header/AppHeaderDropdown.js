import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CLink,
} from '@coreui/react'
import { Button } from 'react-bootstrap'
import { cilFile, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuthStore from 'src/hooks/useAuthStore'
import { Constants } from 'src/Constants'

const AppHeaderDropdown = () => {
  const { resetToken, token } = useAuthStore()
  const [adminData, setAdminData] = useState(null)
  // const token = "e.."
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${Constants.getLoggedInDetails}?adminId=1`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'admin-auth-token': token,
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
  const formatLastLogin = (timestamp) => {
    const options = {
      // year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }

    return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp))
  }

  // console.log(profileData)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <img
          src="https://cdn1.vectorstock.com/i/1000x1000/82/55/anonymous-user-circle-icon-vector-18958255.jpg"
          className="user-logo"
        ></img>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Hi, {adminData ? adminData?.username : 'Admin '}
        </CDropdownHeader>

        <CDropdownHeader className="bg-light fw-semibold py-2">
        {adminData ? `Last Login: ${formatLastLogin(adminData?.lastLogin)}` : ''}
        </CDropdownHeader>
        {/* <CDropdownItem>
          <Link to="/signUp" name="SignUp" className="text-decoration-none">
            <CIcon icon={cilUser} className="me-2" />
            SignUp
          </Link>
        </CDropdownItem> */}

        <div className="d-grid">
          <Button
            onClick={() => resetToken()}
            variant="outline-danger"
            size="sm"
            className="mx-3 my-2"
          >
            Log Out
          </Button>
        </div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
