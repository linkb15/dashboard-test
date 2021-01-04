import { AuthProvider } from 'hooks/useAuth'
import React from 'react'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
