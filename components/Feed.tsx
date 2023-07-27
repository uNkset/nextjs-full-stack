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

export interface PromptObjectProps {
  _id: string | number
  creator: UserProps
  prompt: string
  tag: string
  __v: number
}

interface PromptCardListProps {
  data: Array<PromptObjectProps>
  handleTagClick: (arg: string) => void
}

export interface PromptCardProps {
  key?: Key
  promptObj: PromptObjectProps
  handleTagClick?: (arg: string) => void
  handleEdit?: () => void
  handleDelete?: () => void
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
  const [searchTimeout, setSearchTimeout]: any = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const fetchPrompts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setPrompts(data)
  }

  useEffect(() => {
    fetchPrompts()
  }, [])

  const filteredPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, 'i')
    return prompts.filter(
      (p: PromptObjectProps) =>
        regex.test(p.creator.username) ||
        regex.test(p.prompt) ||
        regex.test(p.tag)
    )
  }

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    //const debounce: NodeJS.Timeout = setTimeout(() => {})
    //let debounce: ReturnType<typeof setTimeout>
    let debounce = setTimeout(() => {
      const searchResult = filteredPrompts(e.target.value)
      setSearchResults(searchResult)
    }, 500)

    setSearchTimeout(debounce)
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName)

    const searchByTagResults = filteredPrompts(tagName)
    setSearchResults(searchByTagResults)
  }

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

      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={prompts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
