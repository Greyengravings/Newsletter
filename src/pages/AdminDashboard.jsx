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
  const [postToDelete, setPostToDelete] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState('');

  // User management state
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userModalMode, setUserModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
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
        const response = await axios.get(`http://localhost:5001/api/admin/profile/${encodeURIComponent(username)}`);
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
      const response = await axios.get('http://localhost:5001/api/admin/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5001/api/admin/users', newUser);
      setShowUserModal(false);
      setNewUser({ username: '', email: '', password: '', role: 'user', membershipDays: 30 });
      fetchUsers();
      alert('User added successfully!');
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Error adding user: ' + error.response?.data?.message || error.message);
    }
  };

  const handleUpdateMembership = async (userId, membershipDays) => {
    try {
      await axios.put(`http://localhost:5001/api/admin/users/${userId}/membership`, { membershipDays });
      fetchUsers();
      alert('Membership updated successfully!');
    } catch (error) {
      console.error('Failed to update membership:', error);
      alert('Error updating membership: ' + error.response?.data?.message || error.message);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        await axios.delete(`http://localhost:5001/api/admin/users/${userId}`);
        fetchUsers();
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Error deleting user: ' + error.response?.data?.message || error.message);
      }
    }
  };

  const openAddUserModal = () => {
    setUserModalMode('add');
    setNewUser({ username: '', email: '', password: '', role: 'user', membershipDays: 30 });
    setShowUserModal(true);
  };

  const handleUserInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add post to backend and update redux state
  const handleAdd = async () => {
    if (!newPost.title || !newPost.author || !newPost.content) return;

    try {
      const response = await axios.post('http://localhost:5001/api/blogs', {
        ...newPost,
        createdAt: new Date().toISOString(),
      });

      dispatch(addPost(response.data)); // Add the post returned from backend to redux

      // Reset form
      setNewPost({ title: '', excerpt: '', author: '', content: '', imageUrl: '', category: '' });
    } catch (error) {
      console.error('Failed to add post:', error);
      alert('Error adding post. See console for details.');
    }
  };

  // Delete post from backend and update redux state
  const handleDelete = (id, title) => {
    setPostToDelete({ id, title });
    setConfirmTitle('');
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (confirmTitle === postToDelete.title) {
      try {
        await axios.delete(`http://localhost:5001/api/blogs/${postToDelete.id}`);
        dispatch(deletePost(postToDelete.id)); // Remove from redux
        setShowConfirmModal(false);
        setPostToDelete(null);
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Error deleting post. See console for details.');
      }
    } else {
      alert('The entered heading does not match. Post not deleted.');
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setPostToDelete(null);
    setConfirmTitle('');
  };

  // Handle profile form changes
  const handleProfileChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditProfile({ ...editProfile, profilePictureFile: file });
  };

  // Update profile
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('displayName', editProfile.displayName);

      // If a file is selected, append it; otherwise, append the URL
      if (editProfile.profilePictureFile) {
        formData.append('profilePictureFile', editProfile.profilePictureFile);
      } else {
        formData.append('profilePicture', editProfile.profilePicture);
      }

      const response = await axios.put(
        `http://localhost:5001/api/admin/profile/${encodeURIComponent(username)}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && response.data.profile) {
        setProfile({
          displayName: response.data.profile.displayName,
          profilePicture: response.data.profile.profilePicture,
        });
        // Reset file input
        setEditProfile({ ...editProfile, profilePictureFile: null });
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Error updating profile. See console for details.');
    }
  };

  return (
    <div className={`max-w-6xl mx-auto p-6 transition-all duration-500 ${
      theme === 'dark'
        ? 'bg-gray-900 text-white'
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Admin Dashboard</h2>
        <button
          onClick={() => {
            dispatch(logout());
            window.location.href = '/';
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-6">
        {/* Left Column - Edit Profile Section */}
        <div className="flex-1">
          <div className={`p-4 border rounded-xl transition-all duration-500 h-full ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gray-50 border-gray-300'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Edit Profile</h3>
            <div className="mb-4">
              <label className={`block mb-1 font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`} htmlFor="displayName">
                Display Name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                value={editProfile.displayName}
                onChange={handleProfileChange}
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div className="mb-4">
              <label className={`block mb-2 font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Profile Picture
              </label>

              {/* URL Option */}
              <div className="mb-3">
                <label className={`block mb-1 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`} htmlFor="profilePicture">
                  Option 1: Enter Image URL
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="text"
                  value={editProfile.profilePicture}
                  onChange={handleProfileChange}
                  className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  disabled={editProfile.profilePictureFile !== null}
                />
              </div>

              {/* File Upload Option */}
              <div className="mb-3">
                <label className={`block mb-1 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`} htmlFor="profilePictureFile">
                  Option 2: Upload Image File
                </label>
                <input
                  id="profilePictureFile"
                  name="profilePictureFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  disabled={editProfile.profilePicture.trim() !== ''}
                />
                {editProfile.profilePictureFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Selected file: {editProfile.profilePictureFile.name}
                  </p>
                )}
              </div>
            </div>
            {(editProfile.profilePicture || editProfile.profilePictureFile) && (
              <div className="mb-4">
                <p className={`text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Preview:</p>
                <img
                  src={editProfile.profilePictureFile
                    ? URL.createObjectURL(editProfile.profilePictureFile)
                    : editProfile.profilePicture
                  }
                  alt="Profile Preview"
                  className={`w-24 h-24 object-cover rounded-full border ${
                    theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                  }`}
                />
              </div>
            )}
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Right Column - Add New Post Section */}
        <div className="flex-1">
          {/* Add New Post Form */}
          <div className={`p-4 border rounded-xl transition-all duration-500 h-full ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-300'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Add New Post</h3>
            <div className="space-y-2">
              <input
                name="title"
                value={newPost.title}
                onChange={handleChange}
                placeholder="Title"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <textarea
                name="excerpt"
                value={newPost.excerpt}
                onChange={handleChange}
                placeholder="Preview Description (short description for post cards)"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                rows="2"
              />
              <input
                name="author"
                value={newPost.author}
                onChange={handleChange}
                placeholder="Author"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <input
                name="imageUrl"
                value={newPost.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <select
                name="category"
                value={newPost.category}
                onChange={handleChange}
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleChange}
                placeholder="Content (HTML allowed)"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                rows="4"
              />
              <button
                onClick={handleAdd}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Add Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width - Existing Blogs Section */}
      <div className={`mt-6 p-4 border rounded-xl transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-300'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Existing Blogs</h3>
        <div className="space-y-2">
          {posts.length === 0 ? (
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              No blogs yet.
            </p>
          ) : (
            posts.map((post) => (
                  <div
                    key={post._id || post.id}
                    className={`p-3 border rounded-lg flex justify-between items-center transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  >
                <span className="font-bold">{post.title}</span>
                <button
                  onClick={() => handleDelete(post._id || post.id, post.title)}
                  className="text-red-600 hover:underline transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Full Width - User Management Section */}
      <div className={`mt-6 p-4 border rounded-xl transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-300'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>User Management</h3>
          <button
            onClick={openAddUserModal}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
          >
            Add User
          </button>
        </div>
        <div className="space-y-2">
          {users.length === 0 ? (
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              No users yet.
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className={`p-3 border rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">{user.username}</span> ({user.email}) - Role: {user.role}
                    <br />
                    <span className="text-sm text-gray-500">
                      Membership ends: {new Date(user.membershipEndDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Days"
                      className={`w-20 p-1 border rounded text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      onChange={(e) => {
                        const days = parseInt(e.target.value);
                        if (days > 0) {
                          handleUpdateMembership(user._id, days);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleDeleteUser(user._id, user.username)}
                      className="text-red-600 hover:underline transition-colors duration-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-xl shadow-lg max-w-md w-full mx-4 ${
            theme === 'dark'
              ? 'bg-gray-800 text-white'
              : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">
              To delete the post "{postToDelete.title}", please enter the exact heading below:
            </p>
            <input
              type="text"
              value={confirmTitle}
              onChange={(e) => setConfirmTitle(e.target.value)}
              placeholder="Enter exact heading"
              className={`w-full p-2 border rounded mb-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-xl shadow-lg max-w-md w-full mx-4 ${
            theme === 'dark'
              ? 'bg-gray-800 text-white'
              : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4">
              {userModalMode === 'add' ? 'Add New User' : 'Edit User'}
            </h3>
            <div className="space-y-4">
              <input
                name="username"
                value={newUser.username}
                onChange={handleUserInputChange}
                placeholder="Username"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <input
                name="email"
                value={newUser.email}
                onChange={handleUserInputChange}
                placeholder="Email"
                type="email"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <input
                name="password"
                value={newUser.password}
                onChange={handleUserInputChange}
                placeholder="Password"
                type="password"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <select
                name="role"
                value={newUser.role}
                onChange={handleUserInputChange}
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <input
                name="membershipDays"
                value={newUser.membershipDays}
                onChange={handleUserInputChange}
                placeholder="Membership Days"
                type="number"
                className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
              >
                {userModalMode === 'add' ? 'Add User' : 'Update User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
