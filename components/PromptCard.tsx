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
  const [copied, setCopied] = useState('')

  const handleProfileClick = () => {}
  const handleCopy = () => {}
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
        {promptObj.tag}
      </p>
    </div>
  )
}

export default PromptCard
