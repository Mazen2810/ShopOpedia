import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db, auth } from '@/utility/firebaseConfig'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { USER_ROLE, ADMIN_ROLE } from '@/constants/App-Constants'
export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const role = ref(null)
  const initialized = ref(false)

  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => role.value === ADMIN_ROLE)

  // Initialize auth and return a promise that resolves when the first
  // onAuthStateChanged callback has finished (including fetching role).
  const initializedAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser
          // wait for role fetch before marking initialized
          await fetchUserRole(firebaseUser.uid)
        } else {
          resetUser()
        }

        // resolve only once on the first callback, but keep the listener
        // active so the store reacts to future sign-in/sign-out events
        if (!initialized.value) {
          initialized.value = true

          resolve()
        }
      })
    })
  }

  const fetchUserRole = async (id) => {
    const userDoc = await getDoc(doc(db, 'users', id))
    role.value = userDoc.exists() ? userDoc.data().role : ''
  }

  const SignUpUser = async (email, password) => {
    isLoading.value = true
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        password: password,
        role: USER_ROLE,
        id: userCredential.user.uid,
      })
      // createUserWithEmailAndPassword signs in the user automatically
      // keep the user signed-in so UI updates immediately
      user.value = userCredential.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const SignInUser = async (email, password) => {
    isLoading.value = true
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(user.value)
      user.value = userCredential.user
      error.value = null
      return userCredential
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }
  const SignOutUser = async () => {
    isLoading.value = true
    try {
      await signOut(auth)
      resetUser()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resetUser = () => {
    user.value = null
    role.value = null
  }

  return {
    user,
    error,
    role,
    isLoading,
    initialized,
    SignUpUser,
    SignInUser,
    SignOutUser,
    initializedAuth,
    isAuthenticated,
    isAdmin,
  }
})
