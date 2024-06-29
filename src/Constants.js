// const prefix = 'http://92.204.128.190:4949/api/'
const prefix = 'http://localhost:9095/api/'

export const Constants = {
  adminLogIn : prefix + 'admin/login',
  getAdminDetails : prefix + 'admin',
  getLoggedInDetails : prefix + 'admin/me',
  registerOrUpdateAdmin: prefix + 'admin/register',
  
  getAllUsers: prefix + 'admin/doctors',
  doctorDetails : prefix + 'admin/doctor-details/',
  addNewDoctor : prefix + 'admin/doctor-register',
  deleteDoctor : prefix + 'admin/doctor-delete',

  getPatients: prefix + 'admin/patients',
  importPatientCsv: prefix + 'admin/importPatientCsv',
  deletePatient : prefix + 'admin/patient-delete',

  
  getAllOrders : prefix + 'order/all-orders',
  getOrderById : prefix + 'order/',
  changeOrderStatus : prefix + 'order/update-status/',


  createAndUpdateSocialLinks: prefix + 'social-links',
  getAllSocialLinks: prefix + 'social-links',

  // createNewSubscriptions: prefix + 'subscriptons/add',
  // getAllSubscriptions: prefix + 'subscriptons/all',
  // getAllSubscriptionsById: prefix + 'subscriptons/',
  // updateSubscription: prefix + 'subscriptons/update/',
  // deleteSubscription: prefix + 'subscriptons/delete/',

  // addProduct: prefix + 'product/create',
  // getAllProduct: prefix + 'product/all',
  // getProductById: prefix + 'product/details/',
  // updateProduct: prefix + 'product/update/',
  // deleteProduct: prefix + 'product/delete/',

  addOrUpdateAboutUs: prefix + 'about-us/addOrUpdate',
  getAboutUs: prefix + 'about-us/get',

  addOrUpdatePolicy: prefix + 'policy-service',
  getpolicy: prefix + 'policy-service',
}
