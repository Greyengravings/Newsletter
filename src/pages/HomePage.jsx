import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import HeroSection from '../components/HeroSection';
import RollingHeadings from '../components/RollingHeadings';
import AnimatedLoading from '../components/AnimatedLoading';
import EmptySearchResults from '../components/EmptySearchResults';
import { ThemeContext } from '../context/ThemeContext';
import useToggle from '../hooks/useToggle';
import { fetchPosts, setFilter, clearFilter, fetchBookmarkedPosts } from '../features/posts/postsSlice';

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [showDetails, toggleDetails] = useToggle(false);
  const { theme } = useContext(ThemeContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const filterDropdownRef = useRef(null);

  const filter = useSelector((state) => state.posts.filter);
  const selectedCategory = useSelector((state) => state.posts.selectedCategory);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const username = useSelector((state) => state.auth?.username);

  useEffect(() => {
    document.title = "The Digital Canvas Blog";
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  useEffect(() => {
    const defaultCategories = [
      'Technology', 'AI & ML', 'Business & Finance', 'Coding', 'Productivity',
      'Web Dev', 'Design', 'Digital Marketing', 'Full Stack', 'Travel & Adventure',
      'Data Science', 'Health & Fitness', 'Cybersecurity', 'Lifestyle & Wellness',
      'Cloud', 'Mobile Dev', 'Photography & Art', 'DevOps', 'Creative Writing',
      'Blockchain', 'UI/UX Design', 'Game Dev', 'Open Source', 'Gadgets', 'Career & Tech', 'Others'
    ];
    const postCategories = posts.map(post => post.category).filter(Boolean);
    const uniqueCategories = [...new Set([...postCategories, ...defaultCategories])];
    setCategories(uniqueCategories);
  }, [posts]);

  useEffect(() => {
    if (isLoggedIn && username && filter === 'bookmarked') {
      dispatch(fetchBookmarkedPosts(username));
    }
  }, [isLoggedIn, username, filter, dispatch]);

  // Close filter menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showMorePosts = () => setVisiblePosts(posts.length);
  const showLessPosts = () => setVisiblePosts(2);

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

  return (
    <div className="space-y-6 min-h-screen transition-all duration-500">
      <div className={`space-y-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <p className="text-center text-sm opacity-70">Window width: {windowWidth}pixels</p>

        <RollingHeadings/>
        <HeroSection posts={posts} />

        <div id="latest-posts" className="text-center">
          <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Latest Posts
          </h2>

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

            <div className="flex gap-2">
              <div className="relative" ref={filterDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className={`px-4 py-3 border rounded-full transition-all duration-300 font-medium flex items-center gap-1.5 ${
                    filter !== 'all'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-expanded={showFilterDropdown}
                >
                  <span>Filter</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Filter Dropdown Menu - Anchored directly beside/below the filter button */}
                {showFilterDropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-64 rounded-2xl shadow-2xl z-30 border overflow-hidden transition-all duration-200 text-left ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}>
                    <div className="p-2 space-y-1">
                      <div className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Sort By
                      </div>
                      <button
                        onClick={() => handleFilter('all')}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                          filter === 'all'
                            ? 'bg-blue-600 text-white'
                            : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>All Posts</span>
                        {filter === 'all' && <span>✓</span>}
                      </button>
                      <button
                        onClick={() => handleFilter('newest')}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                          filter === 'newest'
                            ? 'bg-blue-600 text-white'
                            : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>Newest First</span>
                        {filter === 'newest' && <span>✓</span>}
                      </button>
                      <button
                        onClick={() => handleFilter('oldest')}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                          filter === 'oldest'
                            ? 'bg-blue-600 text-white'
                            : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>Oldest First</span>
                        {filter === 'oldest' && <span>✓</span>}
                      </button>
                      <button
                        onClick={() => handleFilter('mostViewed')}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                          filter === 'mostViewed'
                            ? 'bg-blue-600 text-white'
                            : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>Most Viewed</span>
                        {filter === 'mostViewed' && <span>✓</span>}
                      </button>
                      {isLoggedIn && (
                        <button
                          onClick={() => handleFilter('bookmarked')}
                          className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                            filter === 'bookmarked'
                              ? 'bg-blue-600 text-white'
                              : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span>Bookmarked</span>
                          {filter === 'bookmarked' && <span>✓</span>}
                        </button>
                      )}

                      <div className={`mt-2 pt-2 border-t px-3 py-1.5 text-[11px] font-black uppercase tracking-wider ${
                        theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'
                      }`}>
                        Filter By Category
                      </div>

                      {/* Scrollable Categories List (showing ~5-7 items max height) */}
                      <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => handleFilter('category', category)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                              filter === 'category' && selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : theme === 'dark'
                                  ? 'text-gray-300 hover:bg-gray-700'
                                  : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span className="truncate">{category}</span>
                            {filter === 'category' && selectedCategory === category && <span>✓</span>}
                          </button>
                        ))}
                      </div>

                      {(filter !== 'all' || searchQuery) && (
                        <div className={`mt-2 pt-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                          <button
                            onClick={clearAllFilters}
                            className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors"
                          >
                            Clear All Filters
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                className={`px-3 md:px-4 py-3 border rounded-full transition-all duration-300 font-medium ${
                  theme === 'dark'
                     ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
                title="Bookmark (functionality to be added)"
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3-7 3V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filter posts based on search query and filters */}
        {(() => {
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
              // Show only top 10 most viewed posts
              filteredPosts = filteredPosts.slice(0, 10);
              break;
            case 'category':
              if (selectedCategory) {
                filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
              }
              break;
            case 'bookmarked':
              // For bookmarked filter, we'll use the bookmarkedPosts from state
              // This will be populated by the useEffect when filter changes
              const bookmarkedPosts = useSelector((state) => state.posts.bookmarkedPosts);
              filteredPosts = bookmarkedPosts.filter((post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
              );
              break;
            default:
              break;
          }

          return (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
              {filteredPosts.length === 0 ? (
                <div className="w-full col-span-2">
                  <EmptySearchResults theme={theme} />
                </div>
              ) : (
                filteredPosts.slice(0, visiblePosts).map((post) => (
                  <div key={post._id || post.id}>
                    <PostCard post={post} />
                    <button onClick={toggleDetails} className="mt-2 text-blue-600 underline text-sm">
                      {showDetails ? 'Hide Details' : 'Show Details'}
                    </button>
                    {showDetails && (
                      <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        <strong>Author:</strong> {post.author} <br />
                        <strong>Date:</strong> {post.createdAt}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          );
        })()}

        {/* Button logic based on filtered posts */}
        {(() => {
          let filteredPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Apply the same filter logic as above
          switch (filter) {
            case 'newest':
              filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              break;
            case 'oldest':
              filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
              break;
            case 'mostViewed':
              filteredPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
              // Show only top 10 most viewed posts
              filteredPosts = filteredPosts.slice(0, 10);
              break;
            case 'category':
              if (selectedCategory) {
                filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
              }
              break;
            case 'bookmarked':
              // For bookmarked filter, we'll use the bookmarkedPosts from state
              const bookmarkedPosts = useSelector((state) => state.posts.bookmarkedPosts);
              filteredPosts = bookmarkedPosts.filter((post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
              );
              break;
            default:
              break;
          }

          return (
            <div className="text-center mt-8">
              {visiblePosts < filteredPosts.length && (
                <button
                  onClick={showMorePosts}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold transform hover:scale-105">
                  More Blogs
                </button>
              )}
              {visiblePosts >= filteredPosts.length && filteredPosts.length > 2 && (
                <Link
                  to="/explore"
                  className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold transform hover:scale-105"
                >
                  Explore All
                </Link>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export default HomePage;
