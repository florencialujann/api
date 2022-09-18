import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './Navbar.css'
function Navbar () {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const history = useHistory()
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <a href='/' className='navbar-logo' onClick={closeMobileMenu}>
            CRESA
            <i class='fas fa-baby'></i>
          </a>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <a href='/'  className='nav-links' onClick={closeMobileMenu}>
                Home
              </a>
            </li>

            {localStorage['authToken'] ? (
              <li className='nav-item'>
                <a
                  href='/profile'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </a>
              </li>
            ) : (
              <> </>
            )}

            <li className='nav-item'>
              <Link
              /// to='/contactus'
              /// className='nav-links'
              /// onClick={closeMobileMenu}
              ></Link>
            </li>

            <li>
              {localStorage['authToken'] ? (
                <Link
                  to='/'
                  className='nav-links-mobile'
                  onClick={() => {
                    setClick(false)
                    localStorage.clear()

                    setTimeout(() => {
                      window.location.href = '/'
                    }, 100)
                  }}
                >
                  cerrar sesión
                </Link>
              ) : (
                <Link
                  to='/sign-in'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  INICIAR SESION
                </Link>
              )}
            </li>
          </ul>
          {button && localStorage['authToken'] ? (
            <Button
              buttonStyle='btn--outline'
              onClick={() => {
                localStorage.clear()
                setTimeout(() => {
                  window.location.href = '/'
                }, 200)
              }}
            >
              CERRAR SESIÓN{' '}
            </Button>
          ) : (
            <Button
              buttonStyle='btn--outline'
              onClick={() => {
                localStorage.clear()
                setTimeout(() => {
                  window.location.href = '/sign-in'
                }, 200)
              }}
            >
              INICIAR SESION
            </Button>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
