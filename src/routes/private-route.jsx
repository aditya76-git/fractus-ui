import React from 'react'

const PrivateRoute = ({ children }) => {
    const isAllowed = true

    return isAllowed ? children : <div>You are not allowed to access this route</div>
}

export default PrivateRoute