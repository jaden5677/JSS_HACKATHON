import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Heart, Calendar as CalendarIcon, ChefHat } from 'lucide-react';
import { useAppData } from '@/app/state/AppData';

export function Home() {
  const { topics, threads, events, recipes } = useAppData();
  const featuredTopics = topics.filter(t => t.featured);
  const recentThreads = threads.slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  const initials = (name?: string) => {
    const n = (name ?? '').trim();
    if (!n) return 'TT';
    const parts = n.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const second = parts.length > 1 ? (parts[1]?.[0] ?? '') : (parts[0]?.[1] ?? '');
    return (first + second).toUpperCase();
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-teal-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <img 
                src="https://picsum.photos/seed/tt-hero/1600/900" 
                alt="Pattern" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              The Heartbeat of Trinidad &amp; Tobago
            </h1>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Connect with the vibrant culture, festivals, and people of Trinidad &amp; Tobago.
              From Carnival to pan yards and village fêtes, this is your community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/events"
                className="px-6 py-3 bg-white text-teal-900 font-bold rounded-full hover:bg-teal-50 transition-colors"
              >
                Explore Events
              </Link>
              <Link
                to="/recipes"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Discover Recipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Featured Seasons</h2>
            <p className="text-neutral-500 mt-1">What's happening right now in the Trinidad & Tobago</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTopics.map((topic) => (
            <Link key={topic.id} to={`/topic/${topic.id}`} className="group block">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 transition-shadow hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
                    {topic.category}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-neutral-600 line-clamp-2">
                    {topic.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Community Pulse (Threads) */}
      <section className="bg-neutral-50 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-neutral-900">Community Pulse</h2>
                <Link to="/topic/t1" className="text-teal-600 font-medium hover:text-teal-700 flex items-center gap-1">
                    View all discussions <ArrowRight size={16} />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {recentThreads.map((thread) => (
                    <Link key={thread.id} to={`/thread/${thread.id}`} className="block">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:border-teal-300 transition-colors h-full flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                {thread.isOfficial ? (
                                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium">Official</span>
                                ) : (
                                    <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded font-medium">Community</span>
                                )}
                                <span className="text-xs text-neutral-400">{thread.createdAt}</span>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">
                                {thread.title}
                            </h3>
                            <p className="text-neutral-600 text-sm mb-4 flex-grow line-clamp-3">
                                {thread.content}
                            </p>
                            <div className="flex items-center justify-between text-neutral-400 text-sm mt-auto pt-4 border-t border-neutral-100">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1"><Heart size={14} /> {thread.likes}</span>
                                    <span className="flex items-center gap-1"><MessageSquare size={14} /> {thread.comments}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-neutral-700">{initials(thread.author)}</span>
                                    </div>
                                    <span className="text-xs font-medium">{thread.author ?? 'Anonymous'}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
         </div>
      </section>

      {/* Discovery Grid (Events & Recipes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Events Preview */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <CalendarIcon className="text-teal-600" /> Upcoming Events
                    </h2>
                    <Link to="/events" className="text-sm font-medium text-teal-600 hover:underline">View All</Link>
                </div>
                <div className="space-y-4">
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="flex gap-4 bg-white p-4 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-200">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{event.title}</h4>
                                <p className="text-sm text-teal-600 font-medium mb-1">{event.date}</p>
                                <p className="text-sm text-neutral-500">{event.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recipes Preview */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <ChefHat className="text-orange-500" /> Trending Recipes
                    </h2>
                    <Link to="/recipes" className="text-sm font-medium text-orange-500 hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {recipes.slice(0, 2).map(recipe => (
                        <Link key={recipe.id} to="/recipes" className="group relative rounded-xl overflow-hidden aspect-square">
                            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4">
                                <h4 className="text-white font-bold">{recipe.title}</h4>
                                <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                                    <span>{recipe.difficulty ?? 'Medium'}</span>
                                    <span>•</span>
                                    <span>{recipe.prepTime ?? '30 mins'}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
