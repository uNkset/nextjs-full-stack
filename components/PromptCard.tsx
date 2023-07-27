'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { PromptCardProps } from './Feed'
import Image from 'next/image'

const PromptCard = ({
  promptObj,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) => {
  const { data: session }: any = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const [copied, setCopied] = useState('')

  const handleProfileClick = () => {
    if (promptObj.creator._id === session?.user?.id)
      return router.push('/profile')

    router.push(
      `/profile/${promptObj.creator._id}?user=${promptObj.creator.username}`
    )
  }
  const handleCopy = () => {
    setCopied(promptObj.prompt)
    navigator.clipboard.writeText(promptObj.prompt)
    setTimeout(() => setCopied(''), 4000)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={promptObj.creator.image}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {promptObj.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {promptObj.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === promptObj.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt={copied === promptObj.prompt ? 'tick_icon' : 'copy_icon'}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {promptObj.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(promptObj.tag)}
      >
        #{promptObj.tag}
      </p>

      {session?.user?.id === promptObj.creator._id &&
        pathName === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  )
}

export default PromptCard
