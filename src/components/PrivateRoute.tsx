import React from 'react'
import { Link, Route  } from 'react-router-dom'

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? React.createElement(component, props) : <Link  to={{ pathname: '/' }} />
  return <Route {...rest} render={routeComponent} />
}

export default PrivateRoute
