import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost } from '../features/posts/postsSlice';
import { logout } from '../features/auth/authSlice';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';

function AdminDashboard() {
  const posts = useSelector((state) => state.posts.posts);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const categories = ['TECHNOLOGY', 'EDUCATION', 'LIFESTYLE', 'TRAVEL', 'FOOD', 'HEALTH', 'BUSINESS', 'SPORTS', 'ENTERTAINMENT', 'FINANCE', 'SCIENCE', 'ART', 'MUSIC', 'FASHION', 'POLITICS', 'ENVIRONMENT', 'GAMING', 'AUTOMOTIVE', 'REAL ESTATE', 'PARENTING'];

  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    author: '',
    content: '',
    imageUrl: '',
    category: '',
  });

  const [profile, setProfile] = useState({
    displayName: '',
    profilePicture: '',
  });

  const [editProfile, setEditProfile] = useState({
    displayName: '',
    profilePicture: '',
    profilePictureFile: null,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // User management state
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    membershipDays: 30,
  });

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  // Fetch admin profile on mount
  useEffect(() => {
    if (!username) return;
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/admin/profile/${encodeURIComponent(username)}`);
        if (response.data && response.data.profile) {
          setProfile({
            displayName: response.data.profile.displayName || '',
            profilePicture: response.data.profile.profilePicture || '',
          });
          setEditProfile({
            displayName: response.data.profile.displayName || '',
            profilePicture: response.data.profile.profilePicture || '',
            profilePictureFile: null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, [username]);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/admin/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.username || !newUser.email || !newUser.password) {
        showToast('Please fill all user fields', 'error');
        return;
      }
      await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/admin/users`, newUser);
      setNewUser({ username: '', email: '', password: '', role: 'user', membershipDays: 30 });
      fetchUsers();
      showToast('User created successfully!', 'success');
    } catch (error) {
      console.error('Failed to add user:', error);
      showToast(error.response?.data?.message || 'Error adding user', 'error');
    }
  };

  const handleUpdateMembership = async (userId, membershipDays) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/admin/users/${userId}/membership`, { membershipDays });
      fetchUsers();
      showToast('Membership updated', 'success');
    } catch (error) {
      console.error('Failed to update membership:', error);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/admin/users/${userId}`);
        fetchUsers();
        showToast('User removed', 'success');
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleUserInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const handleAdd = () => {
    if (!newPost.title || !newPost.author || !newPost.content) {
      showToast('Please fill in Title, Author and Content', 'error');
      return;
    }
    setShowPreviewModal(true);
  };

  const confirmPublish = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/blogs`, {
        ...newPost,
        createdAt: new Date().toISOString(),
      });
      dispatch(addPost(response.data));
      setNewPost({ title: '', excerpt: '', author: '', content: '', imageUrl: '', category: '' });
      setShowPreviewModal(false);
      showToast('Post published successfully!', 'success');
    } catch (error) {
      console.error('Failed to add post:', error);
      showToast('Failed to publish post', 'error');
    }
  };

  const handleDelete = (id, title) => {
    setPostToDelete({ id, title });
    setConfirmTitle('');
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (confirmTitle === postToDelete.title) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/blogs/${postToDelete.id}`);
        dispatch(deletePost(postToDelete.id));
        setShowConfirmModal(false);
        setPostToDelete(null);
        showToast('Post deleted', 'success');
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleProfileChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditProfile({ ...editProfile, profilePictureFile: file });
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('displayName', editProfile.displayName);
      if (editProfile.profilePictureFile) {
        formData.append('profilePictureFile', editProfile.profilePictureFile);
      } else {
        formData.append('profilePicture', editProfile.profilePicture);
      }
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/admin/profile/${encodeURIComponent(username)}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data && response.data.profile) {
        setProfile({
          displayName: response.data.profile.displayName,
          profilePicture: response.data.profile.profilePicture,
        });
        setEditProfile({ ...editProfile, profilePictureFile: null });
        showToast('Profile updated', 'success');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  const inputClasses = `w-full p-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium ${
    theme === 'dark'
      ? 'bg-gray-900 border-white/20 text-white placeholder-gray-600 focus:border-blue-500/50'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-600/50'
  }`;

  const cardClasses = `p-6 rounded-[2.5rem] border shadow-2xl transition-all duration-500 ${
    theme === 'dark' ? 'bg-gray-800 border-white/5 shadow-black/40' : 'bg-white border-gray-100 shadow-gray-200/50'
  }`;

  return (
    <div className={`max-w-[1600px] mx-auto py-4 px-6 transition-all duration-500 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top duration-500">
          <div className={`px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 backdrop-blur-xl border ${
            toast.type === 'success'
              ? (theme === 'dark' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-green-50 border-green-200 text-green-600')
              : (theme === 'dark' ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-red-50 border-red-200 text-red-600')
          }`}>
            <span className="font-black tracking-tight">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-1">Admin Dashboard</h2>
          <p className="font-bold opacity-30 text-xs uppercase tracking-widest">Management Console</p>
        </div>
        <button
          onClick={() => { dispatch(logout()); window.location.href = '/'; }}
          className="px-8 py-3 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-[0.98]"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Column - Edit Profile */}
        <div className={`${cardClasses} flex flex-col`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Admin Profile</h3>
          </div>

          <div className="space-y-6 flex-grow">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest opacity-40 mb-2 px-1">Display Name</label>
              <input name="displayName" type="text" value={editProfile.displayName} onChange={handleProfileChange} className={inputClasses} placeholder="Admin Name" />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest opacity-40 mb-2 px-1">Profile Picture</label>
              <div className="space-y-4">
                <input name="profilePicture" type="text" value={editProfile.profilePicture} onChange={handleProfileChange} className={inputClasses} placeholder="Image URL" disabled={editProfile.profilePictureFile !== null} />
                <div className="relative">
                   <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                   <label htmlFor="file-upload" className={`flex items-center justify-center p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${theme === 'dark' ? 'border-white/20 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <span className="font-bold opacity-60 text-sm">{editProfile.profilePictureFile ? editProfile.profilePictureFile.name : "Click to upload image file"}</span>
                   </label>
                </div>
              </div>
            </div>

            {(editProfile.profilePicture || editProfile.profilePictureFile) && (
              <div className="flex justify-center pt-4">
                <img src={editProfile.profilePictureFile ? URL.createObjectURL(editProfile.profilePictureFile) : editProfile.profilePicture} alt="Preview" className="w-48 h-48 object-cover rounded-[3rem] border-4 border-blue-500/20 shadow-2xl" />
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <button onClick={handleUpdateProfile} className="px-12 py-4 bg-blue-600 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]">
              Save Profile
            </button>
          </div>
        </div>

        {/* Right Column - Add Post */}
        <div className={`${cardClasses} flex flex-col`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Create Post</h3>
          </div>

          <div className="space-y-4 flex-grow">
            <input name="title" value={newPost.title} onChange={handleChange} placeholder="Article Title" className={inputClasses} />
            <div className="grid grid-cols-2 gap-4">
              <input name="author" value={newPost.author} onChange={handleChange} placeholder="Author" className={inputClasses} />
              <select name="category" value={newPost.category} onChange={handleChange} className={inputClasses}>
                <option value="">Category</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <input name="imageUrl" value={newPost.imageUrl} onChange={handleChange} placeholder="Cover Image URL" className={inputClasses} />
            <textarea name="excerpt" value={newPost.excerpt} onChange={handleChange} placeholder="Short Excerpt" className={`${inputClasses} h-24 resize-none`} />
            <textarea name="content" value={newPost.content} onChange={handleChange} placeholder="Full Content (HTML allowed)" className={`${inputClasses} h-40 resize-none`} />
          </div>

          <div className="mt-8 flex justify-center">
            <button onClick={handleAdd} className="px-12 py-4 bg-blue-600 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]">
              Preview & Publish
            </button>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className={`${cardClasses} mb-6`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black tracking-tight">Existing Blogs</h3>
          <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-500 font-black text-xs uppercase tracking-widest">{posts.length} Posts</span>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-black uppercase tracking-widest opacity-30 border-b border-gray-100 dark:border-white/5">
                <th className="pb-4 px-4">Title</th>
                <th className="pb-4 px-4">Author</th>
                <th className="pb-4 px-4">Date</th>
                <th className="pb-4 px-4 text-center">Views</th>
                <th className="pb-4 px-4 text-center">Likes</th>
                <th className="pb-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center font-bold opacity-30 italic">No blogs found in the system.</td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id || post.id} className={`group border-b border-gray-100 dark:border-white/5 transition-colors ${theme === 'dark' ? 'hover:bg-white/2' : 'hover:bg-gray-50'}`}>
                    <td className="py-5 px-4">
                      <span className="font-black text-lg block max-w-[300px] truncate">{post.title}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">{post.category}</span>
                    </td>
                    <td className="py-5 px-4 font-bold opacity-60">{post.author}</td>
                    <td className="py-5 px-4 text-sm opacity-40 font-medium">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="py-5 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/5 text-blue-500 font-black text-xs">
                        {formatNumber(post.views || 0)}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-500/5 text-red-500 font-black text-xs">
                        {formatNumber(post.likes || 0)}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <button onClick={() => handleDelete(post._id || post.id, post.title)} className="px-4 py-2 text-red-500 font-black hover:bg-red-500/10 rounded-2xl transition-all">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Add New User Panel */}
        <div className={cardClasses}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Add User</h3>
          </div>

          <div className="space-y-4">
            <input name="username" value={newUser.username} onChange={handleUserInputChange} placeholder="Username" className={inputClasses} />
            <input name="email" value={newUser.email} onChange={handleUserInputChange} placeholder="Email" type="email" className={inputClasses} />
            <input name="password" value={newUser.password} onChange={handleUserInputChange} placeholder="Password" type="password" className={inputClasses} />
            <div className="grid grid-cols-2 gap-4">
              <select name="role" value={newUser.role} onChange={handleUserInputChange} className={inputClasses}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <input name="membershipDays" value={newUser.membershipDays} onChange={handleUserInputChange} placeholder="Days" type="number" className={inputClasses} />
            </div>
            <div className="pt-4 flex justify-center">
              <button onClick={handleAddUser} className="px-10 py-4 bg-blue-600 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]">
                Create User
              </button>
            </div>
          </div>
        </div>

        {/* User Management List */}
        <div className={`${cardClasses} lg:col-span-2`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">System Members</h3>
                <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mt-0.5">{users.length} Active Records</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
            {users.map((user) => (
              <div key={user._id} className={`p-4 rounded-3xl border transition-all ${theme === 'dark' ? 'bg-gray-900/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center font-black text-blue-500 text-xl">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-xl leading-none">{user.username}</span>
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>{user.role}</span>
                      </div>
                      <p className="font-bold opacity-40 text-sm mt-1">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-20 mb-1">Membership Expiry</p>
                      <p className="font-bold text-sm">{new Date(user.membershipEndDate).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative group/input">
                        <input type="number" placeholder="Days" className={`${inputClasses} !py-2.5 !px-4 !w-24 text-center !rounded-xl !text-sm`} onChange={(e) => {
                          const days = parseInt(e.target.value);
                          if (days > 0) handleUpdateMembership(user._id, days);
                        }} />
                        <span className="absolute -top-7 left-0 w-full text-center text-[8px] font-black uppercase tracking-widest opacity-0 group-focus-within/input:opacity-30 transition-opacity">Extend Days</span>
                      </div>
                      <button onClick={() => handleDeleteUser(user._id, user.username)} className="p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HeroUI Inspired Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300" onClick={() => setShowConfirmModal(false)} />
          <div className={`relative w-full max-w-[400px] transform overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-white/10 text-white' : 'bg-white border border-gray-100 text-gray-900'}`}>
            <div className="px-8 pt-8 pb-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2">Delete permanently?</h3>
              <p className="text-sm font-medium opacity-60 leading-relaxed">This will permanently delete <strong className="text-red-500">"{postToDelete?.title}"</strong>. This action cannot be undone.</p>
            </div>
            <div className="px-8 py-4">
              <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3 text-center">Type heading to confirm</p>
              <input type="text" value={confirmTitle} onChange={(e) => setConfirmTitle(e.target.value)} placeholder="Enter exact heading" className={`${inputClasses} text-center !font-black !text-lg !border-red-500/30`} />
            </div>
            <div className="px-8 pb-8 pt-4 flex flex-col gap-3">
              <button onClick={confirmDelete} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-full transition-all shadow-xl shadow-red-600/30 active:scale-[0.98] disabled:opacity-50" disabled={confirmTitle !== postToDelete?.title}>Delete Post</button>
              <button onClick={() => setShowConfirmModal(false)} className={`w-full py-3 font-bold text-sm transition-all hover:opacity-100 opacity-60 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-300" onClick={() => setShowPreviewModal(false)} />
          <div className={`relative w-full max-w-5xl transform overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-white/10 text-white' : 'bg-white border border-gray-100 text-gray-900'}`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-black tracking-tight">Post Preview</h3>
                <button onClick={() => setShowPreviewModal(false)} className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Column 1: Card Preview */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Feed Presentation</p>
                  <div className={`overflow-hidden rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-gray-900 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="h-64 relative overflow-hidden">
                      <img src={newPost.imageUrl || 'https://via.placeholder.com/800x400'} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest">{newPost.category || 'CATEGORY'}</div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-2xl font-black tracking-tight mb-3 line-clamp-2">{newPost.title || 'Post Title'}</h4>
                      <p className="font-bold opacity-60 text-sm mb-4 line-clamp-3 leading-relaxed">{newPost.excerpt || 'Excerpt content will appear here...'}</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-500/40" />
                        <span className="text-xs font-black uppercase tracking-widest opacity-40">{newPost.author || 'Author'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Content Preview */}
                <div className="flex flex-col">
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Full Content Analysis</p>
                  <div className={`flex-grow p-6 rounded-3xl border overflow-y-auto max-h-[400px] scrollbar-hide ${theme === 'dark' ? 'bg-gray-900/50 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="prose prose-sm dark:prose-invert max-w-none font-medium opacity-80" dangerouslySetInnerHTML={{ __html: newPost.content || 'No content provided.' }} />
                  </div>

                  <div className="mt-8 flex flex-col gap-4">
                    <button onClick={confirmPublish} className="w-full py-5 bg-blue-600 text-white font-black text-xl rounded-2xl transition-all shadow-2xl shadow-blue-600/30 active:scale-[0.98]">Confirm & Publish</button>
                    <button onClick={() => setShowPreviewModal(false)} className="w-full py-4 font-bold text-sm opacity-40 hover:opacity-100 transition-all">Back to Editor</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
