import React from 'react'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Sidebar from './components/Sidebar'
import Services from './components/pages/Services'
import ContactUs from './components/pages/Products'
import SignUp from './components/pages/SignUp'
import Footer from './components/Footer'
import SignIn from './components/pages/SignIn'
import InfoGral from './components/pages/InfoGral'
import Calendar from './components/pages/Calendar'
import Profile from './components/pages/Prof'
import Percentil from './components/pages/Percentil'
import PercentilAltura from './components/pages/PercentilAltura'
import PercentilPeso from './components/pages/PercentilPeso'
import Forgetpassword from './components/pages/ForgetPassword'
import ResetPass from './components/pages/Resetpassword'
import Dashboard from './components/pages/Dashboard'
import RegistroControlPediatrico from './components/pages/RegistroControlPediatrico'
import RegistrarVacunas from './components/pages/RegistrarVacunas'
import ChildProfile from './components/pages/ChildProfile'
import Childrens from './components/pages/Childrens'
import Vaccines from './components/pages/Vaccines'
import Pediatric from './components/pages/Pediatric'
function App () {
  return (
    <>
      <Router>
        <Navbar />
        <div
          style={
            window.location.pathname == '/'
              ? { display: 'block' }
              : { display: 'flex' }
          }
        >
          {window.location.pathname == '/' ? (
            <></>
          ) : localStorage['authToken'] ? (
            <Sidebar />
          ) : (
            <></>
          )}

          <div
            className={
              window.location.pathname == '/' ? 'homepage' : 'content-screen'
            }
          >
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/' exact component={Dashboard} />
              <Route path='/services' exact component={Services} />
              <Route path='/contact-us' exact component={ContactUs} />
              <Route path='/sign-in' exact component={SignIn} />
              <Route path='/sign-up' exact component={SignUp} />
              <Route path='/InfoGral' exact component={InfoGral} />
              <Route path='/Calendar' exact component={Calendar} />
              <Route path='/Profile' exact component={Profile} />
              <Route
                path='/PercentilAltura'
                exact
                component={PercentilAltura}
              />
              <Route path='/PercentilPeso' exact component={PercentilPeso} />
              <Route
                path='/registro-control-pediatrico'
                exact
                component={RegistroControlPediatrico}
              />
              <Route
                path='/registrar-vacunas'
                exact
                component={RegistrarVacunas}
              />

              <>
                <Route path='/child-profile' exact component={ChildProfile} />
                <Route
                  path='/ForgetPassword'
                  exact
                  component={Forgetpassword}
                />
                <Route path='/reset/:code' exact component={ResetPass} />
                <Route path='/childrens' exact component={Childrens} />
                <Route path='/vaccines' exact component={Vaccines} />
                <Route path='/pediatric' exact component={Pediatric} />
                <Route path='/percentile' exact component={Percentil} />
              </>
            </Switch>
          </div>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
