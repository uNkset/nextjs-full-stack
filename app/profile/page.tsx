'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [myPrompts, setMyPrompts] = useState([])

  useEffect(() => {
    const fetchMyPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`)
      const data = await response.json()

      setMyPrompts(data)
    }

    if (userId) fetchMyPosts()
  }, [userId])

  const handleEdit = () => {}

  const handleDelete = () => {}

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire other with the power of your imagination"
      data={myPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
