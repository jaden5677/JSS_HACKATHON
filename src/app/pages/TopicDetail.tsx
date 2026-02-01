import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppData } from '@/app/state/AppData';
import { MessageSquare, Heart, Shield, Users, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/app/utils/cn';

export function TopicDetail() {
  const { id } = useParams<{ id: string }>();
  const { topics, threads } = useAppData();
  const topic = topics.find(t => t.id === id);
  const [activeTab, setActiveTab] = useState<'official' | 'community'>('official');

  if (!topic) {
    return <div className="p-8 text-center">Topic not found</div>;
  }

  const topicThreads = threads.filter(t => t.topicId === id);
  const filteredThreads = topicThreads.filter(t => 
    activeTab === 'official' ? t.isOfficial : !t.isOfficial
  );

  return (
    <div className="min-h-screen bg-neutral-50 pb-12">
      {/* Header */}
      <div className="relative h-64 md:h-80 bg-neutral-900">
        <img 
            src={topic.image} 
            alt={topic.title} 
            className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
                <span className="inline-block px-3 py-1 bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-teal-100 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
                    {topic.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{topic.title}</h1>
                <p className="text-lg text-neutral-200 max-w-2xl">{topic.description}</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-2 mb-6 flex gap-2">
                    <button
                        onClick={() => setActiveTab('official')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all",
                            activeTab === 'official' 
                                ? "bg-teal-50 text-teal-700 shadow-sm" 
                                : "text-neutral-500 hover:bg-neutral-50"
                        )}
                    >
                        <Shield size={18} />
                        Official History
                    </button>
                    <button
                        onClick={() => setActiveTab('community')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all",
                            activeTab === 'community' 
                                ? "bg-teal-50 text-teal-700 shadow-sm" 
                                : "text-neutral-500 hover:bg-neutral-50"
                        )}
                    >
                        <Users size={18} />
                        Community Threads
                    </button>
                </div>

                {/* Thread List */}
                <div className="space-y-4">
                    {filteredThreads.length > 0 ? (
                        filteredThreads.map((thread) => (
                            <Link key={thread.id} to={`/thread/${thread.id}`}>
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 mb-2">{thread.title}</h3>
                                            <p className="text-neutral-600 text-sm line-clamp-2 mb-4">{thread.content}</p>
                                        </div>
                                        {thread.isOfficial && (
                                            <Shield className="text-blue-500 shrink-0" size={20} />
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm text-neutral-500">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                                                <Heart size={16} /> {thread.likes}
                                            </span>
                                            <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                                <MessageSquare size={16} /> {thread.comments}
                                            </span>
                                            <span className="text-neutral-300">•</span>
                                            <span>{thread.createdAt}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            {thread.tags.map(tag => (
                                                <span key={tag} className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-neutral-300">
                            <MessageSquare className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
                            <h3 className="text-lg font-medium text-neutral-900">No threads yet</h3>
                            <p className="text-neutral-500">Be the first to start a conversation in this section!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 space-y-6">
                <div className="bg-teal-600 rounded-xl p-6 text-white shadow-lg">
                    <h3 className="text-xl font-bold mb-2">Have something to share?</h3>
                    <p className="text-teal-100 text-sm mb-6">Start a new discussion about {topic.title}. Share your experiences, ask questions, or post photos.</p>
                    <Link 
                        to={`/create-thread?topicId=${topic.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-white text-teal-700 font-bold py-3 px-4 rounded-lg hover:bg-teal-50 transition-colors"
                    >
                        <Plus size={20} /> Create Thread
                    </Link>
                </div>

                <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
                    <h3 className="font-bold text-neutral-900 mb-4">About this Section</h3>
                    <ul className="space-y-3 text-sm text-neutral-600">
                        <li className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-teal-600 shrink-0" />
                            <span>Official updates are verified by the {topic.title} committee.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-teal-600 shrink-0" />
                            <span>Community threads are open for everyone to contribute.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
