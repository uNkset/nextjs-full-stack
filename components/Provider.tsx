'use client'

import { SessionProvider } from 'next-auth/react'

interface SessionUserProps {
  email: string
  id: string
  image: string
  name: string
}

interface SessionProps {
  user: SessionUserProps
  expires: string
}

interface ProviderProps {
  children: React.ReactNode
  session?: SessionProps
}

const Provider = ({ children, session }: ProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Provider
