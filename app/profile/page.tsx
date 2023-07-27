'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
import { PromptObjectProps } from '@components/Feed'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const userId: string = session?.user?.id
  const [myPrompts, setMyPrompts] = useState([])

  useEffect(() => {
    const fetchMyPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`)
      const data = await response.json()

      setMyPrompts(data)
    }

    if (userId) fetchMyPosts()
  }, [userId])

  const handleEdit = (prompt: PromptObjectProps) => {
    router.push(`/update-prompt?id=${prompt._id}`)
  }

  const handleDelete = async (prompt: PromptObjectProps) => {
    const hasConfirmed = confirm('Are you sure you want to delete?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: 'DELETE',
        })

        const filteredPrompts = myPrompts.filter(
          (item: PromptObjectProps) => item._id !== prompt._id
        )
        setMyPrompts(filteredPrompts)
      } catch (error) {
        console.log(error)
      }
    }
  }

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
