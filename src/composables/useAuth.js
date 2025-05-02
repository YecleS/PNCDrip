// src/composables/useAuth.js
import { ref } from 'vue'

// Reactive variables to store credentials
const accessToken = ref(localStorage.getItem('access_token'))
const refreshToken = ref(localStorage.getItem('refresh_token'))
const userID = ref(localStorage.getItem('userID'))
const username = ref(localStorage.getItem('username'))
const role = ref(localStorage.getItem('role'))

const isAuthenticated = ref(!!accessToken.value)

export function useAuth() {
  function setAuthData({ access, refresh, user_id, username: user, role: userRole }) {
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    localStorage.setItem('userID', user_id)
    localStorage.setItem('username', user)
    localStorage.setItem('role', userRole)

    // Update reactive variables
    accessToken.value = access
    refreshToken.value = refresh
    userID.value = user_id
    username.value = user
    role.value = userRole
    isAuthenticated.value = true
  }

  function clearAuthData() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('userID')
    localStorage.removeItem('username')
    localStorage.removeItem('role')

    // Reset reactive variables
    accessToken.value = null
    refreshToken.value = null
    userID.value = null
    username.value = null
    role.value = null
    isAuthenticated.value = false
  }

  // Return all reactive properties and methods
  return {
    accessToken,
    refreshToken,
    userID,
    username,
    role,
    isAuthenticated,
    setAuthData,
    clearAuthData,
  }
}
