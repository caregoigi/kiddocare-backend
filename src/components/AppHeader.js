import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { logo ,} from 'src/assets/images/logo.png'
import logo_1 from 'src/assets/images/logo.png'


const AppHeader = () => {
  
  
  const [searchData, setSearchData] = React.useState({searchInput:''})
  const handleSearchInputChange = (e)=>{
    const { name, value } = e.target
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const sidebarBrandStyle = {
    backgroundColor: '#3c4b64', // Set the background color to gray
    // Optional padding
  };

  return (
    <CHeader position="sticky" className="mb-4  header " style={sidebarBrandStyle}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" className='text-white' />
        </CHeaderToggler>
        <div className="d-flex justify-content-center align-items-center">
         
            {/* <input
              type="text"
              name='searchInput'
              value={searchData.searchInput}
              onChange={handleSearchInputChange}
              className="border-0 bg-light rounded-pill p-2 px-3"
              placeholder="Search..."
            />
            <span className="ms-2">
              <CIcon icon="cilSearch" size="lg" className="text-dark" />
            </span> */}
          
        </div>
        <CHeaderBrand className="mx-auto d-md-none" to="/dashboard">
          <CIcon icon={logo_1} height={48} alt="Logo" to="/dashboard" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto ">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} className="text-info"></CNavLink>
          </CNavItem>
        </CHeaderNav>
        
        {/* <CHeaderNav className="ms-3 ">
          <AppHeaderDropdown2 />
        </CHeaderNav> */}
        <CHeaderNav className="ms-3 ">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
