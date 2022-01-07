import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route 
        {...rest}
            render={props => {
                if (!localStorage.getItem("UserID")) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/dashboard" />
                }
            }}

        />
    )
}

export default AuthRoute