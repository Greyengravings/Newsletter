# TODO: Admin Dashboard Category Dropdown

## Completed Tasks
- [x] Define a list of categories (Technology, Education, Lifestyle, Travel, Food, Health, Business) in `src/pages/AdminDashboard.jsx`
- [x] Replace the category text input with a dropdown select element in the "Add New Post" form

## Next Steps
- Test the admin dashboard to ensure the dropdown works correctly
- Optionally, run the development server to verify the changes

## Idle Timeout Feature
- [x] Add logout API endpoint in backend/routes/admin.js
- [x] Create useIdleTimeout hook in src/hooks/useIdleTimeout.jsx
- [x] Integrate hook in src/App.jsx for automatic logout after 15 minutes of inactivity
- [x] Test login and verify automatic logout on inactivity

## Authentication and User Roles with JWT
- [x] Implement JWT authentication for users
- [x] Add role field to User model (default 'user', 'admin' with secret code "D15C")
- [x] Create user registration and login routes with JWT
- [x] Update frontend authSlice for JWT tokens
- [x] Create user login/register pages
- [x] Add user management to admin dashboard (add/delete users, set membership days)
- [x] Fix theme persistence in localStorage

## User Management Features
- [x] Add membershipEndDate field to User model
- [x] Create admin routes for user CRUD operations
- [x] Add user management UI in admin dashboard
- [x] Allow admins to set membership days for users
