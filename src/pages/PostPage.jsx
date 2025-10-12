import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { fetchPostById } from '../features/posts/postsSlice';

function PostPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { currentPost, postStatus, postError } = useSelector((state) => state.posts);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = "My Blog | Post";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, postId]);

  if (postStatus === 'loading') {
    return <div className="text-center py-8">Loading post...</div>;
  }

  if (postStatus === 'failed') {
    return <div className="text-center py-8 text-red-500">Error: {postError}</div>;
  }

  if (!currentPost) {
    return <div className="text-center py-8">Post not found.</div>;
  }

  return (
    <article className={`rounded-xl shadow-xl overflow-hidden ${
      theme === 'dark'
        ? 'bg-gray-800' // Dark background for dark mode
        : 'bg-white' // White background for light mode
    }`}>
      {/* Post Banner Image */}
      <img src={currentPost.imageUrl} alt={currentPost.title} className="w-full h-64 md:h-96 object-cover" />

      <div className="p-6 md:p-12">
        <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 ${
          theme === 'dark'
            ? 'text-white' // Light text for dark mode
            : 'text-gray-900' // Dark text for light mode
        }`}>{currentPost.title}</h1>
        <div className={`flex items-center text-sm mb-8 ${
          theme === 'dark'
            ? 'text-gray-300' // Light gray text for dark mode
            : 'text-gray-500' // Dark gray text for light mode
        }`}>
          <span>By {currentPost.author}</span>
          <span className="mx-2">&bull;</span>
          <span>Published on {new Date(currentPost.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Using the 'prose' class from the typography plugin for beautiful article styling */}
        <div
          className={`prose prose-lg max-w-none ${
            theme === 'dark'
              ? 'prose-invert' // Inverted prose styling for dark mode
              : ''
          }`}
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link to="/" className={`inline-block px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' // Dark mode button colors
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300' // Light mode button colors
          }`}>
            &larr; Back to All Posts
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostPage;