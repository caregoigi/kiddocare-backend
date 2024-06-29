import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'


import { AppSidebarNav } from './AppSidebarNav'

import goigilogo from 'src/assets/images/logo.png'
import goigibig from 'src/assets/images/logo.png'


import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const sidebarBrandStyle = {
    backgroundColor: '#fff', // Set the background color to gray
    padding: '0px', // Optional padding
  };

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/" style={sidebarBrandStyle}>
        {/* <CIcon className="sidebar-brand-full" icon={goigi} height={35} /> */}
        <Link to='/dashboard' > <img className="sidebar-brand-full" src={goigibig} alt="Your Image" height={35}  /></Link>
        <Link to='/dashboard' ><img className="sidebar-brand-narrow" src={goigilogo} alt="Your Image" height={35} /> </Link>

        

        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)