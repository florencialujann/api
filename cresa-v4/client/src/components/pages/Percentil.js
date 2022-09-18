import React, { useEffect } from 'react'
import '../../App.css'
import CardsPerfil from '../CardsPerfil'
import { useHistory } from 'react-router-dom'

function Percentil () {
  const history = useHistory()
  useEffect(() => {
    if (!localStorage['authToken']) {
      history.push('/sign-in')
    }
  }, [])

  return (
    <>  
      <CardsPerfil />
    </>
  )
}

export default Percentil
