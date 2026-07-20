import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { fetchPosts, setFilter } from '../features/posts/postsSlice';

function CategoriesPage() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Top 10 categories + Others
  const allCategories = [
    { name: 'Technology', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' },
    { name: 'AI', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },
    { name: 'Design', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
    { name: 'Coding', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800' },
    { name: 'Full Stack', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800' },
    { name: 'Web Dev', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800' },
    { name: 'Data Science', img: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800' },
    { name: 'Cybersecurity', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Cloud', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Gadgets', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Others', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800' },
  ];

  const handleCategoryClick = (category) => {
    dispatch(setFilter({ filter: 'category', category }));
    navigate('/explore');
  };

  return (
    <div className={`p-4 md:p-8 min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-16 text-center tracking-tight">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 max-w-5xl mx-auto px-4">
        {allCategories.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center group">
            <button
              onClick={() => handleCategoryClick(cat.name)}
              className="relative w-full aspect-square rounded-[22%] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-500 active:scale-95 bg-gray-100 dark:bg-gray-800"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </button>

            <span className={`mt-6 text-[11px] font-bold tracking-[0.2em] uppercase text-center transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-500 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-600'
            }`}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
