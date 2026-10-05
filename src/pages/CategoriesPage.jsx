import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { fetchPosts, setFilter } from '../features/posts/postsSlice';

function CategoriesPage() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts?.posts || []);
  const postStatus = useSelector((state) => state.posts?.status);

  // Filter default is 'all' (No filter)
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.title = "Categories - The Digital Canvas Blog";
  }, []);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOptions = [
    {
      id: 'all',
      label: 'All Categories',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      description: 'Showing all categories in default order (No Filter)'
    },
    {
      id: 'mostRelevant',
      label: 'Most Relevant',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'Arranged by match score & topic relevance'
    },
    {
      id: 'userInterest',
      label: 'User Interest',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Tailored based on reading preferences & activity'
    },
    {
      id: 'mostReaders',
      label: 'Most Readers',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      description: 'Categories with highest total audience & views'
    },
    {
      id: 'heatOfDay',
      label: 'Heat of Day',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
      description: 'Hottest & most active topics trending today'
    },
    {
      id: 'bestOfWeek',
      label: 'Best of Week',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      description: 'Top-ranked & most celebrated categories this week'
    }
  ];

  const activeOption = filterOptions.find((opt) => opt.id === activeFilter) || filterOptions[0];

  const categoryMetricsBase = {
    'Technology':          { relevance: 98, interest: 9.6, readers: 185000, heat: 96, weeklyRank: 1 },
    'AI & ML':             { relevance: 99, interest: 9.8, readers: 210000, heat: 99, weeklyRank: 2 },
    'Business & Finance':  { relevance: 91, interest: 9.1, readers: 155000, heat: 90, weeklyRank: 3 },
    'Coding':              { relevance: 94, interest: 9.2, readers: 162000, heat: 91, weeklyRank: 4 },
    'Productivity':        { relevance: 90, interest: 9.0, readers: 145000, heat: 89, weeklyRank: 5 },
    'Web Dev':             { relevance: 92, interest: 9.0, readers: 148000, heat: 88, weeklyRank: 6 },
    'Design':              { relevance: 89, interest: 8.7, readers: 130000, heat: 85, weeklyRank: 7 },
    'Digital Marketing':   { relevance: 88, interest: 8.8, readers: 135000, heat: 87, weeklyRank: 8 },
    'Full Stack':          { relevance: 88, interest: 8.9, readers: 125000, heat: 84, weeklyRank: 9 },
    'Travel & Adventure':  { relevance: 86, interest: 8.7, readers: 128000, heat: 85, weeklyRank: 10 },
    'Data Science':        { relevance: 86, interest: 8.5, readers: 115000, heat: 82, weeklyRank: 11 },
    'Health & Fitness':    { relevance: 85, interest: 8.6, readers: 118000, heat: 84, weeklyRank: 12 },
    'Cybersecurity':       { relevance: 85, interest: 8.4, readers: 108000, heat: 87, weeklyRank: 13 },
    'Lifestyle & Wellness':{ relevance: 84, interest: 8.5, readers: 110000, heat: 82, weeklyRank: 14 },
    'Cloud':               { relevance: 82, interest: 8.1, readers: 95000,  heat: 79, weeklyRank: 15 },
    'Mobile Dev':          { relevance: 84, interest: 8.3, readers: 102000, heat: 83, weeklyRank: 16 },
    'Photography & Art':   { relevance: 82, interest: 8.3, readers: 96000,  heat: 80, weeklyRank: 17 },
    'DevOps':              { relevance: 81, interest: 8.0, readers: 91000,  heat: 80, weeklyRank: 18 },
    'Creative Writing':    { relevance: 81, interest: 8.2, readers: 92000,  heat: 78, weeklyRank: 19 },
    'Blockchain':          { relevance: 79, interest: 7.9, readers: 87000,  heat: 86, weeklyRank: 20 },
    'UI/UX Design':        { relevance: 87, interest: 8.6, readers: 120000, heat: 81, weeklyRank: 21 },
    'Game Dev':            { relevance: 77, interest: 7.7, readers: 78000,  heat: 76, weeklyRank: 22 },
    'Open Source':         { relevance: 83, interest: 8.2, readers: 98000,  heat: 78, weeklyRank: 23 },
    'Gadgets':             { relevance: 78, interest: 7.8, readers: 82000,  heat: 75, weeklyRank: 24 },
    'Career & Tech':       { relevance: 80, interest: 8.1, readers: 89000,  heat: 74, weeklyRank: 25 },
    'Others':              { relevance: 70, interest: 7.0, readers: 60000,  heat: 65, weeklyRank: 26 },
  };

  const rawCategories = [
    { name: 'Technology', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' },
    { name: 'AI & ML', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },
    { name: 'Business & Finance', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    { name: 'Coding', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800' },
    { name: 'Productivity', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800' },
    { name: 'Web Dev', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800' },
    { name: 'Design', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
    { name: 'Digital Marketing', img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800' },
    { name: 'Full Stack', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800' },
    { name: 'Travel & Adventure', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800' },
    { name: 'Data Science', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzt27MjSQ8WKuYZOw5lzGbROGfSNuB-sYXprB1ztzNfuanuPJ9jlWELc&s=10' },
    { name: 'Health & Fitness', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800' },
    { name: 'Cybersecurity', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Lifestyle & Wellness', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800' },
    { name: 'Cloud', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Mobile Dev', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Photography & Art', img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800' },
    { name: 'DevOps', img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800' },
    { name: 'Creative Writing', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800' },
    { name: 'Blockchain', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800' },
    { name: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Game Dev', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
    { name: 'Open Source', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Gadgets', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Career & Tech', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Others', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800' },
  ];

  // Process and aggregate metrics
  const processedCategories = rawCategories.map((cat) => {
    const postsPerCat = posts.filter(p => p.category?.toLowerCase() === cat.name.toLowerCase());
    const catViews = postsPerCat.reduce((sum, p) => sum + (p.views || 0), 0);
    const catCount = postsPerCat.length;

    const base = categoryMetricsBase[cat.name] || {
      relevance: 75, interest: 7.5, readers: 50000, heat: 70, weeklyRank: 19
    };

    const readersVal = base.readers + (catViews * 15);
    const heatVal = Math.min(100, base.heat + Math.min(catCount * 3, 8));
    const relevanceVal = Math.min(100, base.relevance + (catCount > 0 ? 2 : 0));
    const interestVal = Math.min(10.0, Number((base.interest + (catCount > 0 ? 0.2 : 0)).toFixed(1)));
    const weeklyRankVal = base.weeklyRank;

    return {
      ...cat,
      postCount: catCount,
      metrics: {
        relevance: relevanceVal,
        interest: interestVal,
        readers: readersVal,
        heat: heatVal,
        weeklyRank: weeklyRankVal
      }
    };
  });

  // Sort based on activeFilter
  const sortedCategories = activeFilter === 'all'
    ? [...processedCategories]
    : [...processedCategories].sort((a, b) => {
        switch (activeFilter) {
          case 'userInterest':
            return b.metrics.interest - a.metrics.interest;
          case 'mostReaders':
            return b.metrics.readers - a.metrics.readers;
          case 'heatOfDay':
            return b.metrics.heat - a.metrics.heat;
          case 'bestOfWeek':
            return a.metrics.weeklyRank - b.metrics.weeklyRank;
          case 'mostRelevant':
          default:
            return b.metrics.relevance - a.metrics.relevance;
        }
      });

  // Filter categories by search query
  const filteredCategories = sortedCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleCategoryClick = (category) => {
    dispatch(setFilter({ filter: 'category', category }));
    navigate('/explore');
  };

  // Helper for filter-specific badge & card styling
  const getFilterAppearance = (cat, index) => {
    const isTop3 = index < 3;
    const isTop1 = index === 0;

    switch (activeFilter) {
      case 'userInterest':
        return {
          pillText: `★ ${cat.metrics.interest} Score`,
          pillBg: theme === 'dark' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50' : 'bg-emerald-50 text-emerald-700 border-emerald-300',
          topTag: isTop1 ? '🎯 Top Pick' : isTop3 ? '⭐ Interested' : null,
          cardBorder: isTop1 ? 'border-emerald-500 shadow-emerald-500/10' : 'hover:border-emerald-500',
          showRank: true
        };
      case 'mostReaders':
        return {
          pillText: `${(cat.metrics.readers / 1000).toFixed(0)}k Readers`,
          pillBg: theme === 'dark' ? 'bg-purple-950/80 text-purple-300 border-purple-700/50' : 'bg-purple-50 text-purple-700 border-purple-300',
          topTag: isTop1 ? '👑 #1 Audience' : isTop3 ? '👁️ Popular' : null,
          cardBorder: isTop1 ? 'border-purple-500 shadow-purple-500/10' : 'hover:border-purple-500',
          showRank: true
        };
      case 'heatOfDay':
        return {
          pillText: null,
          pillBg: '',
          topTag: isTop1 ? '⚡ Hottest' : isTop3 ? '🔥 Trending' : null,
          cardBorder: isTop3 ? 'border-amber-500/80 shadow-amber-500/15' : 'hover:border-amber-500',
          showRank: true
        };
      case 'bestOfWeek':
        return {
          pillText: `🏆 Rank #${index + 1}`,
          pillBg: theme === 'dark' ? 'bg-yellow-950/80 text-yellow-300 border-yellow-700/50' : 'bg-yellow-50 text-yellow-800 border-yellow-300',
          topTag: isTop1 ? '🥇 Best Category' : isTop3 ? `🏆 Top ${index + 1}` : null,
          cardBorder: isTop1 ? 'border-yellow-500 shadow-yellow-500/15' : 'hover:border-yellow-500',
          showRank: true
        };
      case 'mostRelevant':
        return {
          pillText: `${cat.metrics.relevance}% Match`,
          pillBg: theme === 'dark' ? 'bg-blue-950/80 text-blue-300 border-blue-700/50' : 'bg-blue-50 text-blue-700 border-blue-300',
          topTag: isTop1 ? '⚡ Top Match' : isTop3 ? '✨ High Match' : null,
          cardBorder: isTop1 ? 'border-blue-500 shadow-blue-500/10' : 'hover:border-blue-500',
          showRank: true
        };
      case 'all':
      default:
        return {
          pillText: null,
          pillBg: '',
          topTag: null,
          cardBorder: 'hover:border-blue-500',
          showRank: false
        };
    }
  };

  return (
    <div className={`p-4 md:p-8 min-h-screen transition-colors duration-500 max-w-6xl mx-auto ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">Categories</h1>
          <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore topics sorted by interest, readership, and real-time trends.
          </p>
        </div>

        {/* Search Bar, Filter & View Mode Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          {/* Search Input Bar */}
          <div className="relative flex-1 sm:w-52">
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 px-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-7 py-3 rounded-2xl text-sm transition-colors focus:outline-none focus:border-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <svg
                className={`w-4 h-4 absolute left-3 top-3.5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-2.5 top-3.5 text-xs rounded-full w-4 h-4 flex items-center justify-center transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600'
                      : 'text-gray-500 hover:text-gray-900 bg-gray-200 hover:bg-gray-300'
                  }`}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Side-by-side row for View & Arrange By on mobile */}
          <div className="flex flex-row items-end gap-3">
            {/* View Mode Toggle Button Group */}
            <div className="flex-1 sm:flex-initial">
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 px-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                View
              </label>
              <div className={`flex items-center p-1 rounded-2xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Grid View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="List View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>List</span>
                </button>
              </div>
            </div>

            {/* Dropdown Filter Menu */}
            <div className="relative flex-1 sm:flex-initial text-left" ref={dropdownRef}>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 px-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Arrange By
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-3 rounded-2xl border text-sm font-semibold transition-all duration-300 shadow-sm focus:outline-none sm:min-w-[200px] ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-750 hover:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-blue-500'
                }`}
                aria-expanded={isDropdownOpen}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-blue-500 flex-shrink-0">{activeOption.icon}</span>
                  <span className="truncate">{activeOption.label}</span>
                </div>
                <svg
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180 text-blue-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu Overlay */}
              {isDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-full sm:w-72 rounded-2xl shadow-2xl z-30 border overflow-hidden transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}>
                  <div className="p-1.5 space-y-1">
                    {filterOptions.map((option) => {
                      const isSelected = option.id === activeFilter;
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            setActiveFilter(option.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                            isSelected
                              ? theme === 'dark'
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                              : theme === 'dark'
                                ? 'hover:bg-gray-700/60 text-gray-300'
                                : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <span className={`mt-0.5 p-1 rounded-lg ${
                            isSelected
                              ? 'bg-blue-500 text-white'
                              : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {option.icon}
                          </span>
                          <div>
                            <div className="text-sm font-bold flex items-center justify-between">
                              {option.label}
                              {isSelected && (
                                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <p className={`text-xs mt-0.5 line-clamp-2 ${
                              isSelected
                                ? theme === 'dark' ? 'text-blue-300/80' : 'text-blue-600/80'
                                : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {option.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Empty Search Result State */}
      {filteredCategories.length === 0 ? (
        <div className={`text-center py-16 rounded-2xl border ${
          theme === 'dark' ? 'bg-gray-800/40 border-gray-800' : 'bg-gray-50 border-gray-200'
        }`}>
          <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            No categories found matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : viewMode === 'list' ? (
        /* List View Layout */
        <div className="flex flex-col gap-3.5 px-1">
          {filteredCategories.map((cat, index) => {
            const appearance = getFilterAppearance(cat, index);
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer group shadow-xs hover:shadow-md ${
                  theme === 'dark'
                    ? 'bg-gray-800/60 border-gray-700/80 hover:border-blue-500 hover:bg-gray-800'
                    : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Category Image Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-black/10">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {appearance.showRank && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-black text-white">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* Category Text & Info */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-base sm:text-lg font-extrabold tracking-wide transition-colors ${
                        theme === 'dark' ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {cat.name}
                      </h3>
                      {appearance.topTag && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          {appearance.topTag}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {cat.postCount > 0 ? `${cat.postCount} ${cat.postCount === 1 ? 'blog post' : 'blog posts'}` : 'Explore articles & tutorials'}
                    </p>
                  </div>
                </div>

                {/* Right Metric Tag & Navigation Arrow */}
                <div className="flex items-center gap-3">
                  {appearance.pillText && (
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border shadow-xs tracking-wide transition-colors ${appearance.pillBg}`}>
                      {appearance.pillText}
                    </span>
                  )}
                  <svg
                    className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                      theme === 'dark' ? 'text-gray-500 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid View Layout */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10 px-1">
          {filteredCategories.map((cat, index) => {
            const appearance = getFilterAppearance(cat, index);
            return (
              <div key={cat.name} className="flex flex-col items-center group">
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`relative w-full aspect-square rounded-[22%] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border-2 active:scale-95 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  } ${appearance.cardBorder}`}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Top Rank / Special Tag Overlay */}
                  {appearance.topTag && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 text-[10px] font-black tracking-wider uppercase rounded-full shadow-md backdrop-blur-md bg-black/70 text-white border border-white/20">
                        {appearance.topTag}
                      </span>
                    </div>
                  )}

                  {/* Rank Number Badge */}
                  {appearance.showRank && (
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[11px] font-black text-white">
                        #{index + 1}
                      </span>
                    </div>
                  )}
                </button>

                {/* Category Title */}
                <span className={`mt-3.5 text-xs sm:text-sm md:text-base font-extrabold tracking-wider uppercase text-center transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-200 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'
                }`}>
                  {cat.name}
                </span>

                {/* Dynamic Filter Metric Tag / Pill */}
                {appearance.pillText && (
                  <div className="mt-1.5">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border shadow-xs tracking-wide transition-colors ${appearance.pillBg}`}>
                      {appearance.pillText}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
