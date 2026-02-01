import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useAppData } from '@/app/state/AppData';
import { cn } from '@/app/utils/cn';

export function Topics() {
  const { topics } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(topics.map(t => t.category)));
    return cats.sort();
  }, [topics]);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           topic.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? topic.category === selectedCategory : true;
      const matchesFeatured = showFeaturedOnly ? topic.featured : true;
      
      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [topics, searchQuery, selectedCategory, showFeaturedOnly]);

  return (
    <div className="min-h-screen bg-neutral-50 pb-12">
      {/* Header */}
      <section className="bg-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Explore Topics</h1>
          <p className="text-lg text-teal-100">Discover the vibrant cultural topics of Trinidad & Tobago</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="flex items-center gap-3 mb-6 bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200">
            <Search size={20} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-neutral-900 placeholder-neutral-500"
            />
          </div>

          {/* Filter Options */}
          <div className="space-y-4">
            {/* Featured Filter */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-teal-600"
                />
                <span className="text-sm font-medium text-neutral-700">Show Featured Topics Only</span>
              </label>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      selectedCategory === null
                        ? "bg-teal-600 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    )}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        selectedCategory === category
                          ? "bg-teal-600 text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              Showing <span className="font-semibold text-neutral-900">{filteredTopics.length}</span> of <span className="font-semibold text-neutral-900">{topics.length}</span> topics
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTopics.map((topic, index) => (
              <Link key={topic.id} to={`/topic/${topic.id}`} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 transition-shadow hover:shadow-lg h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-neutral-200">
                    <img
                      src={topic.image}
                      alt={topic.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {topic.category}
                      </span>
                      {topic.featured && (
                        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {topic.title}
                    </h3>

                    <p className="text-neutral-600 text-sm line-clamp-3 flex-grow">
                      {topic.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span className="font-medium text-teal-600 group-hover:text-teal-700 transition-colors">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-neutral-300">
            <h3 className="text-lg font-bold text-neutral-900 mb-2">No topics found</h3>
            <p className="text-neutral-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setShowFeaturedOnly(false);
              }}
              className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
