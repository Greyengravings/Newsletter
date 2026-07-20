import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { bookmarkPost, unbookmarkPost, incrementViewCount } from '../features/posts/postsSlice';

function PostCard({ post }) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const username = useSelector((state) => state.auth?.username);
  const userId = useSelector((state) => state.auth?.userId);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (isLoggedIn && userId && post.bookmarkedBy) {
      setIsBookmarked(post.bookmarkedBy.includes(userId));
    }
  }, [isLoggedIn, userId, post.bookmarkedBy]);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn || !userId) {
      alert('Please login to bookmark posts');
      return;
    }

    try {
      if (isBookmarked) {
        await dispatch(unbookmarkPost({ postId: post._id, userId: userId })).unwrap();
        setIsBookmarked(false);
      } else {
        await dispatch(bookmarkPost({ postId: post._id, userId: userId })).unwrap();
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error bookmarking post:', error);
      alert('Error bookmarking post. Please try again.');
    }
  };

  const handleReadMore = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Increment view count when user clicks "Read More"
    try {
      await dispatch(incrementViewCount(post._id)).unwrap();
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="block">
      <div className={`rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out group border ${
        theme === 'dark'
          ? 'bg-slate-900/60 border-white/10' // Semi-transparent dark
          : 'bg-white/60 border-gray-200/50' // Semi-transparent light
      } backdrop-blur-sm`}>
        {/* Blog Post Image */}
        <div className="relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full aspect-[4/3] object-cover"
          />
          {/* Category Tag */}
          <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {post.category}
          </span>
          {/* Bookmark Button */}
          {isLoggedIn && (
            <button
              onClick={handleBookmark}
              className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                isBookmarked
                  ? 'bg-yellow-500 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this post'}
            >
              <svg
                className="w-5 h-5"
                fill={isBookmarked ? 'currentColor' : 'none'}
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
          )}
        </div>

        <div className="p-6">
          <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-blue-600 ${
            theme === 'dark'
              ? 'text-white' // Light text for dark mode
              : 'text-gray-800' // Dark text for light mode
          }`}>{post.title}</h2>
          {/* Author and Date Info */}
          <div className={`flex items-center text-sm mb-2 ${
            theme === 'dark'
              ? 'text-gray-300' // Light gray text for dark mode
              : 'text-gray-500' // Dark gray text for light mode
          }`}>
            <span>By {post.author}</span>
            <span className="mx-2">&bull;</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          {/* Preview Description */}
          {post.excerpt && (
            <p className={`mb-4 text-sm leading-relaxed ${
              theme === 'dark'
                ? 'text-gray-200' // Light text for dark mode
                : 'text-gray-700' // Dark text for light mode
            }`}>{post.excerpt}</p>
          )}
          <div className="flex justify-between items-center">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors duration-300 cursor-pointer" onClick={handleReadMore}>
              Read More &rarr;
            </div>
            <div className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>
              {post.views || 0} views
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
