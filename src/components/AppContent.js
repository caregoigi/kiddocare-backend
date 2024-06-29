import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import useAuthStore from 'src/hooks/useAuthStore'

const AppContent = () => {
  const { token } = useAuthStore()
  return (
    <div>
      <Suspense fallback={<CSpinner color="#08CBFE" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={!token && <Navigate to="login" replace />} />
          <Route path="/dashboard" element={ <Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
