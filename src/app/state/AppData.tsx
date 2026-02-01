import React from 'react';
import type { Topic, Thread, User, Event, Recipe, Comment } from '@/app/data/mockData';
import { topics as seedTopics, threads as seedThreads, comments as seedComments, users as seedUsers, events as seedEvents, recipes as seedRecipes } from '@/app/data/mockData';

type AppDataState = {
  users: User[];
  topics: Topic[];
  threads: Thread[];
  events: Event[];
  recipes: Recipe[];
  comments: Comment[];
  addTopic: (input: { title: string; description: string; category: Topic['category']; image?: string }) => Topic;
  addThread: (input: { topicId: string; title: string; content: string; tags: string[]; authorId?: string; isOfficial?: boolean }) => Thread;
  addComment: (input: { threadId: string; content: string; authorId?: string }) => Comment;
  toggleThreadLike: (threadId: string) => void;
  isThreadLiked: (threadId: string) => boolean;
};

const STORAGE_KEY = 'tt-culture-board:v2';
const LIKES_KEY = 'tt-culture-board:likes:v1';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

const AppDataContext = React.createContext<AppDataState | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [topics, setTopics] = React.useState<Topic[]>(seedTopics);
  const [threads, setThreads] = React.useState<Thread[]>(seedThreads);
  const [comments, setComments] = React.useState<Comment[]>(seedComments);
  const [likedThreadIds, setLikedThreadIds] = React.useState<Set<string>>(() => new Set());

  // users/events/recipes are static in the prototype
  const users = seedUsers;
  const events = seedEvents;
  const recipes = seedRecipes;

  // Load persisted state (topics + threads only)
  React.useEffect(() => {
    const saved = safeParse<{ topics: Topic[]; threads: Thread[]; comments: Comment[] }>(localStorage.getItem(STORAGE_KEY));
    if (saved?.topics?.length) setTopics(saved.topics);
    if (saved?.threads?.length) setThreads(saved.threads);
    if (saved?.comments?.length) setComments(saved.comments);

    const savedLikes = safeParse<{ liked: string[] }>(localStorage.getItem(LIKES_KEY));
    if (savedLikes?.liked?.length) setLikedThreadIds(new Set(savedLikes.liked));
  }, []);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ topics, threads, comments }));
  }, [topics, threads, comments]);

  React.useEffect(() => {
    localStorage.setItem(LIKES_KEY, JSON.stringify({ liked: Array.from(likedThreadIds) }));
  }, [likedThreadIds]);

  const addTopic: AppDataState['addTopic'] = (input) => {
    const title = input.title.trim();
    const description = input.description.trim();
    if (title.length < 3) throw new Error('Category title must be at least 3 characters.');

    const exists = topics.some(t => t.title.toLowerCase() === title.toLowerCase());
    if (exists) throw new Error('That category already exists.');

    const created: Topic = {
      id: uid('t'),
      title,
      description: description || 'A community category in Trinidad & Tobago.',
      category: input.category,
      featured: false,
      image: input.image || `https://picsum.photos/seed/${encodeURIComponent(title)}/1200/800`,
    };
    setTopics(prev => [...prev, created]);
    return created;
  };

  const addThread: AppDataState['addThread'] = (input) => {
    const title = input.title.trim();
    const content = input.content.trim();
    if (title.length < 3) throw new Error('Post title must be at least 3 characters.');
    if (!topics.some(t => t.id === input.topicId)) throw new Error('Invalid category.');

    const created: Thread = {
      id: uid('th'),
      topicId: input.topicId,
      title,
      content,
      authorId: input.authorId || users[0]?.id || 'u1',
      createdAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
      likes: 0,
      comments: 0,
      isOfficial: input.isOfficial ?? false,
      tags: input.tags.filter(Boolean),
    };

    setThreads(prev => [created, ...prev]);
    return created;
  };

  const addComment: AppDataState['addComment'] = (input) => {
    const contentText = input.content.trim();
    if (contentText.length < 1) throw new Error('Comment cannot be empty.');
    const threadExists = threads.some(t => t.id === input.threadId);
    if (!threadExists) throw new Error('Thread not found.');

    const created: Comment = {
      id: uid('c'),
      threadId: input.threadId,
      authorId: input.authorId || users[0]?.id || 'u1',
      content: contentText,
      createdAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
    };

    setComments(prev => [...prev, created]);
    setThreads(prev => prev.map(t => (t.id === input.threadId ? { ...t, comments: t.comments + 1 } : t)));
    return created;
  };

  const toggleThreadLike: AppDataState['toggleThreadLike'] = (threadId) => {
    setLikedThreadIds(prev => {
      const next = new Set(prev);
      const already = next.has(threadId);
      if (already) next.delete(threadId);
      else next.add(threadId);

      // Update like count in threads in the same tick.
      setThreads(tprev =>
        tprev.map(t => {
          if (t.id !== threadId) return t;
          const delta = already ? -1 : 1;
          return { ...t, likes: Math.max(0, t.likes + delta) };
        })
      );

      return next;
    });
  };

  const isThreadLiked: AppDataState['isThreadLiked'] = (threadId) => likedThreadIds.has(threadId);

  const value: AppDataState = {
    users,
    topics,
    threads,
    events,
    recipes,
    addTopic,
    addThread,
    comments,
    addComment,
    toggleThreadLike,
    isThreadLiked,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = React.useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
