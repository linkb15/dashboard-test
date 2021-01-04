import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'
export const useRequireAuth = () => {
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    console.log(auth)
    if (auth.user === false) {
      router.push('/login')
    }
  }, [auth, router])

  return auth
}
