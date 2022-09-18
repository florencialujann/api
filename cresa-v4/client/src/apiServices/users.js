import axios from 'axios'
import { api } from './api'
const baseUrl = 'http://localhost:5000'

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${baseUrl}/users/login`, {
      email,
      password
    })
    if (data?.error) {
      alert(data?.message)
      return false
    } else {
      localStorage.setItem('authToken', data.accessToken)
      return true
    }
  } catch (err) {
    alert(err.response.data.message)
    return false
  }
}

export const register = async data => {
  try {
    const res = await axios.post(`${baseUrl}/users/signup`, {
      email: data.get('email'),
      password: data.get('password'),
      dni: data.get('dni'),
      name: data.get('firstName'),
      surname: data.get('lastName'),
      phone: data.get('telefono')
    })
    if (res?.data?.error) {
      alert(res?.data?.message)
    } else {
      alert('Succefully registered')
    }
    console.log(data)
  } catch (err) {
    console.log(err)
    alert(err.response.data.message)
  }
}

export const update = async data => {
  try {
    console.log({ data })
    const res = await api.patch(`${baseUrl}/users/update`, {
      email: data.get('email'),
      dni: data.get('dni'),
      name: data.get('firstName'),
      surname: data.get('lastName'),
      phone: data.get('telefono')
    })
    if (res?.data?.error) {
      alert(res?.data?.message)
    } else {
      alert('Succefully Updated')
    }
  } catch (err) {
    console.log({ err })
    alert(err.response.data.message)
  }
}
export const profile = async () => {
  try {
    const { data } = await api.get('/users/profile')
    if (data.error) {
      alert(data.message)
      return false
    }
    return data.user
  } catch (err) {
    alert(err.response.data.message)
  }
}

export const logout = async () => {
  try {
    const { data } = await api.get('/users/logout')
    if (data.error) {
      alert(data.message)
      return false
    }
    return true
  } catch (err) {
    alert(err.response.data.message)
    return false
  }
}

export const forgotPassword = async email => {
  try {
    const { data } = await axios.patch(`${baseUrl}/users/forgot`, {
      email,
      link: window.location.origin
    })
    if (data.error) {
      alert(data.message)
      return false
    }
    alert(data.message)
    return true
  } catch (err) {
    alert(err.response.data.message)
    return false
  }
}

export const ResetPassword = async (confirmpassword, newpassword, code) => {
  try {
    const { data } = await axios.patch(`${baseUrl}/users/reset`, {
      token: code,
      confirmPassword: confirmpassword,
      newPassword: newpassword
    })
    if (data.error) {
      alert(data.message)
      return false
    }
    alert(data.message)
    return true
  } catch (err) {
    alert(err.response.data.message)
    return false
  }
}

export const registerPediatric = async Params => {
  try {
    const { data } = await api.post('/pediatric', Params)
    if (data.error) {
      alert(data.message)
      return false
    }
    alert(data?.message)
    return true
  } catch (err) {
    alert(err.response.data.message)
  }
}
export const getPediatric = async () => {
  try {
    const { data } = await api.get('/pediatric')
    if (data.error) {
      alert(data.message)
      return false
    }
    return data?.pediatric
  } catch (err) {
    alert(err.response.data.message)
  }
}
export const registerVaccine = async Params => {
  try {
    const { data } = await api.post('/vaccine', Params)
    if (data.error) {
      alert(data.message)
      return false
    }
    alert(data?.message)

    return true
  } catch (err) {
    alert(err.response.data.message)
  }
}
export const getVaccine = async () => {
  try {
    const { data } = await api.get('/vaccine')
    if (data.error) {
      alert(data.message)
      return false
    }
    return data.vaccines
  } catch (err) {
    alert(err.response.data.message)
  }
}
