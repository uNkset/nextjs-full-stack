'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const UpdatePrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [promptObj, setPromptObj] = useState({ prompt: '', tag: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPromptObj({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Missing prompt ID')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: promptObj.prompt,
          tag: promptObj.tag,
        }),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={promptObj}
      setPost={setPromptObj}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt
