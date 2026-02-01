# Authentication & Authorization System

## Overview
A complete authentication and role-based authorization system has been added to the Kiskadee application.

## Features Implemented

### 1. Authentication System
- **Login Page** (`/login`)
  - Email and password authentication
  - Demo accounts for testing
  - Error handling and validation
  
- **Register Page** (`/register`)
  - New user account creation
  - Password validation
  - Duplicate email checking
  - Automatic login after registration

- **Auth Context** (`AuthContext.tsx`)
  - Global authentication state management
  - User session persistence in localStorage
  - Login, register, and logout functions
  - Topic admin permission checking

### 2. User Roles
Two main user roles:
- **User**: Regular community members
  - Can post on community topics
  - Cannot post on restricted topics
  
- **Admin**: Topic-specific administrators
  - Can post on any topic including restricted ones
  - Can be admin of specific topics (defined in `topicAdminFor` array)

### 3. Permission System
- **Community Topics**: Everyone can post (category = 'community')
- **Restricted Topics**: Only topic admins can post
- Dynamic permission checking in CreateThread page
- Visual indicators in topic selection showing post eligibility

### 4. Demo Accounts
For testing purposes, two demo accounts are available:

**Admin Account**:
- Email: `admin@carnival.tt`
- Password: `admin123`
- Admin of: Carnival & Mas (t1), Steelpan/Music (t2)

**Regular User**:
- Email: `kyla@example.tt`
- Password: `user123`
- Admin of: Community & Local Issues (t6)

Another user:
- Email: `andre@example.tt`
- Password: `user123`
- Admin of: Community & Local Issues (t6)

### 5. Updated Components

#### Layout (`layout.tsx`)
- Login/Logout buttons in navbar
- User profile display when authenticated
- Conditional navigation for authenticated vs unauthenticated users
- Mobile menu support for auth options

#### App (`App.tsx`)
- Added `AuthProvider` wrapper
- New routes for `/login` and `/register`

#### CreateThread (`CreateThread.tsx`)
- Authentication requirement check
- Permission validation for selected topic
- Visual warnings when user lacks permission
- Disabled submit button for restricted topics
- Topic selection shows (Community) or (Admin Only) labels

## File Structure
```
src/app/
├── state/
│   └── AuthContext.tsx (NEW - Authentication state)
├── pages/
│   ├── Login.tsx (NEW - Login page)
│   ├── Register.tsx (NEW - Registration page)
│   └── CreateThread.tsx (UPDATED - Permission checks)
├── layout.tsx (UPDATED - Auth UI)
└── App.tsx (UPDATED - Routes & provider)
```

## Usage

### Login/Register
1. Click "Sign In" or "Sign Up" in the navbar
2. Create new account or use demo credentials
3. After login, access to user dashboard appears

### Creating Posts
1. Click "New Post" (only visible when logged in)
2. Select a topic
3. For restricted topics, only admins can post
4. For community topics, all authenticated users can post
5. Submit to create the thread

### Logout
1. Click user avatar/profile in navbar
2. Select "Logout" to end the session

## Security Notes
⚠️ **This is a prototype implementation**:
- Passwords are stored in localStorage (never do this in production)
- No real backend authentication
- Use proper backend authentication, hashing, and JWT tokens in production
- Add HTTPS and secure cookie handling in production
- Implement proper password reset mechanisms
- Add email verification for new accounts

## Future Enhancements
- Email verification for new registrations
- Password reset functionality
- User profile pages
- Admin panel for topic administration
- User ban/moderation features
- Activity history and notifications
- OAuth integration (Google, GitHub, etc.)
