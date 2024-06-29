import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="me-1"> &copy; Copyright {new Date().getFullYear()}, Kiddocare. All Rights Reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
