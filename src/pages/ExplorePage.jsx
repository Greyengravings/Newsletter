import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import AnimatedLoading from '../components/AnimatedLoading';
import EmptySearchResults from '../components/EmptySearchResults';
import { ThemeContext } from '../context/ThemeContext';
import { fetchPosts, setFilter, clearFilter, fetchBookmarkedPosts } from '../features/posts/postsSlice';

function ExplorePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  const filter = useSelector((state) => state.posts.filter);
  const selectedCategory = useSelector((state) => state.posts.selectedCategory);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const username = useSelector((state) => state.auth?.username);

  useEffect(() => {
    document.title = "Explore - The Digital Canvas Blog";
  }, []);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      const uniqueCategories = [...new Set(posts.map(post => post.category).filter(Boolean))];
      setCategories(uniqueCategories);
    }
  }, [posts]);

  useEffect(() => {
    if (isLoggedIn && username && filter === 'bookmarked') {
      dispatch(fetchBookmarkedPosts(username));
    }
  }, [isLoggedIn, username, filter, dispatch]);

  const handleFilter = (filterType, category = '') => {
    dispatch(setFilter({ filter: filterType, category }));
    setShowFilterDropdown(false);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    dispatch(clearFilter());
    setShowFilterDropdown(false);
  };

  if (postStatus === 'loading') {
    return <AnimatedLoading />;
  }

  if (postStatus === 'failed') {
    return <p className="text-center py-12 text-red-600">Error: {postError}</p>;
  }

  // Filter posts based on search query and filters
  let filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply additional filters
  switch (filter) {
    case 'newest':
      filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'mostViewed':
      filteredPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;
    case 'category':
      if (selectedCategory) {
        filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
      }
      break;
    default:
      break;
  }

  return (
    <div className="space-y-6 min-h-screen transition-all duration-500">
      <div className={`space-y-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Explore All Posts
          </h1>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 max-w-4xl mx-auto flex gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className={`h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-3 py-3 border rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="flex gap-1">
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`px-3 md:px-4 py-3 border rounded-full transition-all duration-300 font-medium ${
                  filter !== 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                <svg
                  className="w-5 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </button>
            </div>
            {isLoggedIn && (
              <button
                onClick={() => handleFilter('bookmarked')}
                className={`px-3 md:px-4 py-3 border rounded-full transition-all duration-300 font-medium ${
                  filter === 'bookmarked'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            )}
            <Link
              to="/"
              className={`px-3 md:px-4 py-3 border rounded-full transition-all duration-300 font-medium ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
              }`}
              title="Go back to Home"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </div>

          {showFilterDropdown && (
            <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-10 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
            } border`}>
              <div className="py-1">
                <button
                  onClick={() => handleFilter('all')}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Posts
                </button>
                <button
                  onClick={() => handleFilter('newest')}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filter === 'newest'
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Newest First
                </button>
                <button
                  onClick={() => handleFilter('oldest')}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filter === 'oldest'
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Oldest First
                </button>
                <button
                  onClick={() => handleFilter('mostViewed')}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filter === 'mostViewed'
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Most Viewed
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilter('category', category)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      filter === 'category' && selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {(filter !== 'all' || searchQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Display filtered posts */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length === 0 ? (
            <div className="w-full col-span-3">
              <EmptySearchResults theme={theme} />
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard key={post._id || post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
