import React from 'react';
import { useAppData } from '@/app/state/AppData';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export function Events() {
  const { events } = useAppData();

  return (
    <div className="min-h-screen bg-neutral-50 pb-12">
      <div className="bg-teal-900 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Trinidad & Tobago Events Calendar</h1>
            <p className="text-teal-100 max-w-2xl">Discover festivals, concerts, and cultural gatherings across the islands. Don't miss out on the action.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
                <select className="flex-1 md:w-48 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>All Types</option>
                    <option>Festivals</option>
                    <option>Parties</option>
                    <option>Cultural</option>
                </select>
                <button className="p-2 text-neutral-600 hover:text-teal-600 border border-neutral-200 rounded-lg hover:border-teal-500 transition-colors">
                    <Filter size={20} />
                </button>
            </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-shadow group"
                >
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-700 uppercase">
                            {event.type}
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-teal-600 transition-colors">{event.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-neutral-600 text-sm">
                                <Calendar size={16} className="text-teal-500" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-600 text-sm">
                                <MapPin size={16} className="text-teal-500" />
                                <span>{event.location}</span>
                            </div>
                        </div>

                        <p className="text-neutral-500 text-sm line-clamp-2 mb-6">
                            {event.description}
                        </p>

                        <button className="w-full py-2 bg-neutral-50 text-neutral-900 font-medium rounded-lg border border-neutral-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-all">
                            View Details
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
}
