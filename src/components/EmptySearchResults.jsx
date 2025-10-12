import React from 'react';

function EmptySearchResults({ theme }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Professional illustration - you can replace this with an imported image */}
      <div className="mb-6">
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/no-data-found-1965030-1662569.png"
          alt="No search results"
          className="w-48 h-36 object-contain opacity-70"
          style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}
        />
      </div>

      <p className={`text-center text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
        No posts match your search
      </p>
      <p className={`text-center text-sm mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
        Try adjusting your keywords or search terms
      </p>
    </div>
  );
}

export default EmptySearchResults;
