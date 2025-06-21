'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import MediaRenderer from './MediaRenderer'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const searchInputRef = useRef(null)

  const fetchResults = async (q = query, p = 1) => {
    if (!q.trim()) {
      setResults([])
      setTotalResults(0)
      return
    }

    setIsLoading(true)
    try {
      const res = await axios.get(`${API_URL}/search/?query=${q}&page=${p}`)
      setResults(res.data.results)
      setTotalResults(res.data.count || 0)
      setTotalPages(Math.ceil(res.data.count / 10) || 1)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSuggestions = async (q) => {
    if (!q.trim()) return
    try {
      const res = await axios.get(`${API_URL}/get-suggestions/?query=${q}`)
      setSuggestions(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSearch = () => {
    if (query.trim()) {
      setPage(1)
      setSuggestions([])
      fetchResults(query, 1)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    handleSearch()
  }

  useEffect(() => {
    if (query.length > 1) {
      const timer = setTimeout(() => fetchSuggestions(query), 300)
      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
    }
  }, [query])

  useEffect(() => {
    if (query.trim()) fetchResults(query, page)
  }, [page])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 font-robotoCondensed">
      <div className="relative pt-24 sm:pt-28 mb-6">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search posts..."
            className="w-full px-4 py-2 border-b focus:border-blue-500 outline-none text-sm sm:text-base"
            autoFocus
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Search size={18} />
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-t-0 rounded-b-md shadow-md">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 text-sm"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-sm sm:text-lg font-medium">
              {totalResults} results for "{query}"
            </h2>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`p-1 rounded-full ${page > 1 ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-2 text-xs sm:text-sm">
                {page}/{totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`p-1 rounded-full ${page < totalPages ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((post) => (
              <div key={post.id} className="border rounded overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                <MediaRenderer media={post.media} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold mb-1 line-clamp-2 text-sm">{post.title}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : query ? (
        <div className="text-center py-12 text-gray-500">
          No results found
        </div>
      ) : null}
    </div>
  )
}
