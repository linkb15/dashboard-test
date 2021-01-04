import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react'
import { auth, db } from 'config/firebase'

const useAuthProvider = () => {
  const [user, setUser] = useState(null)
  const createUser = async (user: {
    [x: string]: any
    uid?: any
    email?: any
    name?: any
  }) => {
    try {
      await db.collection('users').doc(user.uid).set(user)
      setUser(user)
      return user
    } catch (error) {
      return { error }
    }
  }
  const signUp = async ({ name, email, password }) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      auth.currentUser.sendEmailVerification()
      return await createUser({ uid: response.user.uid, email, name })
    } catch (error) {
      return { error }
    }
  }
  const signIn = async ({ email, password }) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password)
      setUser(response.user)
      getUserAdditionalData(user)
      return response.user
    } catch (error) {
      return { error }
    }
  }
  const signOut = async () => {
    await auth.signOut()
    return setUser(false)
  }
  const sendPasswordResetEmail = async (email: string) => {
    const response = await auth.sendPasswordResetEmail(email)
    return response
  }
  const getUserAdditionalData = async (user: firebase.default.User) => {
    const userData = await db.collection('users').doc(user.uid).get()
    if (userData.data()) {
      setUser(userData.data())
    }
  }
  const handleAuthStateChanged = (user: firebase.default.User) => {
    setUser(user)
    if (user) {
      getUserAdditionalData(user)
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged)

    return () => unsubscribe()
  }, [])
  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot(doc => setUser(doc.data()))
      return () => unsubscribe()
    }
  }, [])
  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
  }
}

const authContext = createContext({ user: {} })
const { Provider } = authContext

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider()
  return <Provider value={auth}>{props.children}</Provider>
}
export const useAuth: any = () => {
  return useContext(authContext)
}
