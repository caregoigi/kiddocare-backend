import React from 'react'
import CIcon from '@coreui/icons-react'

// import {BiUserPlus } from 'react-icons/bi'
import {
  cilHome,
  cilAddressBook,
  cilCode,
  cilBorderAll,
  cilMoney,
  cilSettings,
  cilUser,
  cilPlaylistAdd,
  cilListRich,
  cilAirplay,
  cilLayers,
  cilCart,
  cibDrupal,
  cibHackhands,
  cibStorybook,
  cilList,
  cilFax,
  cilInbox,
  cilChatBubble,
  cilWallet,
  cilCalculator,
  cibZoom
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'MENU',
    to: '/dashboard',
    // icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    disabled: true,
  },

  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilAirplay} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Doctor Mgmt',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add new',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        to: '/AddNewDoctor',
      },
      {
        component: CNavItem,
        name: 'List of docors',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        to: '/doctorList',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Patient Mgmt',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add New',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        to: '/dashboard',
      },
      {
        component: CNavItem,
        name: 'List of patients',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        to: '/PatientList',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Specialities Mgmt',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add New',
        icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
        to: '/dashboard',
      },
      {
        component: CNavItem,
        name: 'Specialities List',
        icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
        to: '/dashboard',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Booking Mgmt',
    icon: <CIcon icon={cibDrupal} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Appointment List',
        icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
        to: '/dashboard',
      },
      {
        component: CNavItem,
        name: 'Schedule an Appointments',
        icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
        to: '/dashboard',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Content Mgmt',
    icon: <CIcon icon={cibHackhands} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'About Us',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        to: '/aboutUs',
      },
      {
        component: CNavItem,
        name: 'Service & Policy ',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        to: '/policy',
      },
      {
        component: CNavItem,
        name: 'Training Centre ',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        to: '/training-centre',
      },
      // {
      //   component: CNavItem,
      //   name: 'Content List',
      //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      //   to: '/contentList',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Content Form',
      //   icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
      //   to: '/contentForm',
      // },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Subscriptions ',
  //   icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Subscriptions Packages',
  //       icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  //       to: '/subscription',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Add New Subscription',
  //       icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
  //       to: '/addSubscription',
  //     },

  //   ],
  // },

  // {
  //   component: CNavItem,
  //   name: 'Subscription Packages',
  //   to: '/subscription',
  //   icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Contact-Users',
    to: '/contact-messages',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav
