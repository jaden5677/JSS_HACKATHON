import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppData } from '@/app/state/AppData';
import { useAuth } from '@/app/state/AuthContext';
import { ArrowLeft, Image as ImageIcon, Link as LinkIcon, AlertCircle, Lock, Users, Shield } from 'lucide-react';

interface CreateThreadForm {
  title: string;
  topicId: string;
  content: string;
  tags: string;
  threadType: 'community' | 'official';
}

export function CreateThread() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedCategoryId = searchParams.get('topicId');
  const { topics, addThread } = useAppData();
  const { currentUser, isTopicAdmin } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState<string>(preSelectedCategoryId || '');
  const [threadType, setThreadType] = useState<'community' | 'official'>('community');
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateThreadForm>({
    defaultValues: {
      topicId: preSelectedCategoryId || '',
      threadType: 'community',
    }
  });

  // Check if user can create this type of thread
  const canCreateThread = () => {
    if (!currentUser) return false;
    
    // Community threads can be posted by anyone
    if (threadType === 'community') return true;
    
    // Official threads require admin status on the selected topic
    if (threadType === 'official') {
      return isTopicAdmin(selectedTopic);
    }
    
    return false;
  };

  const onSubmit = (data: CreateThreadForm) => {
    // Final permission check
    if (!canCreateThread()) {
      alert('You do not have permission to create this type of thread.');
      return;
    }

    const tags = (data.tags || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const created = addThread({
      topicId: data.topicId,
      title: data.title,
      content: data.content,
      tags,
      authorId: currentUser?.id,
      isOfficial: threadType === 'official',
    });

    navigate(`/thread/${created.id}`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
            <AlertCircle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Sign In Required</h1>
            <p className="text-neutral-600 mb-6">You need to sign in to create a post.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 border border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
        >
            <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">Create New Post</h1>

            {/* Thread Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">Thread Type</label>
              <div className="grid grid-cols-2 gap-4">
                {/* Community Thread Option */}
                <button
                  type="button"
                  onClick={() => setThreadType('community')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    threadType === 'community'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-neutral-200 bg-white hover:border-teal-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Users className={`shrink-0 mt-0.5 ${threadType === 'community' ? 'text-teal-600' : 'text-neutral-500'}`} size={20} />
                    <div>
                      <p className={`font-semibold ${threadType === 'community' ? 'text-teal-700' : 'text-neutral-900'}`}>Community Thread</p>
                      <p className="text-xs text-neutral-600">Anyone can post</p>
                    </div>
                  </div>
                </button>

                {/* Official Thread Option */}
                <button
                  type="button"
                  onClick={() => setThreadType('official')}
                  disabled={!isTopicAdmin(selectedTopic)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    threadType === 'official'
                      ? 'border-blue-600 bg-blue-50'
                      : isTopicAdmin(selectedTopic)
                      ? 'border-neutral-200 bg-white hover:border-blue-200'
                      : 'border-neutral-200 bg-neutral-50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Shield className={`shrink-0 mt-0.5 ${threadType === 'official' ? 'text-blue-600' : 'text-neutral-500'}`} size={20} />
                    <div>
                      <p className={`font-semibold ${threadType === 'official' ? 'text-blue-700' : 'text-neutral-900'}`}>Official History</p>
                      <p className="text-xs text-neutral-600">{isTopicAdmin(selectedTopic) ? 'Admins only' : 'Admin access required'}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Permission Warning */}
            {threadType === 'official' && !isTopicAdmin(selectedTopic) && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                <Lock className="text-blue-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Topic Admin Required</p>
                  <p className="text-sm text-blue-800">Only topic administrators can create official history threads.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Select Topic</label>
                    <select
                        {...register('topicId', { required: 'Please select a topic' })}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                        <option value="">Choose a cultural topic...</option>
                        {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>
                              {topic.title}
                            </option>
                        ))}
                    </select>
                    {errors.topicId && <p className="mt-1 text-sm text-red-600">{errors.topicId.message}</p>}
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        placeholder="What's on your mind?"
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Content</label>
                    <textarea
                        {...register('content', { required: 'Content is required' })}
                        rows={8}
                        placeholder="Share your thoughts, experiences, or questions..."
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
                </div>

                {/* Media Attachments (Mock) */}
                <div className="flex gap-2 pb-2">
                    <button type="button" className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2 text-sm">
                        <ImageIcon size={18} /> Add Image
                    </button>
                    <button type="button" className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2 text-sm">
                        <LinkIcon size={18} /> Add Link
                    </button>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Tags (comma separated)</label>
                    <input
                        {...register('tags')}
                        type="text"
                        placeholder="e.g., carnival, review, tips"
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <p className="mt-1 text-xs text-neutral-500">Add tags to help people find your thread.</p>
                </div>

                {/* Submit */}
                <div className="pt-4 flex justify-end gap-3">
                    <button 
                        type="button" 
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 rounded-lg font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={!canCreateThread()}
                        className="px-6 py-2.5 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-neutral-400 disabled:cursor-not-allowed shadow-sm transition-colors"
                    >
                        Post Thread
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
}
