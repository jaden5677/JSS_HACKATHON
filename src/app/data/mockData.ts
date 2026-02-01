import { format, addDays } from 'date-fns';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'user' | 'moderator' | 'official';
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'festival' | 'culture' | 'music' | 'food' | 'community';
  featured: boolean;
}

export interface Thread {
  id: string;
  topicId: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  likes: number;
  comments: number;
  isOfficial: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  createdAt: string;
}


export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  organizer: string;
  type: 'festival' | 'party' | 'cultural' | 'workshop' | 'community';
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  likes: number;
  category: 'streetfood' | 'homecooking' | 'dessert' | 'drink';
}

// Local-first images - import from Images folder
import CarnivalImg from '@/app/Images/Carnival.jpg';
import SteelpanImg from '@/app/Images/steelpan.jpeg';
import DivaliImg from '@/app/Images/Divali.webp';
import PelauImg from '@/app/Images/Pelau.jpg';
import TobagoImg from '@/app/Images/Tobago.jpg';

const img = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/800`;

/**
 * Seed data is intentionally Trinidad & Tobago ONLY.
 * No broader "Trinidad & Tobago" framing.
 */
export const users: User[] = [
  { id: 'u1', name: 'Kyla', avatar: img('tt-avatar-1'), role: 'moderator' },
  { id: 'u2', name: 'Andre', avatar: img('tt-avatar-2'), role: 'user' },
  { id: 'u3', name: 'Ministry Desk', avatar: img('tt-avatar-3'), role: 'official' },
];

export const topics: Topic[] = [
  {
    id: 't1',
    title: 'Carnival & Mas',
    description: 'Costumes, bands, routes, traditions, and the meaning behind mas.',
    image: CarnivalImg,
    category: 'festival',
    featured: true,
  },
  {
    id: 't2',
    title: 'Steelpan, Calypso & Soca',
    description: 'Pan yard vibes, classic calypso, modern soca, and everything in between.',
    image: SteelpanImg,
    category: 'music',
    featured: true,
  },
  {
    id: 't3',
    title: 'Food & Lime',
    description: 'Doubles, roti, pelau, bake & shark—drop your best spots and recipes.',
    image: PelauImg,
    category: 'food',
    featured: true,
  },
  {
    id: 't4',
    title: 'Divali, Eid & Emancipation',
    description: 'Cultural events across T&T—history, respect, and how we celebrate.',
    image: DivaliImg,
    category: 'culture',
    featured: false,
  },
  {
    id: 't5',
    title: 'Tobago',
    description: 'Heritage Festival, villages, beaches, food, and community life in Tobago.',
    image: TobagoImg,
    category: 'community',
    featured: true,
  },
  {
    id: 't6',
    title: 'Community & Local Issues',
    description: 'Neighbourhood updates, volunteering, safety tips, and civic ideas.',
    image: img('trinidad-community'),
    category: 'community',
    featured: false,
  },
];

export const threads: Thread[] = [
  {
    id: 'th1',
    topicId: 't1',
    title: 'What is your favourite traditional mas character and why?',
    content:
      'Midnight Robber, Dame Lorraine, Pierrot Grenade… which one tells the story best for you? Share photos, history, or memories.',
    authorId: 'u2',
    createdAt: format(addDays(new Date(), -2), 'MMM d, yyyy'),
    likes: 41,
    comments: 18,
    isOfficial: false,
    tags: ['mas', 'tradition', 'history'],
  },
  {
    id: 'th2',
    topicId: 't2',
    title: 'Pan yard etiquette for newcomers',
    content:
      'If someone is visiting a pan yard for the first time—what should they know? (Respect, timing, recording, vibes.)',
    authorId: 'u1',
    createdAt: format(addDays(new Date(), -1), 'MMM d, yyyy'),
    likes: 29,
    comments: 12,
    isOfficial: false,
    tags: ['steelpan', 'culture'],
  },
  {
    id: 'th3',
    topicId: 't6',
    title: '[Official] Community clean-up toolkit (T&T)',
    content:
      'Here is a simple checklist for organising a community clean-up: permissions, bags/gloves, pickup coordination, and photo documentation for accountability.',
    authorId: 'u3',
    createdAt: format(addDays(new Date(), -5), 'MMM d, yyyy'),
    likes: 88,
    comments: 34,
    isOfficial: true,
    tags: ['community', 'clean-up', 'official'],
  },
];

export const comments: Comment[] = [
  // Seed comments (Trinidad & Tobago only)
  {
    id: 'c1',
    threadId: 'th1',
    authorId: 'u2',
    content: 'Real talk — keeping traditions alive starts with teaching the younger ones the meaning behind it.',
    createdAt: format(new Date(), 'MMM d, yyyy'),
  },
];

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Pan on the Avenue (Community Showcase)',
    description: 'A family-friendly evening of steelpan performances and food vendors.',
    date: format(addDays(new Date(), 7), 'MMM d, yyyy'),
    location: 'Port of Spain, Trinidad',
    image: img('pan-showcase-tt'),
    organizer: 'Community Organisers',
    type: 'cultural',
  },
  {
    id: 'e2',
    title: 'Tobago Heritage Village Night',
    description: 'Storytelling, dance, and food highlighting Tobago village traditions.',
    date: format(addDays(new Date(), 14), 'MMM d, yyyy'),
    location: 'Scarborough, Tobago',
    image: img('tobago-heritage-night'),
    organizer: 'Tobago Heritage Network',
    type: 'festival',
  },
  {
    id: 'e3',
    title: 'Food & Lime Pop-up',
    description: 'Local chefs, street food favourites, and a small farmer’s market.',
    date: format(addDays(new Date(), 21), 'MMM d, yyyy'),
    location: 'San Fernando, Trinidad',
    image: img('food-lime-pop-up'),
    organizer: 'Local Vendors',
    type: 'community',
  },
];

export const recipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Classic Doubles',
    description: 'Soft bara, rich channa, and the right balance of pepper and sauces.',
    cookTime: '45 mins',
    difficulty: 'Medium',
    image: img('doubles-recipe'),
    likes: 132,
    category: 'streetfood',
  },
  {
    id: 'r2',
    title: 'Pelau (Chicken)',
    description: 'One-pot comfort food—caramelised sugar, pigeon peas, and coconut milk.',
    cookTime: '1 hr 10 mins',
    difficulty: 'Easy',
    image: PelauImg,
    likes: 98,
    category: 'homecooking',
  },
  {
    id: 'r3',
    title: 'Sorrel Drink',
    description: 'Spiced sorrel with clove, cinnamon, and citrus. Serve cold.',
    cookTime: '30 mins + steep',
    difficulty: 'Easy',
    image: img('sorrel-drink'),
    likes: 76,
    category: 'drink',
  },
];
