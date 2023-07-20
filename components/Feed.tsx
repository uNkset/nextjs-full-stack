'use client'

import { useState, useEffect, Key } from 'react'
import PromptCard from './PromptCard'

interface PromptObjectProps {
  _id: string | number
  prompt: string
  tag: string
}

interface PromptCardListProps {
  data: Array<PromptObjectProps>
  handleTagClick: Function
}

export interface PromptCardProps {
  key?: Key
  prompt: Record<string, any>
  handleTagClick: Function
}

interface PromptMapProps {
  _id: string | number
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((p: PromptMapProps) => (
        <PromptCard key={p._id} prompt={p} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [prompts, setPrompts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const fetchPrompts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setPrompts(data)
  }

  useEffect(() => {
    fetchPrompts()
  }, [])

  return <div>Feed</div>
}

export default Feed
