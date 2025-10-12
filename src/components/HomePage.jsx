import React from 'react';
import PostCard from '../components/PostCard';

// Sample data - you will replace this with data from your API
const mockPosts = [
  { id: 1, title: 'My First Post', excerpt: 'This is the beginning of my new blog. Here, I will share my thoughts on web development...', createdAt: '2025-07-28' },
  { id: 2, title: 'Understanding React Hooks', excerpt: 'React Hooks have changed the way we write components. Let\'s dive into useState and useEffect...', createdAt: '2025-07-27' },
  { id: 3, title: 'A Guide to Tailwind CSS', excerpt: 'Tailwind CSS is a utility-first CSS framework that allows for rapid UI development...', createdAt: '2025-07-26' },
];

function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-black-1000 mb-8">Latest Posts</h1>
      {mockPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default HomePage;