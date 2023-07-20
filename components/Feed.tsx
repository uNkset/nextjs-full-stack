'use client'

import { useState, useEffect, Key } from 'react'
import PromptCard from './PromptCard'

interface UserProps {
  _id: string | number
  email: string
  username: string
  image: string
  __v: string
}

interface PromptObjectProps {
  _id: string | number
  creator: UserProps
  prompt: string
  tag: string
  __v: number
}

interface PromptCardListProps {
  data: Array<PromptObjectProps>
  handleTagClick: Function
}

export interface PromptCardProps {
  key?: Key
  promptObj: PromptObjectProps
  handleTagClick: Function
  // handleEdit: Function
  // handleDelete: Function
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((p) => (
        <PromptCard key={p._id} promptObj={p} handleTagClick={handleTagClick} />
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

  const handleSearchChange = () => {}

  const handleTagClick = () => {}

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList data={prompts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed
