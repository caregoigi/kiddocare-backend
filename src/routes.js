import React from 'react'


import Login from './views/login/Login.js';
import Dashboard from './views/dashboard/Dashboard';
import Profile from './views/profile/Profile.js';
import DoctorList from './views/doctorList/doctorList.js';
import PatientList from './views/patientList/patientList.js';
import AddNewDoctor from './views/addNewDoctor/addNewDoctor.js';
import EditDoctor from './views/editDoctor/editDoctor.js';
import DoctorDetails from './views/doctorDetails/doctorDetails.js';
import Settings from './views/settings/Settings.js';
import SignUp from './views/signup/SignUp.js';
import AboutUs from './views/aboutUs/AboutUs.js';
import Policy from './views/policyAndService/PolicyAndService.js';
import ContactMessages from './views/contactMessages/ContactMessages';
import TrainingCentre from './views/trainingCentre/TrainingCentre';


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/DoctorList', name: 'Customer List', element: DoctorList },
  { path: '/PatientList', name: 'Patient List', element: PatientList },
  { path: '/AddNewDoctor', name: 'Add New Customer', element: AddNewDoctor },
  { path: '/EditDoctor', name: 'Edit Customer', element: EditDoctor },
  { path: '/DoctorDetails/:id', name: 'Customer Details', element: DoctorDetails },
  { path: '/settings', name: 'Settings', element: Settings },
  { path: '/signUp', name: 'SignUp', element: SignUp },
  { path: '/aboutUs', name: 'aboutUs', element: AboutUs },
  { path: '/policy', name: 'policy', element: Policy },
  { path: '/contact-messages', name: 'contact-messages', element: ContactMessages },
  { path: '/training-centre', name: 'training-centre', element: TrainingCentre },
]

export default routes
