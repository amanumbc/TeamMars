import React, { useEffect } from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import variable from './variable'

// All Page Imports
import Login from './pages/Login'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

const App = () => {

  let history = useHistory()
  let location = useLocation()

  useEffect(() => {
    // login route
    // if the user is on the login page
    if(location.pathname === '/login') {
      axios({
        method: "GET",
        withCredentials: true,
        url: variable.SERVER_TOKEN_CHECK,
      }).then((res) => {
        // user is already logged in, push to /home
        console.log(res)
        history.push('/home')
      })
      .catch((error) => {
        // if no permission
        // user is not logged in, push to login page
        if (error.response.status === 403) {
          history.push('/login')
        }
      })
    }

    // private route
    // add all public routes here
    else if(location.pathname !== '/privacy' && location.pathname !== '/tos' ) {
      // send token to the server
      axios({
        method: "GET",
        withCredentials: true,
        url: variable.SERVER_TOKEN_CHECK,
      }).then((res) => {
        console.log(res)
      })
      .catch((error) => {
        // if no permission
        // user is not logged in, send back to login page
        if (error.response.status === 403) {
          history.push('/login')
        }
      })
    }
  }, [location.pathname])


  return(
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/privacy' component={Privacy}/>
      <Route exact path='/tos' component={Terms}/>
      <Route exact path='/home' component={Home}/>
    </Switch>
  )
}

export default App;
