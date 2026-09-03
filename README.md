# Newsletter — The Digital Canvas

<p align="center">
  <strong>A modern full-stack publishing platform for discovering, reading, bookmarking, and managing digital content.</strong>
</p>

<p align="center">
  <a href="https://greyengravings.github.io/Newsletter">Live Demo</a>
  ·
  <a href="https://github.com/Greyengravings/Newsletter/issues">Report a Bug</a>
  ·
  <a href="https://github.com/Greyengravings/Newsletter/issues">Request a Feature</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## Overview

**Newsletter** is a full-stack blog and digital publishing application built around a clean, responsive reading experience and a lightweight content-management workflow.

The platform combines a **React + Vite frontend** with a **Node.js + Express REST API** and **MongoDB** persistence. Readers can explore posts, search and filter content, open individual articles, track views, and bookmark posts. Authenticated users receive profile functionality, while administrators can manage posts, users, memberships, and their own profile.

The frontend is configured for deployment to **GitHub Pages**, while the backend can be run locally or deployed separately and exposed through an environment-configured API URL.

> **Live application:** https://greyengravings.github.io/Newsletter

---

## ✨ Features

### 📖 Content Discovery

- Responsive home page with a featured hero section
- Latest posts feed
- Individual article/post pages
- Category-based discovery
- Search posts by title
- Sort by:
  - Newest
  - Oldest
  - Most viewed
  - Category
- "Load more" / explore-all content flow
- View-count tracking

### 🔖 Personal Reading

- User authentication
- Bookmark and unbookmark posts
- Dedicated bookmarked-post filtering
- User profile page
- Persistent user-related content through MongoDB

### 🛠️ Admin Dashboard

- Admin registration and login
- Create blog posts
- Update and delete blog posts
- Preview content before publishing
- Admin profile management
- Profile picture upload support
- User management
- Create users from the dashboard
- Assign user/admin roles
- Configure membership duration
- Update user memberships
- Delete users

### 🎨 UI / UX

- Responsive React interface
- Light and dark themes
- Animated UI interactions
- Framer Motion animations
- Loading and empty-state components
- Responsive navigation and routing
- Scroll-to-top navigation behavior
- Reduced-animation / reduced-blur preferences
- Styled content presentation with Tailwind CSS and HeroUI

### 🔐 Authentication & Backend

- JWT-based user authentication
- Password hashing with bcrypt
- Protected user profile endpoint
- CORS configuration
- MongoDB/Mongoose data models
- Image upload handling through Multer
- Configurable frontend/backend API URL
- RESTful Express routes

---

## 🧱 Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                       │
│                                                         │
│  React 19 + Vite + Tailwind CSS + HeroUI                │
│  React Router + Redux Toolkit + Axios + Framer Motion   │
│                                                         │
│  Pages → Components → Redux State → API Client          │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / REST
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Express Backend                      │
│                                                         │
│  Node.js + Express 5 + JWT + bcrypt + Multer            │
│                                                         │
│  /api/blogs    /api/user    /api/admin                  │
└──────────────────────────┬──────────────────────────────┘
                           │ Mongoose
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     MongoDB Atlas                       │
│                                                         │
│  Users · Admin Users · Blogs                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🧰 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 | Component-based UI |
| Build Tool | Vite 7 | Development server and production builds |
| Styling | Tailwind CSS 4 | Utility-first responsive styling |
| UI | HeroUI | Reusable interface components |
| Routing | React Router 7 | Client-side navigation |
| State | Redux Toolkit | Application and post/auth state |
| HTTP | Axios | API communication |
| Animation | Framer Motion | UI motion and transitions |
| Backend | Node.js + Express 5 | REST API |
| Database | MongoDB + Mongoose | Persistent application data |
| Authentication | JWT + bcrypt | Token authentication and password hashing |
| Uploads | Multer | Image upload handling |
| Deployment | GitHub Pages | Frontend hosting |

The dependency configuration in the repository includes React, React Router, Redux Toolkit, Axios, Framer Motion, Tailwind CSS, HeroUI, Express, Mongoose, JWT, bcrypt, Multer, and related tooling. 

---

## 📁 Project Structure

```text
Newsletter/
│
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── AdminUser.js
│   │   ├── Blog.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── admin.js
│   │   ├── blog.js
│   │   └── user.js
│   │
│   ├── index.js
│   ├── seedBlogs.js
│   ├── updateImages.js
│   ├── updateStats.js
│   └── package.json
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── features/
│   │   ├── auth/
│   │   └── posts/
│   ├── hooks/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── PostPage.jsx
│   │   ├── ExplorePage.jsx
│   │   ├── CategoriesPage.jsx
│   │   ├── SubscribePage.jsx
│   │   ├── CombinedLoginPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── UserProfilePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── DataPrivacyPage.jsx
│   │   └── TermsOfUsePage.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── store.js
│
├── docs/
├── dist/
├── index.html
├── vite.config.js
├── package.json
├── TODO.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- **Node.js** 18+ recommended
- **npm**
- A **MongoDB Atlas** database or compatible MongoDB instance
- Git

Check your installed versions:

```bash
node --version
npm --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/Greyengravings/Newsletter.git
cd Newsletter
```

---

## 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

---

## 3. Configure the Backend

Move into the backend:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
FRONTEND_URL=http://localhost:5173
```

### Environment variables

| Variable | Required | Description |
|---|---:|---|
| `PORT` | No | Express server port. Defaults to `5001`. |
| `MONGODB_URI` | Yes | MongoDB connection string. |
| `JWT_SECRET` | Yes | Secret used to sign and verify JWTs. |
| `FRONTEND_URL` | Recommended | Allowed frontend origin for CORS. |

> **Security:** Never commit `.env`, database credentials, JWT secrets, or other private credentials to Git. Production deployments should always provide secrets through the hosting platform's environment-variable system.

---

## 4. Start the Backend

Development mode:

```bash
npm run dev
```

Or production-style start:

```bash
npm start
```

The backend defaults to:

```text
http://localhost:5001
```

API base URL:

```text
http://localhost:5001/api
```

---

## 5. Configure the Frontend API

From the repository root, create `.env` if needed:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

The frontend falls back to `http://localhost:5001/api` when the variable is not supplied.

---

## 6. Start the Frontend

From the project root:

```bash
npm run dev
```

Vite will provide a local development URL, normally:

```text
http://localhost:5173
```

Open it in your browser.

---

## 🧪 Available Scripts

### Frontend

```bash
npm run dev       # Start Vite development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run deploy    # Deploy dist/ to GitHub Pages
```

### Backend

```bash
npm run dev       # Start backend with Nodemon
npm start         # Start backend with Node
```

---

## 🔌 API Reference

The Express server mounts three primary route groups:

```text
/api/blogs
/api/user
/api/admin
```

### Blog API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/blogs` | Fetch all blog posts |
| `GET` | `/api/blogs/:id` | Fetch a single post |
| `POST` | `/api/blogs` | Create a blog post |
| `PUT` | `/api/blogs/:id` | Update a blog post |
| `DELETE` | `/api/blogs/:id` | Delete a blog post |
| `POST` | `/api/blogs/:id/bookmark` | Bookmark a post |
| `DELETE` | `/api/blogs/:id/bookmark` | Remove a bookmark |
| `GET` | `/api/blogs/user/:userId/bookmarks` | Get a user's bookmarks |
| `POST` | `/api/blogs/:id/view` | Increment post views |

### User API

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/user/register` | Register a user |
| `POST` | `/api/user/login` | Authenticate a user |
| `GET` | `/api/user/profile` | Get authenticated user profile |
| `POST` | `/api/user/logout` | Logout response endpoint |

### Admin API

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/admin/register` | Register an admin |
| `POST` | `/api/admin/login` | Authenticate an admin |
| `GET` | `/api/admin/profile/:email` | Get admin profile |
| `PUT` | `/api/admin/profile/:email` | Update admin profile |
| `GET` | `/api/admin/users` | List users |
| `POST` | `/api/admin/users` | Create a user |
| `PUT` | `/api/admin/users/:userId/membership` | Update membership |
| `DELETE` | `/api/admin/users/:userId` | Delete a user |
| `POST` | `/api/admin/logout` | Logout response endpoint |

> The API routes above are derived from the current Express route implementation. Authentication/authorization should be reviewed before exposing administrative endpoints in a production environment.

---

## 🗃️ Data Models

### Blog

A blog document currently contains:

```text
title
excerpt
imageUrl
createdAt
author
category
content
views
likes
bookmarkedBy[]
```

### User

A user document contains:

```text
username
email
password
displayName
profilePicture
bookmarkedPosts[]
role
membershipEndDate
createdAt
```

### Admin

Administrative accounts are maintained separately through the admin-user model and admin routes.

---

## 🔐 Authentication Flow

```text
User
 │
 ├── Register ────────► POST /api/user/register
 │
 ├── Login ───────────► POST /api/user/login
 │                         │
 │                         └── JWT token
 │
 ├── Store token
 │
 └── Protected request
          │
          ▼
     Authorization:
     Bearer <token>
          │
          ▼
   JWT verification
          │
          ▼
     User profile
```

User passwords are hashed before persistence, and successful user login returns a JWT with a 24-hour expiry.

---

## 📚 Content Flow

```text
MongoDB
   │
   ▼
Express /api/blogs
   │
   ▼
Axios
   │
   ▼
Redux Toolkit
   │
   ▼
React Components
   │
   ├── Home
   ├── Explore
   ├── Categories
   └── Post Details
```

The posts Redux slice manages fetching posts, fetching individual posts, bookmarks, view counts, filtering, and local post state.

---

## 🌗 Theme System

The application includes a shared `ThemeContext` that controls:

- Light mode
- Dark mode
- Reduced blur
- Reduced animations
- Theme-specific background assets

The router also uses the `/Newsletter` basename in production so the React application can run correctly from its GitHub Pages project path.

---

## ☁️ Deployment

### Frontend — GitHub Pages

The repository is configured with:

```text
homepage: https://Greyengravings.github.io/Newsletter
```

Build the application:

```bash
npm run build
```

Deploy:

```bash
npm run deploy
```

The production router uses:

```text
/Newsletter
```

as its basename.

### Backend

The backend is independently deployable because the frontend reads its API base URL from:

```env
VITE_API_BASE_URL
```

For a hosted backend, set the frontend environment variable to your production API:

```env
VITE_API_BASE_URL=https://your-api-domain.example/api
```

Also configure the backend's:

```env
FRONTEND_URL=https://greyengravings.github.io
```

or the exact frontend origin required by your deployment.

---

## 🛡️ Production Security Checklist

Before deploying publicly, verify the following:

- [ ] No MongoDB credentials are committed to source control
- [ ] `MONGODB_URI` is provided only through environment variables
- [ ] `JWT_SECRET` is a strong, private secret
- [ ] Admin registration does not rely on a publicly exposed static secret code
- [ ] Admin endpoints have proper authentication and authorization middleware
- [ ] CORS allows only trusted production origins
- [ ] Upload directories are handled securely
- [ ] Uploaded filenames are sanitized/controlled
- [ ] Rate limiting is enabled for authentication endpoints
- [ ] Request validation is enabled
- [ ] Production errors do not expose sensitive implementation details
- [ ] HTTPS is enabled for frontend and backend
- [ ] MongoDB network access is restricted appropriately

---

## 🧭 Roadmap

Potential next steps for the project:

- [ ] Complete end-to-end production testing
- [ ] Add robust admin authorization middleware
- [ ] Add server-side request validation
- [ ] Add rate limiting
- [ ] Add pagination for large post collections
- [ ] Add post editing workflow improvements
- [ ] Add richer analytics
- [ ] Add automated tests
- [ ] Add CI/CD with GitHub Actions
- [ ] Improve API documentation with OpenAPI/Swagger
- [ ] Add image optimization and cloud storage
- [ ] Add newsletter/email delivery functionality
- [ ] Add password reset and account recovery
- [ ] Add richer role/permission management

---

## 🧑‍💻 Development Notes

The codebase follows a feature-oriented React structure:

```text
src/
├── components/    # Reusable UI
├── features/      # Redux slices and feature logic
├── pages/         # Route-level screens
├── hooks/         # Reusable React hooks
├── context/       # Shared React contexts
└── store.js       # Redux store
```

This separation makes it easier to extend the platform without putting all application logic inside individual pages.

---

## 🤝 Contributing

Contributions are welcome.

### Recommended workflow

```bash
# Fork the repository

git clone https://github.com/Greyengravings/Newsletter.git
cd Newsletter

# Create a feature branch
git checkout -b feature/your-feature

# Install dependencies
npm install

# Make your changes

# Run linting
npm run lint

# Build before submitting
npm run build

# Commit
git add .
git commit -m "feat: describe your change"

# Push
git push origin feature/your-feature
```

Then open a Pull Request with:

- What changed
- Why it changed
- Screenshots for UI changes
- Testing performed
- Any known limitations

---

## 🐛 Issues & Feature Requests

Found a bug or have an idea?

Open an issue:

**https://github.com/Greyengravings/Newsletter/issues**

Please include enough context to reproduce the problem, especially for API, authentication, or deployment issues.

---

## 📄 License

No explicit open-source license is currently declared in the repository metadata.

If this project is intended for public reuse, consider adding a license such as MIT before encouraging external contributions or redistribution.

---

## 👨‍💻 Author

**Greyengravings**

Built as a full-stack digital publishing project combining a modern React frontend with a Node.js/Express API and MongoDB persistence.

---

<p align="center">
  <strong>Newsletter · The Digital Canvas</strong>
  <br />
  Discover. Read. Bookmark. Publish.
</p>
