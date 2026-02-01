import React from 'react';
import { useAppData } from '@/app/state/AppData';
import { Clock, ChefHat, Heart, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export function Recipes() {
  const { recipes } = useAppData();

  return (
    <div className="min-h-screen bg-orange-50/50 pb-12">
      <div className="bg-orange-900 text-white py-12 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <img 
                src="https://images.unsplash.com/photo-1596627689811-28565780521e?auto=format&fit=crop&w=1600&q=80" 
                alt="Spices" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <ChefHat className="text-orange-400" size={32} />
                Trinidad & Tobago Kitchen
            </h1>
            <p className="text-orange-100 max-w-2xl">
                Explore the flavors of the islands. From spicy jerks to sweet treats, discover authentic recipes shared by our community.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
                <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                >
                    <div className="relative h-56 overflow-hidden">
                        <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {recipe.difficulty}
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-serif group-hover:text-orange-600 transition-colors">
                            {recipe.title}
                        </h3>
                        <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                            {recipe.description}
                        </p>
                        
                <div className="flex items-center justify-between text-sm text-neutral-500 mb-6">
                            <div className="flex items-center gap-1">
                                <Clock size={16} className="text-orange-500" />
                        <span>{recipe.cookTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart size={16} className="text-red-500" />
                                <span>{recipe.likes} likes</span>
                            </div>
                        </div>

                        <div className="border-t border-neutral-100 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-800">
                        <Tag size={14} className="text-orange-600" />
                        {recipe.category}
                      </div>
                      <span className="text-xs text-neutral-500">Community recipe</span>
                    </div>
                            <button className="w-full flex items-center justify-center gap-2 text-orange-600 font-bold text-sm hover:gap-3 transition-all">
                                View Full Recipe <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
