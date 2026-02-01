import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  topicAdminFor: string[]; // Topic IDs where user is an admin
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isTopicAdmin: (topicId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'tt-culture-board:auth:v1';
const USERS_STORAGE_KEY = 'tt-culture-board:users:v1';

// Mock user database
const DEFAULT_USERS: AuthUser[] = [
  {
    id: 'admin_1',
    name: 'Ministry Desk',
    email: 'admin@carnival.tt',
    password: 'admin123', // Mock - in real app, never store plain passwords
    role: 'admin',
    avatar: 'https://picsum.photos/seed/tt-avatar-admin/200/200',
    topicAdminFor: ['t1', 't2'], // Admin of Carnival and Steelpan topics
  },
  {
    id: 'user_1',
    name: 'Kyla',
    email: 'kyla@example.tt',
    password: 'user123',
    role: 'user',
    avatar: 'https://picsum.photos/seed/tt-avatar-1/200/200',
    topicAdminFor: [],
  },
  {
    id: 'user_2',
    name: 'Andre',
    email: 'andre@example.tt',
    password: 'user123',
    role: 'user',
    avatar: 'https://picsum.photos/seed/tt-avatar-2/200/200',
    topicAdminFor: ['t6'], // Admin of Community topic
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<Array<AuthUser & { password: string }>>([]);

  // Load users and current session on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const parsedUsers = savedUsers ? JSON.parse(savedUsers) : DEFAULT_USERS;
    setUsers(parsedUsers);

    const savedAuth = localStorage.getItem(STORAGE_KEY);
    if (savedAuth) {
      const userData = JSON.parse(savedAuth);
      const user = parsedUsers.find((u: any) => u.id === userData.id);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: user.id }));
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email already exists
        if (users.some((u) => u.email === email)) {
          reject(new Error('Email already registered'));
          return;
        }

        // Create new user
        const newUser: AuthUser & { password: string } = {
          id: `user_${Date.now()}`,
          name,
          email,
          password,
          role: 'user',
          avatar: `https://picsum.photos/seed/tt-avatar-${Date.now()}/200/200`,
          topicAdminFor: [],
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

        const { password: _, ...userWithoutPassword } = newUser;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: newUser.id }));

        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isTopicAdmin = (topicId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.role === 'admin' || currentUser.topicAdminFor.includes(topicId);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        isTopicAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
