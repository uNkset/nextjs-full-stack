'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

function UserProfile({ params }: any) {
  const searchParams = useSearchParams()
  const user = searchParams.get('user')

  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()

      setPrompts(data)
    }

    if (params.id) fetchPrompts()
  }, [params.id])

  return (
    <Profile
      name={user || 'Anonymous'}
      desc={`Welcome ${user}'s personalized profile page. Explore ${user}'s exceptional prompts and inspire other with the power of your imagination`}
      data={prompts}
    />
  )
}

export default UserProfile
