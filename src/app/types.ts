export interface FeaturedCulturalTopic {
  id: string;
  name: string;
  country: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: 'Festival' | 'Tradition' | 'Cultural Practice' | 'Heritage';
  coverImage?: string;
  isActive: boolean;
  managedBy: string; // Organization or cultural body
}

export interface OfficialForum {
  id: string;
  topicId: string;
  title: string;
  content: string;
  author: string;
  authorRole: string; // e.g., "Cultural Minister", "Festival Director"
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  attachments?: Attachment[];
}

export interface UserThread {
  id: string;
  topicId: string;
  title: string;
  content: string;
  author: string;
  type: 'Experience' | 'Photo' | 'Video' | 'Discussion' | 'Question';
  votes: number;
  commentCount: number;
  createdAt: Date;
  userVote?: 'up' | 'down' | null;
  images?: string[];
}

export interface Event {
  id: string;
  topicId: string;
  title: string;
  description: string;
  location: string;
  country: string;
  date: Date;
  organizer: string;
  link?: string;
}

export interface Recipe {
  id: string;
  topicId: string;
  name: string;
  description: string;
  country: string;
  ingredients: string[];
  instructions: string[];
  author: string;
  votes: number;
  imageUrl?: string;
}

export interface Comment {
  id: string;
  threadId: string;
  author: string;
  content: string;
  votes: number;
  createdAt: Date;
  userVote?: 'up' | 'down' | null;
}

export interface ApplicationSubmission {
  id: string;
  culturalTopicName: string;
  country: string;
  description: string;
  submittedBy: string;
  organization?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: Date;
}

export interface Attachment {
  type: 'pdf' | 'image' | 'video' | 'link';
  url: string;
  name: string;
}
